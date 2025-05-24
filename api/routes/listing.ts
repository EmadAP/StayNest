import { Router, Request, Response } from "express";
import Listing from "../models/Listing";
import { verifyToken } from "../util/verifyToken";
import fs from "fs";
import multer from "multer";
import { JwtPayload } from "jsonwebtoken";

const upload = multer({ dest: "uploads/" });
const router = Router();

interface RequestWithUser extends Request {
  user: JwtPayload & { id: string };
}

interface ListingInput {
  title: string;
  description: string;
  pricePerNight: number;
  availableFrom: string;
  availableTo: string;
  location: string;
  coordinates: [number, number];
  amenities?: string[];
  maxGuests?: number;
  houseRules?: string;
  isActive?: boolean;
}

function isListingInput(obj: any): obj is ListingInput {
  return (
    typeof obj.title === "string" &&
    typeof obj.description === "string" &&
    (typeof obj.pricePerNight === "number" ||
      !isNaN(Number(obj.pricePerNight))) &&
    typeof obj.availableFrom === "string" &&
    typeof obj.availableTo === "string" &&
    typeof obj.location === "string" &&
    Array.isArray(obj.coordinates) &&
    obj.coordinates.length === 2 &&
    !isNaN(Number(obj.coordinates[0])) &&
    !isNaN(Number(obj.coordinates[1]))
  );
}

router.post(
  "/listings",
  verifyToken,
  upload.array("files", 10),
  async (req: Request, res: Response) => {
    const typedReq = req as RequestWithUser;
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        res
          .status(400)
          .json({ message: "At least one image file is required" });
        return;
      }
      const savedPaths: string[] = [];

      files.forEach((file) => {
        const parts = file.originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = file.path + "." + ext;
        fs.renameSync(file.path, newPath);
        savedPaths.push(newPath);
      });

      const user = typedReq.user;
      const body = typedReq.body;

      if (typeof body.coordinates === "string") {
        try {
          body.coordinates = JSON.parse(body.coordinates);
        } catch (e) {
          console.error("Failed to parse coordinates:", e);
          res.status(400).json({ message: "Invalid coordinates format" });
          return;
        }
      }

      if (!isListingInput(body)) {
        res.status(400).json({ message: "Invalid input data" });
        return;
      }

      const parsedCoordinates =
        typeof body.coordinates === "string"
          ? JSON.parse(body.coordinates)
          : body.coordinates;

      const listingData: ListingInput = {
        title: body.title,
        description: body.description,
        pricePerNight: Number(body.pricePerNight),
        availableFrom: body.availableFrom,
        availableTo: body.availableTo,
        location: body.location,
        coordinates: parsedCoordinates,
        amenities: Array.isArray(body.amenities)
          ? body.amenities.map(String)
          : typeof body.amenities === "string"
          ? (body.amenities as string).split(",").map((s: string) => s.trim())
          : [],
        maxGuests: body.maxGuests ? Number(body.maxGuests) : undefined,
        houseRules: body.houseRules ? String(body.houseRules) : undefined,
        isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
      };

      if (
        !listingData.title ||
        !listingData.description ||
        !listingData.pricePerNight ||
        !listingData.location
      ) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const listingDoc = await Listing.create({
        ...listingData,
        images: savedPaths,
        owner: user.id,
      });

      res.status(201).json(listingDoc);
    } catch (err) {
      console.error("Error creating listing:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.get("/listings", async (req: Request, res: Response) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 }).limit(20);
    res.json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
});

router.get("/listings/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const listingDoc = await Listing.findById(id);
  res.json(listingDoc);
});

router.get("/my-listings", verifyToken, async (req: Request, res: Response) => {
  const typedReq = req as RequestWithUser;

  try {
    const userId = typedReq.user.id;
    const myListings = await Listing.find({ owner: userId }).sort({
      createdAt: -1,
    });
    res.json(myListings);
  } catch (err) {
    console.error("Error fetching user's listings:", err);
    res.status(500).json({ message: "Failed to fetch user's listings" });
  }
});

router.delete(
  "/listings/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    const typedReq = req as RequestWithUser;
    const { id } = req.params;

    try {
      const listing = await Listing.findById(id);

      if (!listing) {
        res.status(404).json({ message: "Listing not found" });
        return;
      }

      if (listing.owner.toString() !== typedReq.user.id) {
        res.status(403).json({ message: "Unauthorized" });
        return;
      }

      if (Array.isArray(listing.images)) {
        listing.images.forEach((path) => {
          try {
            fs.unlinkSync(path);
          } catch (err) {
            console.warn("Failed to delete image file:", path, err);
          }
        });
      }
      await listing.deleteOne();

      res.json({ message: "Listing deleted successfully" });
    } catch (err) {
      console.error("Error deleting listing:", err);
      res.status(500).json({ message: "Failed to delete listing" });
    }
  }
);

export default router;
