"use client";
import Loading from "@/components/Loading";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NestCard from "@/components/NestCard";
import { useUser } from "@/components/UserContext";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Listing } from "@/lib/type";

async function fetchingMyListings(): Promise<Listing[]> {
  const res = await fetch("http://localhost:5000/my-listings", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete listing");
  return res.json();
}

function Page() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  const {
    data: listings,
    isLoading,
    isError,
    error,
  } = useQuery<Listing[]>({
    queryKey: ["myListings"],
    queryFn: fetchingMyListings,
    enabled: !!user,
  });

  if (!user || isLoading || !listings) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <MaxWidthWrapper className="py-4">
        <h1 className="text-zinc-700 border-b-2 py-4 border-b-green-500  text-2xl font-semibold">
          My Profile
        </h1>
        {user && (
          <div className="my-6 space-y-2">
            <p>
              <span className="font-semibold">Username: </span>
              <span className="text-sm">{user.username}</span>
            </p>
            <p>
              <span className="font-semibold">Email: </span>
              <span className="text-sm"> {user.email ?? "Not available"}</span>
            </p>
            {/* <p>
              <span className="font-semibold">Joined at: </span>
              <span className="text-sm">{user.createdAt}</span>
            </p> */}
          </div>
        )}
        <h2 className="text-zinc-700 border-b-2 border-b-green-500 text-xl font-semibold pb-4 pt-4">
          My Nests
        </h2>

        <div className="pb-4 pt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
          {listings.map((listing) => (
            <NestCard
              key={listing._id}
              _id={listing._id}
              title={listing.title}
              images={listing.images}
              pricePerNight={listing.pricePerNight}
              availableFrom={new Date(
                listing.availableFrom
              ).toLocaleDateString()}
              availableTo={new Date(listing.availableTo).toLocaleDateString()}
              fromProfile
            />
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default Page;
