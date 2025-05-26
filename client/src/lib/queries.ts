import { useQuery } from "@tanstack/react-query";
import { Listing } from "@/lib/type";

const fetchListingById = async (id: string): Promise<Listing> => {
  const res = await fetch(`http://localhost:5000/listings/${id}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Listing not found");
  return res.json();
};

export const useListing = (id?: string) => {
  return useQuery<Listing, Error>({
    queryKey: ["listing", id],
    queryFn: () => fetchListingById(id!),
    enabled: !!id,
  });
};
