import { useMutation } from "@tanstack/react-query";
import { LoginData, SignupData } from "./type";
import { toast } from "sonner";

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
    onSuccess: () => {
      toast.success("Nest deleted successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to delete the Nest", {
        description: error.message,
      });
    },
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
    onSuccess: () => {
      toast.success("Nest updated successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to update the Nest", {
        description: error.message,
      });
    },
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
    onSuccess: () => {
      toast.success("Nest created successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to create the Nest", {
        description: error.message,
      });
    },
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
  return useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success("Account created successfully. Welcome to StayNest!");
    },
    onError: (error: Error) => {
      toast.error("Failed to create your Account. try again!", {
        description: error.message,
      });
    },
  });
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
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success("Welcome back! You’ve successfully logged in.");
    },
    onError: (error: Error) => {
      toast.error(
        "Login failed! Please check your credentials and try again.",
        {
          description: error.message,
        }
      );
    },
  });
};

const logoutUser = async () => {
  const res = await fetch("http://localhost:5000/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }
};

export const LogoutUser = () => {
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success("You’ve successfully logged out!");
    },
    onError: (error: Error) => {
      toast.error("Logout failed!", {
        description: error.message,
      });
    },
  });
};
