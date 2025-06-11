"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
import { useUser } from "@/components/UserContext";
import { Trash, UserPen } from "lucide-react";
import Link from "next/link";
import { GetListingById } from "@/lib/queries";
import { DeleteListingById } from "@/lib/mutations";
import { COUNTRIES } from "@/lib/mock";
const LocationViewer = dynamic(() => import("@/components/LocationViewer"), {
  ssr: false,
});

function Page() {
  const params = useParams();
  const id = params.id as string;
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useUser();
  const searchParams = useSearchParams();
  const fromProfile = searchParams.get("from") === "profile";
  const { data: listing, isLoading, isError, error } = GetListingById(id);
  const deleteMutation = DeleteListingById();

  const countryLabel =
    COUNTRIES.find((c) => c.value === listing?.country)?.label ||
    listing?.country;

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["myListings"] });
        router.push("/profile");
      },
    });
  };

  if (isLoading || !listing) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <MaxWidthWrapper className="pt-6">
        <div className="flex items-center justify-between border-b-2 border-b-green-500 pb-2 mb-4 ">
          <h1 className="text-2xl font-bold capitalize">{listing.title}</h1>
          <div className="flex gap-2">
            {fromProfile && user?.id === listing.owner && (
              <Link href={`/editNest/${listing._id}`}>
                <button className="bg-primary  shadow-xs hover:bg-primary/80  rounded-full p-0 w-9 h-9">
                  <UserPen className="h-5 w-5 mx-auto text-white" />
                </button>
              </Link>
            )}
            {fromProfile && user?.id === listing.owner && (
              <button
                className="bg-destructive  shadow-xs hover:bg-destructive/80  rounded-full p-0 w-9 h-9"
                onClick={() => handleDelete(listing._id)}
              >
                <Trash className="h-5 w-5 mx-auto text-white" />
              </button>
            )}
          </div>
        </div>
        <div className="pb-6 pt-2  flex flex-col-reverse md:flex-row md:gap-6">
          <div className=" pt-4 space-y-6 md:flex-1/2">
            <p className=" text-sm text-zinc-700 dark:text-white">
              {listing.description}
            </p>
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-zinc-900 dark:text-white">
                Country property located at
              </span>
              <span className="text-zinc-700 dark:text-white text-sm mb-1 pb-1 border-b-1 border-b-green-500">
                {countryLabel}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex flex-col">
                <span className="font-semibold text-lg  text-zinc-900 dark:text-white">
                  Address
                </span>
                <span className="text-zinc-700 dark:text-white text-sm mb-1">
                  {listing.address}
                </span>
              </div>
              <LocationViewer
                coordinates={listing.coordinates}
                locationName={listing.address}
              />
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-lg  text-zinc-900 dark:text-white">
                Available Dates
              </span>
              <span className="text-zinc-700 dark:text-white text-sm mb-1 pb-1 border-b-1 border-b-green-500">
                {format(new Date(listing.availableFrom), "MMM d, yyyy")} –{" "}
                {format(new Date(listing.availableTo), "MMM d, yyyy")}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-lg  text-zinc-900 dark:text-white">
                Price Per Night
              </span>
              <span className="text-zinc-700 dark:text-white text-sm mb-1 pb-1 border-b-1 border-b-green-500">
                ${listing.pricePerNight}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-lg  text-zinc-900 dark:text-white">
                Max Guests
              </span>
              <span className="text-zinc-700 dark:text-white text-sm mb-1 pb-1 border-b-1 border-b-green-500">
                {listing.maxGuests}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-lg text-zinc-900 dark:text-white">
                Property Type
              </span>
              <span className="text-zinc-700 dark:text-white text-sm mb-1 pb-1 border-b-1 border-b-green-500">
                {listing.propertyType}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-lg text-zinc-900 dark:text-white mb-1">
                Amenities
              </span>
              <AmenityDisplay listingAmenities={listing.amenities} />
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-lg  text-zinc-900 dark:text-white">
                House Rules
              </span>
              <span className="text-zinc-700 dark:text-white text-sm mb-1 pb-1 border-b-1 border-b-green-500">
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
