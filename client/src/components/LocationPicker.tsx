"use client";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({
  onSelect,
}: {
  onSelect: (latlng: [number, number]) => void;
}) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      const coords: [number, number] = [e.latlng.lat, e.latlng.lng];
      setPosition(coords);
      onSelect(coords);
    },
  });
  return position === null ? null : (
    <Marker position={position} icon={markerIcon} />
  );
}

function LocationPicker({
  onLocationSelect,
}: {
  onLocationSelect: (latlng: [number, number]) => void;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker onSelect={onLocationSelect} />
    </MapContainer>
  );
}

export default LocationPicker;
