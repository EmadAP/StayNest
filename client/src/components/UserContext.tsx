"use client";
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  username: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: false,
  error: null,
  refetch: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery<User, Error>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!document.cookie.includes("token=")) {
        return null;
      }
      const res = await fetch("http://localhost:5000/profile", {
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 401) {
          return null;
        }
        throw new Error("Failed to fetch profile");
      }
      return res.json();
    },
    retry: false,
  });

  return (
    <UserContext.Provider
      value={{ user: user ?? null, isLoading, error, refetch }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
