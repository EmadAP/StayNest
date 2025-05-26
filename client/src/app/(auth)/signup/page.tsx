"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupData } from "@/lib/type";
import { SignupUser } from "@/lib/mutations";

function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState<SignupData>({
    username: "",
    email: "",
    password: "",
  });

  const { mutate: signup, isPending, error, isSuccess } = SignupUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(formData, {
      onSuccess: () => {
        router.push("/login");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-xl min-h-1/2 p-7 rounded-xl border-2 border-gray-300 "
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
          className="w-full bg-gray-200 rounded-sm text-sm px-3.5 py-2 outline-none"
        />
        <h3 className=" text-lg py-2">EMAIL</h3>
        <input
          name="email"
          type="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-gray-200 rounded-sm text-sm px-3.5 py-2 outline-none"
        />
        <h3 className=" text-lg py-2">PASSWORD</h3>
        <input
          name="password"
          type="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-gray-200 rounded-sm text-sm px-3.5 py-2 outline-none"
        />
      </div>
      <Button className="text-lg">
        {isPending ? "Signing up..." : "Sign Up"}
      </Button>
      {error && <p className="text-red-500">{(error as Error).message}</p>}
      {isSuccess && <p className="text-green-500">Signup successful!</p>}
    </form>
  );
}

export default Page;
