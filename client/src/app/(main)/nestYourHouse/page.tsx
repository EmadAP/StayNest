"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { useEffect, useState } from "react";
import Landing from "./Landing";
import Reviews from "./Reviews";
import { Icons } from "./Icons";
import { DoorClosed, House, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountrySelect from "./CountrySelect";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUser } from "@/components/UserContext";

function Page() {
  const [propertyType, setPropertyType] = useState<
    "house" | "apartment" | "room" | null
  >(null);
  const [country, setCountry] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  function handleCreateNest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!propertyType || !country) return;

    router.push(
      `/createNest?propertyType=${propertyType}&country=${encodeURIComponent(
        country
      )}`
    );
  }

  return (
    <div>
      <MaxWidthWrapper>
        <Landing />
      </MaxWidthWrapper>
      <div className="bg-slate-50 dark:bg-slate-800/70 py-20">
        <MaxWidthWrapper>
          <div className="flex flex-col items-center gap-20">
            <h2 className="tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl">
              What our{" "}
              <span className="relative px-2 dark:text-green-600">
                hosts{" "}
                <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-3 text-green-500 dark:text-slate-200" />
              </span>{" "}
              say
            </h2>
          </div>
          <Reviews />
        </MaxWidthWrapper>
      </div>
      <div>
        <MaxWidthWrapper>
          <div className="py-20 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold pb-6">
              Tell us about your <span className="text-green-600">place</span>
            </h2>
            <p className="text-lg">
              In this step, we&apos;ll ask you which type of property you have
              and if guests will book the{" "}
              <span className="font-semibold">entire place</span> or just a{" "}
              <span className="font-semibold">room</span> . Then let us know the{" "}
              <span className="font-semibold">country</span> your property is
              in.
            </p>
          </div>
          <div className="pb-20">
            <form
              onSubmit={handleCreateNest}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <div className="flex flex-col items-center">
                <h3 className="text-xl pb-5 border-b-4 border-b-green-600 w-fit">
                  Which of these best describes your{" "}
                  <span className="text-green-600">place</span>?
                </h3>
                <div className="my-10 flex flex-col gap-4 ">
                  <div
                    onClick={() => setPropertyType("house")}
                    className={cn(
                      "flex flex-col w-48 border-2 rounded-lg p-6 gap-3 cursor-pointer transition-transform duration-300 hover:scale-105",
                      propertyType === "house"
                        ? "border-green-600 bg-green-100 dark:bg-green-900"
                        : "border-gray-300 dark:border-white"
                    )}
                  >
                    <House size={34} />
                    <p className="text-lg">House</p>
                  </div>
                  <div
                    onClick={() => setPropertyType("apartment")}
                    className={cn(
                      "flex flex-col w-48 border-2 rounded-lg p-6 gap-3 cursor-pointer transition-transform duration-300 hover:scale-105",
                      propertyType === "apartment"
                        ? "border-green-600 bg-green-100 dark:bg-green-900"
                        : "border-gray-300 dark:border-white"
                    )}
                  >
                    <Landmark size={34} />
                    <p className="text-lg">Apartment</p>
                  </div>
                  <div
                    onClick={() => setPropertyType("room")}
                    className={cn(
                      "flex flex-col w-48 border-2 rounded-lg p-6 gap-3 cursor-pointer transition-transform duration-300 hover:scale-105",
                      propertyType === "room"
                        ? "border-green-600 bg-green-100 dark:bg-green-900"
                        : "border-gray-300 dark:border-white"
                    )}
                  >
                    <DoorClosed size={34} />
                    <p className="text-lg">Room</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center mb-20">
                <h3 className="text-xl pb-5 border-b-4 border-b-green-600 w-fit">
                  Choose the country your{" "}
                  <span className="text-green-600">place</span> located.
                </h3>
                <div className="my-10">
                  <CountrySelect onSelect={setCountry} />
                </div>
              </div>
              <div className="col-span-1 lg:col-span-2 flex items-center justify-center my-5">
                <Button className="text-lg py-6">Create Your Nest</Button>
              </div>
            </form>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
}

export default Page;
