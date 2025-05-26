import { useQuery } from "@tanstack/react-query";
import { Listing } from "@/lib/type";
import { useUser } from "@/components/UserContext";

const fetchListingById = async (id: string): Promise<Listing> => {
  const res = await fetch(`http://localhost:5000/listings/${id}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Listing not found");
  return res.json();
};

export const GetListingById = (id?: string) => {
  return useQuery<Listing, Error>({
    queryKey: ["listing", id],
    queryFn: () => fetchListingById(id!),
    enabled: !!id,
  });
};

const fetchListing = async (): Promise<Listing[]> => {
  const res = await fetch("http://localhost:5000/listings");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export const GetAllListings = () => {
  return useQuery<Listing[], Error>({
    queryKey: ["listings"],
    queryFn: fetchListing,
  });
};

const fetchingMyListings = async (): Promise<Listing[]> => {
  const res = await fetch("http://localhost:5000/my-listings", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete listing");
  return res.json();
};

export const GetMyListings = () => {
  const { user } = useUser();
  return useQuery<Listing[]>({
    queryKey: ["myListings"],
    queryFn: fetchingMyListings,
    enabled: !!user,
  });
};
