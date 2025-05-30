"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupData } from "@/lib/type";
import { SignupUser } from "@/lib/mutations";
import { z } from "zod";

const signupSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(4, "username must be at least 4 characters"),
  email: z
    .string()
    .email("Invalid email format")
    .refine((val) => val.length >= 6 && !/^.{1}@.{1}\..{1}$/.test(val), {
      message: "Invalid email address",
    }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

function Page() {
  const router = useRouter();
  const { mutate: signup, isPending, error, isSuccess } = SignupUser();
  const [formData, setFormData] = useState<SignupData>({
    username: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [mutationError, setMutationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError(null);
    setMutationError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Invalid input";
      setFormError(firstError);
      return;
    }
    signup(formData, {
      onSuccess: () => {
        router.push("/login");
      },
      onError: (error: Error) => {
        setMutationError(error.message);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-xl min-h-1/2 p-7 rounded-xl border-2 border-gray-300 dark:border-gray-700 "
    >
      <div className="pb-6">
        <h1 className="text-3xl font-bold pb-1.5 text-green-500">Register</h1>
        <p className="text-sm text-zinc-500">
          Sign up by adding your info blow
        </p>
      </div>
      <div className="pb-8">
        <h3 className=" text-lg py-2">USERNAME</h3>
        <input
          name="username"
          type="text"
          placeholder="Enter Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full bg-gray-200 dark:bg-gray-800 rounded-sm text-sm px-3.5 py-2 outline-none"
        />
        <h3 className=" text-lg py-2">EMAIL</h3>
        <input
          name="email"
          type="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-gray-200 dark:bg-gray-800 rounded-sm text-sm px-3.5 py-2 outline-none"
        />
        <h3 className=" text-lg py-2">PASSWORD</h3>
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
        {isPending ? "Signing up..." : "Sign Up"}
      </Button>
      <div className="pt-5">
        {formError && <p className="text-red-500 mt-2">{formError}</p>}
        {error && <p className="text-red-500 mt-2">{mutationError}</p>}
        {isSuccess && <p className="text-green-500">Signup successful!</p>}
      </div>
    </form>
  );
}

export default Page;
