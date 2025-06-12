"use client";
import React from "react";
import Loading from "@/components/Loading";
import GroupedCarouselSection from "@/components/GroupedCarouselSection";
import { GetAllListings } from "@/lib/queries";
import { COUNTRIES } from "@/lib/mock";

export default function Home() {
  const { data: listings, isLoading, isError, error } = GetAllListings();

  if (isLoading || !listings) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  // const groupedByTypeAndCountry = listings.reduce((acc, listing) => {
  //   const countryLabel =
  //     COUNTRIES.find((c) => c.value === listing?.country)?.label ||
  //     listing?.country;
  //   const key = `${listing.propertyType}-${countryLabel}`;
  //   if (!acc[key]) acc[key] = [];
  //   acc[key].push(listing);
  //   return acc;
  // }, {} as Record<string, typeof listings>);

  // const topTypeAndCountryCombos = Object.entries(groupedByTypeAndCountry)
  //   .sort((a, b) => b[1].length - a[1].length)
  //   .slice(0, 5);

  const groupedByCountry = listings.reduce((acc, listing) => {
    const countryLabel =
      COUNTRIES.find((c) => c.value === listing?.country)?.label ||
      listing?.country;
    if (!acc[countryLabel]) acc[countryLabel] = [];
    acc[countryLabel].push(listing);
    return acc;
  }, {} as Record<string, typeof listings>);

  const topCountries = Object.entries(groupedByCountry)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 5);

  const groupedByType = listings.reduce((acc, listing) => {
    if (!acc[listing.propertyType]) acc[listing.propertyType] = [];
    acc[listing.propertyType].push(listing);
    return acc;
  }, {} as Record<string, typeof listings>);

  const topPropertyTypes = Object.entries(groupedByType)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 5);

  return (
    <div className="space-y-16 my-16">
      {/* {topTypeAndCountryCombos.map(([key, group]) => {
        const [propertyType, country] = key.split("-");
        return (
          <GroupedCarouselSection
            key={key}
            title={`${propertyType}s in ${country}`}
            link={`/browse?propertyType=${propertyType}&country=${country}`}
            listings={group}
          />
        );
      })} */}

      {topCountries.map(([country, group]) => (
        <GroupedCarouselSection
          key={country}
          title={`Nests inside ${country}`}
          link={`/browse?country=${country}`}
          listings={group}
        />
      ))}

      {topPropertyTypes.map(([type, group]) => (
        <GroupedCarouselSection
          key={type}
          title={`All available ${type}s`}
          link={`/browse?propertyType=${type}`}
          listings={group}
        />
      ))}
      <GroupedCarouselSection
        key="all-listings"
        title="Available Nests "
        link="/browse"
        listings={listings}
      />
    </div>
  );
}
