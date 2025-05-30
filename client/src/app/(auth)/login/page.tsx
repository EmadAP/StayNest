"use client";

import { Button } from "@/components/ui/button";
import { LoginUser } from "@/lib/mutations";
import { LoginData } from "@/lib/type";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";

// ✅ Define Zod schema
const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(4, "username must be at least 4 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: login, isPending, error } = LoginUser();

  const [formData, setFormData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [mutationError, setMutationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError(null); // clear validation error on change
    setMutationError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validate with Zod
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Invalid input";
      setFormError(firstError);
      return;
    }

    login(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        router.push("/");
      },
      onError: (error: Error) => {
        setMutationError(error.message);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-xl min-h-1/2 p-7 rounded-xl border-2 border-gray-300 dark:border-gray-700"
    >
      <div className="pb-6">
        <h1 className="text-3xl font-bold pb-1.5 text-green-500">Login</h1>
        <p className="text-sm text-zinc-500">Login to your account</p>
      </div>

      <div className="pb-8">
        <h3 className="text-lg py-2">USERNAME</h3>
        <input
          name="username"
          type="text"
          placeholder="Enter Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full bg-gray-200 dark:bg-gray-800 rounded-sm text-sm px-3.5 py-2 outline-none"
        />

        <h3 className="text-lg py-2">PASSWORD</h3>
        <input
          name="password"
          type="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-gray-200 dark:bg-gray-800 rounded-sm text-sm px-3.5 py-2 outline-none"
        />
      </div>

      <Button className="text-lg text-white dark:text-white">
        {isPending ? "Logging in..." : "Login"}
      </Button>
      <div className="pt-4">
        {/* ✅ Show validation error */}
        {formError && <p className="text-red-500 mt-2">{formError}</p>}

        {/* ✅ Show server error */}
        {error && <p className="text-red-500 mt-2">{mutationError}</p>}
      </div>
      <p className="text-zinc-500 dark:text-white text-sm pb-10 pt-5">
        if you don&apos;t have account{" "}
        <Link href="/signup">
          <span className="text-green-500 hover:text-green-400 hover:underline">
            Sign Up{" "}
          </span>
        </Link>
        here.
      </p>
    </form>
  );
}

export default Page;
