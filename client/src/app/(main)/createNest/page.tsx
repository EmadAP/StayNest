"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
const LocationPicker = dynamic(() => import("@/components/LocationPicker"), {
  ssr: false,
});
import DateSetter from "@/components/DateSetter";
import SetAmenities from "@/components/SetAmenities";

const createListing = async (formData: FormData) => {
  const res = await fetch("http://localhost:5000/listings", {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create listing");
  }
  return res.json();
};

function Page() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [availableFrom, setAvailableFrom] = useState<Date | undefined>(
    new Date()
  );
  const [availableTo, setAvailableTo] = useState<Date | undefined>(undefined);

  const mutation = useMutation({
    mutationFn: (formData: FormData) => createListing(formData),
    onSuccess: (data) => {
      console.log("Listing created:", data);
      router.push("/");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    formData.delete("files");

    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    mutation.mutate(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);

    setSelectedFiles((prev) => {
      const updatedFiles = [...prev, ...newFiles];

      setImagePreviews(updatedFiles.map((file) => URL.createObjectURL(file)));
      return updatedFiles;
    });
    e.target.value = "";
  };
  return (
    <div className="">
      <MaxWidthWrapper className="pt-10">
        <h1 className="text-2xl font-bold">
          Nest your <span className="text-green-600">House</span>
        </h1>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col space-y-5 mt-10 py-8 bg-gray-100 rounded-lg px-5 lg:px-15 lg:py-15"
        >
          <input
            name="title"
            placeholder="Title"
            className="bg-white border-1 border-green-600 px-2 py-2 outline-none rounded-lg "
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="bg-white border-1 border-green-600 px-2 py-2 outline-none rounded-lg "
            required
          />
          <LocationPicker onLocationSelect={setCoordinates} />
          <input
            type="hidden"
            name="coordinates"
            value={coordinates ? JSON.stringify(coordinates) : ""}
          />
          <input
            name="location"
            placeholder="Location"
            required
            className="bg-white border-1 border-green-600 px-2 py-2 outline-none rounded-lg "
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-8 ">
            <div className="flex justify-between gap-6 flex-col ">
              <div className="w-full flex md:flex-col md:items-start lg:flex-row lg:items-center justify-between items-center gap-2">
                <span className="text-lg font-semibold ">
                  Price Per Night :
                </span>
                <input
                  name="pricePerNight"
                  type="number"
                  placeholder="$"
                  className="w-[200px] bg-white border-1 border-green-600 px-2 py-1.5 outline-none rounded-lg "
                  required
                />
              </div>
              <div className="w-full flex md:flex-col md:items-start lg:flex-row lg:items-center justify-between items-center gap-2">
                <span className="text-lg font-semibold ">Max Guests :</span>
                <input
                  name="maxGuests"
                  type="number"
                  placeholder="Guests"
                  className="w-[200px] bg-white border-1 border-green-600 px-2 py-1.5 outline-none rounded-lg "
                />
              </div>
              <DateSetter
                availableFrom={availableFrom}
                setAvailableFrom={setAvailableFrom}
                availableTo={availableTo}
                setAvailableTo={setAvailableTo}
              />
            </div>

            <SetAmenities />
          </div>
          <textarea
            name="houseRules"
            placeholder="House Rules"
            className="bg-white border-1 border-green-600 px-2 py-2 outline-none rounded-lg "
          />

          {/* MULTI IMAGE UPLOAD */}
          <input
            id="file-upload"
            name="files"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />

          <label
            htmlFor="file-upload"
            className="text-center font-semibold hover:bg-muted bg-white border px-2 py-2 rounded-lg cursor-pointer"
          >
            Upload Images
          </label>

          {/* IMAGE PREVIEWS */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {imagePreviews.map((src) => (
                <div key={src} className="relative w-full h-40">
                  <Image
                    fill
                    src={src}
                    alt="image"
                    className="object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          )}
          <Button type="submit" className="text-xl font-semibold ">
            {mutation.isPending ? "Submitting..." : "Create your Nest"}
          </Button>
        </form>
      </MaxWidthWrapper>
    </div>
  );
}

export default Page;
