"use client";
import { Button } from "@/components/ui/button";
import { LoginUser } from "@/lib/mutations";
import { LoginData } from "@/lib/type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const { mutate: login, isPending, error } = LoginUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-xl min-h-1/2 p-7 rounded-xl border-2 border-gray-300 dark:border-gray-700 "
    >
      <div className="pb-6">
        <h1 className="text-3xl font-bold pb-1.5 text-green-500">Login</h1>
        <p className="text-sm text-zinc-500">Login to your account</p>
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
        {isPending ? "Logging in..." : "Login"}
      </Button>
      {error && <p className="text-red-500 mt-2">{(error as Error).message}</p>}
      <p className="text-zinc-500 dark:text-white text-sm py-10">
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
