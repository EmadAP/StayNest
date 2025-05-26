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

type SetAmenitiesProps = {
  defaultAmenities?: string[];
};

const amenityOptions = [
  { id: "amenity_wifi", label: "Wi-Fi", icon: <Wifi /> },
  {
    id: "amenity_air_conditioning",
    label: "Air Conditioning",
    icon: <AirVent />,
  },
  { id: "amenity_kitchen", label: "Kitchen", icon: <CookingPot /> },
  { id: "amenity_washer", label: "Washer", icon: <WashingMachine /> },
  {
    id: "amenity_free_parking",
    label: "Free Parking",
    icon: <SquareParking />,
  },
  { id: "amenity_heating", label: "Heating", icon: <Heater /> },
] as const;

const SetAmenities = ({ defaultAmenities = [] }: SetAmenitiesProps) => {
  return (
    <div className="pt-2 md:pt-0">
      <label className="text-lg font-semibold">Amenities :</label>
      <div className="grid grid-cols-2 md:grid-cols-1 gap-2 pt-4">
        {amenityOptions.map((item) => (
          <label
            key={item.id}
            className="flex w-fit cursor-pointer items-center space-x-2"
          >
            <input
              type="checkbox"
              name="amenities[]"
              value={item.id}
              className="accent-green-600"
              defaultChecked={defaultAmenities.includes(item.id)}
            />
            <span className="text-base">{item.label}</span>
            {item.icon}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SetAmenities;
