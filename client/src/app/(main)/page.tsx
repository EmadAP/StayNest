"use client";
import React from "react";
import Loading from "@/components/Loading";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NestCard from "@/components/NestCard";
import { useQuery } from "@tanstack/react-query";

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

async function fetchListing(): Promise<Listing[]> {
  const res = await fetch("http://localhost:5000/listings");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export default function Home() {
  const {
    data: listings,
    isLoading,
    isError,
    error,
  } = useQuery<Listing[], Error>({
    queryKey: ["listings"],
    queryFn: fetchListing,
  });

  if (isLoading || !listings) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div>
      <MaxWidthWrapper className="py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
        {listings.map((listing) => (
          <NestCard
            key={listing._id}
            _id={listing._id}
            title={listing.title}
            images={listing.images}
            pricePerNight={listing.pricePerNight}
            availableFrom={new Date(listing.availableFrom).toLocaleDateString()}
            availableTo={new Date(listing.availableTo).toLocaleDateString()}
          />
        ))}
      </MaxWidthWrapper>
    </div>
  );
}
