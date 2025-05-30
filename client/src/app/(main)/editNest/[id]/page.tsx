"use client";
import DateSetter from "@/components/DateSetter";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SetAmenities from "@/components/SetAmenities";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Loading from "@/components/Loading";
import { X } from "lucide-react";
import { GetListingById } from "@/lib/queries";
import { UpdateListingById } from "@/lib/mutations";
const LocationPicker = dynamic(() => import("@/components/LocationPicker"), {
  ssr: false,
});

function Page() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<
    { src: string; isNew: boolean }[]
  >([]);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [availableFrom, setAvailableFrom] = useState<Date>();
  const [availableTo, setAvailableTo] = useState<Date>();
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const { data: listing, isLoading } = GetListingById(id);
  const updateMutation = UpdateListingById();

  useEffect(() => {
    if (!listing || !formRef.current) return;

    const form = formRef.current;

    (form.elements.namedItem("title") as HTMLInputElement).value =
      listing.title || "";
    (form.elements.namedItem("description") as HTMLTextAreaElement).value =
      listing.description || "";
    (form.elements.namedItem("address") as HTMLInputElement).value =
      listing.address || "";

    (form.elements.namedItem("pricePerNight") as HTMLInputElement).value =
      listing.pricePerNight?.toString() || "";
    (form.elements.namedItem("maxGuests") as HTMLInputElement).value =
      listing.maxGuests?.toString() || "";
    (form.elements.namedItem("houseRules") as HTMLTextAreaElement).value =
      listing.houseRules || "";

    setCoordinates(listing.coordinates || null);
    setAvailableFrom(new Date(listing.availableFrom));
    setAvailableTo(new Date(listing.availableTo));

    if (listing.images?.length) {
      setImagePreviews(
        listing.images.map((img: string) => ({
          src: `http://localhost:5000/${img}`,
          isNew: false,
        }))
      );
    }
  }, [listing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    formData.set("coordinates", JSON.stringify(coordinates));

    const existingImagesToKeep = imagePreviews
      .filter((img) => !img.isNew)
      .map((img) => img.src.replace("http://localhost:5000/", ""));
    existingImagesToKeep.forEach((path) =>
      formData.append("existingImagesToKeep", path)
    );

    formData.delete("files");
    selectedFiles.forEach((file) => {
      formData.append("files", file);
      formData.append("removedImages", JSON.stringify(removedImages));
    });

    updateMutation.mutate(
      { id, formData },
      {
        onSuccess: (data) => {
          router.push(`/nests/${data._id}`);
        },
      }
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);

    const previews = newFiles.map((file) => ({
      src: URL.createObjectURL(file),
      isNew: true,
    }));

    setImagePreviews((prev) => [...prev, ...previews]);
    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    const image = imagePreviews[index];

    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    if (!image.isNew) {
      const originalPath = image.src.replace("http://localhost:5000/", "");
      setRemovedImages((prev) => [...prev, originalPath]);
    } else {
      setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  if (isLoading)
    return (
      <div className="text-center mt-10">
        <Loading />
      </div>
    );

  return (
    <div className="">
      <MaxWidthWrapper className="pt-10">
        <h1 className="text-2xl font-bold">
          Edit your <span className="text-green-600">Nest</span>
        </h1>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col space-y-5 mt-10 py-8 bg-gray-100 dark:bg-gray-900 rounded-lg px-5 lg:px-15 lg:py-15"
        >
          <input
            name="title"
            placeholder="Title"
            className="bg-white dark:bg-gray-800 border-1 border-green-600 px-2 py-2 outline-none rounded-lg "
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="bg-white dark:bg-gray-800 border-1 border-green-600 px-2 py-2 outline-none rounded-lg "
            required
          />
          <LocationPicker onLocationSelect={setCoordinates} />
          <input
            type="hidden"
            name="coordinates"
            value={coordinates ? JSON.stringify(coordinates) : ""}
          />
          <input
            name="address"
            placeholder="Address"
            required
            className="bg-white dark:bg-gray-800 border-1 border-green-600 px-2 py-2 outline-none rounded-lg "
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
                  className="w-[200px] bg-white dark:bg-gray-800 border-1 border-green-600 px-2 py-1.5 outline-none rounded-lg "
                  required
                />
              </div>
              <div className="w-full flex md:flex-col md:items-start lg:flex-row lg:items-center justify-between items-center gap-2">
                <span className="text-lg font-semibold ">Max Guests :</span>
                <input
                  name="maxGuests"
                  type="number"
                  placeholder="Guests"
                  className="w-[200px] bg-white dark:bg-gray-800 border-1 border-green-600 px-2 py-1.5 outline-none rounded-lg "
                />
              </div>
              <DateSetter
                availableFrom={availableFrom}
                setAvailableFrom={setAvailableFrom}
                availableTo={availableTo}
                setAvailableTo={setAvailableTo}
              />
            </div>

            <SetAmenities defaultAmenities={listing?.amenities || []} />
          </div>
          <textarea
            name="houseRules"
            placeholder="House Rules"
            className="bg-white dark:bg-gray-800 border-1 border-green-600 px-2 py-2 outline-none rounded-lg "
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
            className="text-center font-semibold hover:bg-muted bg-white dark:bg-gray-800 border px-2 py-2 rounded-lg cursor-pointer"
          >
            Upload Images
          </label>

          {/* IMAGE PREVIEWS */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {imagePreviews.map((src, index) => (
                <div key={src.src} className="flex items-start">
                  <div className="relative w-full h-60">
                    <Image
                      fill
                      src={src.src}
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
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </MaxWidthWrapper>
    </div>
  );
}

export default Page;
