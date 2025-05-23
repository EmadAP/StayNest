import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";

interface Listing {
  _id: string;
  title: string;
  description: string;
  pricePerNight: number;
  availableFrom: string;
  availableTo: string;
  location: string;
  coordinates: [number, number];
  amenities: string[];
  maxGuests: number;
  houseRules: string;
  images: string[];
  owner: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type Props = Pick<
  Listing,
  "_id" | "title" | "images" | "pricePerNight" | "availableFrom" | "availableTo"
>;

function NestCard({
  _id,
  title,
  images,
  pricePerNight,
  availableFrom,
  availableTo,
}: Props) {
  const imageUrl = Array.isArray(images) && images.length > 0 ? images[0] : "";
  const normalizedImageUrl = imageUrl.startsWith("/")
    ? imageUrl
    : "/" + imageUrl;
  const fullImageUrl = imageUrl
    ? `http://localhost:5000${normalizedImageUrl}`
    : "/placeholder.jpg";

  return (
    <div className="pt-2 flex flex-col overflow-hidden">
      <Link href={`/listings/${_id}`}>
        <div className=" relative h-64 w-full">
          <Image
            src={fullImageUrl}
            alt="image"
            fill
            unoptimized
            className="rounded-lg object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg text-zinc-800">{title}</h3>
          <p className="text-sm text-zinc-500">
            {format(new Date(availableFrom), "MMM d, yyyy")} to{" "}
            {format(new Date(availableTo), "MMM d, yyyy")}
          </p>
          <div className="flex flex-row  justify-between">
            <p className="text-sm text-zinc-500">
              $ {pricePerNight} for 1 night
            </p>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-green-600 fill-green-600" />
              <p className="text-sm text-zinc-500">5.0</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default NestCard;
