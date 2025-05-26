import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginData, SignupData } from "./type";

const deleteListing = async (id: string) => {
  const res = await fetch(`http://localhost:5000/listings/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete listing");
};

export const DeleteListingById = () => {
  return useMutation({
    mutationFn: deleteListing,
  });
};

const updateListing = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const res = await fetch(`http://localhost:5000/listings/${id}`, {
    method: "PUT",
    body: formData,
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update listing");
  }
  return res.json();
};

export const UpdateListingById = () => {
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateListing({ id, formData }),
  });
};

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

export const CreateListings = () => {
  return useMutation({
    mutationFn: (formData: FormData) => createListing(formData),
  });
};

const signupUser = async (userData: SignupData) => {
  const res = await fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Signup failed");
  }

  return res.json();
};

export const SignupUser = () => {
  return useMutation({ mutationFn: signupUser });
};

const loginUser = async (userData: LoginData) => {
  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login failed");
  }

  return res.json();
};

export const LoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
