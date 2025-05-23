"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import React from "react";

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png",
});

interface LocationViewerProps {
  coordinates: [number, number];
  locationName?: string;
}

const LocationViewer: React.FC<LocationViewerProps> = ({
  coordinates,
  locationName,
}) => {
  const center: LatLngExpression = [coordinates[0], coordinates[1]];
  return (
    <div className="h-64 w-full rounded-md overflow-hidden">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center}>
          <Popup>{locationName || "Listing location"}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationViewer;
