"use client";

import React from "react";
import {
  AirVent,
  CookingPot,
  Heater,
  SquareParking,
  WashingMachine,
  Wifi,
} from "lucide-react";
import clsx from "clsx";

const amenityOptions = [
  { id: "amenity_wifi", label: "Wi-Fi", icon: <Wifi size={16} /> },
  {
    id: "amenity_air_conditioning",
    label: "Air Conditioning",
    icon: <AirVent size={16} />,
  },
  { id: "amenity_kitchen", label: "Kitchen", icon: <CookingPot size={16} /> },
  { id: "amenity_washer", label: "Washer", icon: <WashingMachine size={16} /> },
  {
    id: "amenity_free_parking",
    label: "Free Parking",
    icon: <SquareParking size={16} />,
  },
  { id: "amenity_heating", label: "Heating", icon: <Heater size={16} /> },
] as const;

type AmenityDisplayProps = {
  listingAmenities: string[];
};

const AmenityDisplay: React.FC<AmenityDisplayProps> = ({
  listingAmenities,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-2 mt-2">
      {amenityOptions.map((amenity) => {
        const isActive = listingAmenities.includes(amenity.id);
        return (
          <div
            key={amenity.id}
            className={clsx(
              "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium",
              isActive
                ? "bg-green-100 text-green-800 border border-green-400"
                : "bg-gray-100 text-gray-400 border border-gray-300 opacity-70"
            )}
          >
            {amenity.icon}
            <span>{amenity.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AmenityDisplay;
