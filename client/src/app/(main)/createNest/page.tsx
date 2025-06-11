"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
const LocationPicker = dynamic(() => import("@/components/LocationPicker"), {
  ssr: false,
});
import DateSetter from "@/components/DateSetter";
import SetAmenities from "@/components/SetAmenities";
import { X } from "lucide-react";
import { CreateListings } from "@/lib/mutations";
import { z } from "zod";

const createNestSchema = z.object({
  title: z
    .string()
    .min(1, "Your Nest needs a title to be listed.")
    .max(100, "Title is too long"),
  description: z
    .string()
    .min(1, "Please provide a description to help guests understand your Nest.")
    .max(400, "Description is too long"),
  address: z.string().min(1, "Please provide the address of your Nest."),
  pricePerNight: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Set a price per night for your Nest.",
    }),
  maxGuests: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
      message: "Set a maximum Guests for your Nest.",
    }),
  coordinates: z.string().refine((val) => !!val && val.startsWith("["), {
    message:
      "Location coordinates are missing. Please select a location on the map.",
  }),
  houseRules: z.string().optional(),
});

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyType = searchParams.get("propertyType");
  const country = searchParams.get("country");
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [availableFrom, setAvailableFrom] = useState<Date | undefined>(
    new Date()
  );
  const [availableTo, setAvailableTo] = useState<Date | undefined>(undefined);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [mutationError, setMutationError] = useState<string | null>(null);
  const createMutation = CreateListings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      address: formData.get("address") as string,
      pricePerNight: formData.get("pricePerNight") as string,
      maxGuests: formData.get("maxGuests") as string,
      coordinates: formData.get("coordinates") as string,
      houseRules: formData.get("houseRules") as string,
    };

    const result = createNestSchema.safeParse(rawData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setFormErrors(fieldErrors);
      return;
    }

    formData.delete("files");

    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    createMutation.mutate(formData, {
      onSuccess: (data) => {
        console.log("Listing created:", data);
        router.push("/");
      },
      onError: (error: Error) => {
        setMutationError(error.message);
      },
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setFormErrors((prev) => {
      const updatedErrors = { ...prev };
      delete updatedErrors[name];
      return updatedErrors;
    });
    setMutationError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormErrors({});
    setMutationError(null);
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

  const handleRemoveImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
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
          className="flex flex-col space-y-5 mt-10 py-8 bg-gray-100 dark:bg-gray-900 rounded-lg px-5 lg:px-15 lg:py-15"
        >
          <input
            name="title"
            onChange={handleInputChange}
            placeholder="Title"
            className="bg-white dark:bg-gray-800 border-1 border-green-600 px-2 py-2 outline-none rounded-lg "
          />
          {formErrors.title && (
            <p className="text-red-500 mt-1 text-sm">{formErrors.title}</p>
          )}
          <textarea
            name="description"
            onChange={handleInputChange}
            placeholder="Description"
            className="bg-white dark:bg-gray-800 border-1 border-green-600 px-2 py-2 outline-none rounded-lg "
          />
          {formErrors.description && (
            <p className="text-red-500 mt-1 text-sm">
              {formErrors.description}
            </p>
          )}
          <LocationPicker onLocationSelect={setCoordinates} />
          <input
            type="hidden"
            onChange={handleInputChange}
            name="coordinates"
            value={coordinates ? JSON.stringify(coordinates) : ""}
          />
          {formErrors.coordinates && (
            <p className="text-red-500 mt-1 text-sm">
              {formErrors.coordinates}
            </p>
          )}
          <input
            name="address"
            onChange={handleInputChange}
            placeholder="Address"
            className="bg-white dark:bg-gray-800 border-1 border-green-600 px-2 py-2 outline-none rounded-lg "
          />
          {formErrors.address && (
            <p className="text-red-500 mt-1 text-sm">{formErrors.address}</p>
          )}
          <input type="hidden" name="country" value={country || ""} />
          <input type="hidden" name="propertyType" value={propertyType || ""} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-8 ">
            <div className="flex justify-between gap-6 flex-col ">
              <div className="w-full flex-col md:flex-col  gap-4">
                <div className="w-full flex md:flex-col md:items-start lg:flex-row lg:items-center justify-between items-center gap-2">
                  <span className="text-lg font-semibold ">
                    Price Per Night :
                  </span>
                  <input
                    name="pricePerNight"
                    onChange={handleInputChange}
                    type="number"
                    placeholder="$"
                    className="w-[200px] bg-white dark:bg-gray-800 border-1 border-green-600 px-2 py-1.5 outline-none rounded-lg "
                  />
                </div>
                {formErrors.pricePerNight && (
                  <p className="text-red-500 mt-1 text-sm">
                    {formErrors.pricePerNight}
                  </p>
                )}
              </div>
              <div className="w-full flex-col md:flex-col  gap-4">
                <div className="w-full flex md:flex-col md:items-start lg:flex-row lg:items-center justify-between items-center gap-2">
                  <span className="text-lg font-semibold ">Max Guests :</span>
                  <input
                    name="maxGuests"
                    onChange={handleInputChange}
                    type="number"
                    placeholder="Guests"
                    className="w-[200px] bg-white dark:bg-gray-800 border-1 border-green-600 px-2 py-1.5 outline-none rounded-lg "
                  />
                </div>
                {formErrors.maxGuests && (
                  <p className="text-red-500 mt-1 text-sm">
                    {formErrors.maxGuests}
                  </p>
                )}
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
            onChange={handleInputChange}
            placeholder="House Rules"
            className="bg-white dark:bg-gray-800 border-1 border-green-600 px-2 py-2 outline-none rounded-lg "
          />
          {formErrors.houseRules && (
            <p className="text-red-500 mt-1 text-sm">{formErrors.houseRules}</p>
          )}

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
            className="text-center font-semibold hover:bg-muted bg-white dark:bg-gray-800 border px-2 py-2 rounded-lg cursor-pointer"
          >
            Upload Images
          </label>

          {/* IMAGE PREVIEWS */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {imagePreviews.map((src, index) => (
                <div key={src} className="flex items-start">
                  <div className="relative w-full h-60">
                    <Image
                      fill
                      src={src}
                      alt="image"
                      className="object-cover rounded-md"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-full z-10 mx-1 my-2 p-1 w-fit cursor-pointer"
                  >
                    <X size={17} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <Button
            type="submit"
            className="text-xl font-semibold text-white dark:text-white "
          >
            {createMutation.isPending ? "Submitting..." : "Create your Nest"}
          </Button>
          <div>
            {createMutation.error && (
              <p className="text-red-500 mt-2">{mutationError}</p>
            )}
          </div>
        </form>
      </MaxWidthWrapper>
    </div>
  );
}

export default Page;
