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
  address: string;
  coordinates: [number, number];
  amenities?: string[];
  maxGuests: number;
  houseRules?: string;
  isActive?: boolean;
  propertyType: string;
  country: string;
}

function isListingInput(obj: any): obj is ListingInput {
  return (
    typeof obj.title === "string" &&
    typeof obj.description === "string" &&
    (typeof obj.pricePerNight === "number" ||
      !isNaN(Number(obj.pricePerNight))) &&
    typeof obj.availableFrom === "string" &&
    typeof obj.availableTo === "string" &&
    typeof obj.address === "string" &&
    Array.isArray(obj.coordinates) &&
    obj.coordinates.length === 2 &&
    !isNaN(Number(obj.coordinates[0])) &&
    !isNaN(Number(obj.coordinates[1])) &&
    typeof obj.propertyType === "string" &&
    typeof obj.country === "string"
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
        address: body.address,
        coordinates: parsedCoordinates,
        amenities: Array.isArray(body.amenities)
          ? body.amenities.map(String)
          : typeof body.amenities === "string"
          ? (body.amenities as string).split(",").map((s: string) => s.trim())
          : [],
        maxGuests: Number(body.maxGuests),
        houseRules: body.houseRules ? String(body.houseRules) : undefined,
        isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
        propertyType: body.propertyType,
        country: body.country,
      };

      if (!listingData.title) {
        res
          .status(400)
          .json({ message: "Your Nest needs a title to be listed." });
        return;
      }

      if (!listingData.description) {
        res.status(400).json({
          message:
            "Please provide a description to help guests understand your Nest.",
        });
        return;
      }

      if (!listingData.pricePerNight) {
        res
          .status(400)
          .json({ message: "Set a price per night for your Nest." });
        return;
      }

      if (!listingData.maxGuests) {
        res
          .status(400)
          .json({ message: "Set a maximum Guests for your Nest." });
        return;
      }

      if (!listingData.address) {
        res
          .status(400)
          .json({ message: "Please provide the address of your Nest." });
        return;
      }

      if (!listingData.availableFrom) {
        res
          .status(400)
          .json({ message: "Specify when your Nest will be available from." });
        return;
      }

      if (!listingData.availableTo) {
        res.status(400).json({
          message: "Specify when your Nest will no longer be available.",
        });
        return;
      }

      if (!listingData.coordinates) {
        res.status(400).json({
          message:
            "Location coordinates are missing. Please select a location on the map.",
        });
        return;
      }

      if (!listingData.propertyType) {
        res
          .status(400)
          .json({ message: "Your Nest needs a Property Type to be listed." });
        return;
      }

      if (!listingData.country) {
        res
          .status(400)
          .json({ message: "Chose the country your property is located at." });
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

router.put(
  "/listings/:id",
  verifyToken,
  upload.array("files", 10),
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

      let existingImagesToKeep: string[] = [];

      if (typedReq.body.existingImagesToKeep) {
        existingImagesToKeep = Array.isArray(typedReq.body.existingImagesToKeep)
          ? typedReq.body.existingImagesToKeep
          : [typedReq.body.existingImagesToKeep];
      }

      const imagesToDelete = listing.images.filter(
        (img) => !existingImagesToKeep.includes(img)
      );

      imagesToDelete.forEach((path) => {
        try {
          fs.unlinkSync(path);
        } catch (err) {
          console.warn("Failed to delete image file:", path, err);
        }
      });
      const files = req.files as Express.Multer.File[];
      const newImagePaths: string[] = [];

      if (files && files.length > 0) {
        files.forEach((file) => {
          const parts = file.originalname.split(".");
          const ext = parts[parts.length - 1];
          const newPath = file.path + "." + ext;
          fs.renameSync(file.path, newPath);
          newImagePaths.push(newPath);
        });
      }

      const savedPaths = [...existingImagesToKeep, ...newImagePaths];

      const body = typedReq.body;

      if (typeof body.coordinates === "string") {
        try {
          body.coordinates = JSON.parse(body.coordinates);
        } catch (e) {
          res.status(400).json({ message: "Invalid coordinates format" });
          return;
        }
      }

      const updatedData: Partial<ListingInput> = {
        title: body.title,
        description: body.description,
        pricePerNight: body.pricePerNight
          ? Number(body.pricePerNight)
          : undefined,
        availableFrom: body.availableFrom,
        availableTo: body.availableTo,
        address: body.address,
        coordinates: body.coordinates,
        amenities: Array.isArray(body.amenities)
          ? body.amenities.map(String)
          : typeof body.amenities === "string"
          ? body.amenities.split(",").map((s: string) => s.trim())
          : [],
        maxGuests: body.maxGuests ? Number(body.maxGuests) : undefined,
        houseRules: body.houseRules ? String(body.houseRules) : undefined,
        isActive:
          body.isActive !== undefined ? Boolean(body.isActive) : undefined,
        propertyType: body.propertyType,
        country: body.country,
      };

      Object.keys(updatedData).forEach((key) => {
        if (updatedData[key as keyof ListingInput] === undefined) {
          delete updatedData[key as keyof ListingInput];
        }
      });

      const updatedListing = await Listing.findByIdAndUpdate(
        id,

        { ...updatedData, images: savedPaths },
        { new: true }
      );

      res.json(updatedListing);
    } catch (err) {
      console.error("Error updating listing:", err);
      res.status(500).json({ message: "Failed to update listing" });
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
  try {
    const { id } = req.params;
    const listingDoc = await Listing.findById(id);
    if (!listingDoc) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(listingDoc);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch listing" });
  }
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
