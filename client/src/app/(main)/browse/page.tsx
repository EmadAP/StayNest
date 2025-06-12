"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { GetAllListings } from "@/lib/queries";
import Loading from "@/components/Loading";
import { COUNTRIES } from "@/lib/mock";
import NestCard from "@/components/NestCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const countryQuery = searchParams.get("country");
  const propertyTypeQuery = searchParams.get("propertyType");

  const { data: listings, isLoading, isError, error } = GetAllListings();

  if (isLoading || !listings) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  const countryValue =
    COUNTRIES.find((c) => c.label === countryQuery)?.value || countryQuery;

  const filteredListings = listings.filter((listing) => {
    const matchesCountry = countryQuery
      ? listing.country === countryValue
      : true;
    const matchesType = propertyTypeQuery
      ? listing.propertyType === propertyTypeQuery
      : true;
    return matchesCountry && matchesType;
  });

  const pageTitle =
    countryQuery && propertyTypeQuery
      ? `${propertyTypeQuery}s in ${countryQuery}`
      : countryQuery
      ? `Nests inside ${countryQuery}`
      : propertyTypeQuery
      ? `All available ${propertyTypeQuery}s`
      : "All Available Nests";

  return (
    <MaxWidthWrapper>
      <div className="my-12">
        <h1 className="text-3xl font-bold pb-4 mb-4 border-b-2 border-green-600">
          {pageTitle}
        </h1>
        {filteredListings.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredListings.map((listing) => (
              <NestCard
                key={listing._id}
                _id={listing._id}
                title={listing.title}
                images={listing.images}
                pricePerNight={listing.pricePerNight}
                availableFrom={listing.availableFrom}
                availableTo={listing.availableTo}
              />
            ))}
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
