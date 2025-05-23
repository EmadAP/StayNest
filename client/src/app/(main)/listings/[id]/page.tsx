"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import React from "react";
import Loading from "@/components/Loading";

import dynamic from "next/dynamic";
import AmenityDisplay from "@/components/AmenityDisplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
const LocationViewer = dynamic(() => import("@/components/LocationViewer"), {
  ssr: false,
});

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

async function fetchListingById(id: string): Promise<Listing> {
  const res = await fetch(`http://localhost:5000/listings/${id}`);
  if (!res.ok) throw new Error("Listing not found");
  return res.json();
}

function Page() {
  const params = useParams();
  const id = params.id as string;

  const {
    data: listing,
    isLoading,
    isError,
    error,
  } = useQuery<Listing, Error>({
    queryKey: ["listing", id],
    queryFn: () => fetchListingById(id),
    enabled: !!id,
  });

  if (isLoading || !listing) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <MaxWidthWrapper className="pt-6">
        <h1 className="border-b-2 border-b-green-500 pb-2 mb-4 text-2xl font-bold capitalize">
          {listing.title}
        </h1>
        <div className="flex flex-col-reverse md:flex-row md:gap-6">
          <div className="space-y-6 md:flex-1/2">
            <p className=" text-sm text-zinc-700">{listing.description}</p>
            <div className="space-y-2">
              <div className="flex flex-col">
                <span className="font-semibold text-lg  text-zinc-900">
                  Location
                </span>
                <span className="text-zinc-700 text-sm mb-1">
                  {listing.location}
                </span>
              </div>
              <LocationViewer
                coordinates={listing.coordinates}
                locationName={listing.location}
              />
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-lg  text-zinc-900">
                Available Dates
              </span>
              <span className="text-zinc-700 text-sm mb-1 pb-1 border-b-1 border-b-green-500">
                {format(new Date(listing.availableFrom), "MMM d, yyyy")} –{" "}
                {format(new Date(listing.availableTo), "MMM d, yyyy")}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-lg  text-zinc-900">
                Price Per Night
              </span>
              <span className="text-zinc-700 text-sm mb-1 pb-1 border-b-1 border-b-green-500">
                ${listing.pricePerNight}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-lg  text-zinc-900">
                Max Guests
              </span>
              <span className="text-zinc-700 text-sm mb-1 pb-1 border-b-1 border-b-green-500">
                {listing.maxGuests}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-lg text-zinc-900 mb-1">
                Amenities
              </span>
              <AmenityDisplay listingAmenities={listing.amenities} />
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-lg  text-zinc-900">
                House Rules
              </span>
              <span className="text-zinc-700 text-sm mb-1 pb-1 border-b-1 border-b-green-500">
                {listing.houseRules}
              </span>
            </div>
          </div>

          <div className="md:flex-1/2 ">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {listing.images.map((imgPath) => (
                  <CarouselItem key={imgPath} className="md:basis-full">
                    <div className="p-0">
                      <Card className="border-0 shadow-none">
                        <CardContent className="p-0">
                          <div className="relative h-80 w-full">
                            <Image
                              src={`http://localhost:5000/${imgPath.replace(
                                /^\//,
                                ""
                              )}`}
                              alt="Listing image"
                              fill
                              unoptimized
                              className="rounded-md object-cover"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-6 relative z-10">
                <CarouselPrevious className="static w-auto h-auto p-2" />
                <CarouselNext className="static w-auto h-auto p-2" />
              </div>
            </Carousel>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default Page;
