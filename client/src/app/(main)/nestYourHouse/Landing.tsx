"use client";
import React from "react";
import { Check, HousePlus, LockKeyhole, Pin, Star } from "lucide-react";
import Image from "next/image";
import CountUp from "react-countup";

function Landing() {
  return (
    <div>
      <div className="my-24 grid grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="col-span-2 items-center ">
          <div className="text-center ">
            <h1 className="text-4xl font-bold">Switch to Hosting</h1>
            <h2 className="text-4xl font-bold pt-4">
              Turn your{" "}
              <span className="text-white dark:text-white bg-green-600">
                House
              </span>{" "}
              into a <span className="text-green-600">Nest</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 mt-10">
              Hosting on StayNest is easy, secure, and rewarding. Whether
              you&apos;re renting out a spare room or your entire villa,
              we&apos;re here to help you turn your space into extra income.
            </p>
          </div>
          <ul className="space-y-4 text-left font-medium flex flex-col items-center  pt-6">
            <div className="space-y-4">
              <li className="flex gap-1.5 items-center text-left">
                <Check className="h-5 w-5 shrink-0 text-green-600" />
                Get discovered by thousands of travelers.
              </li>
              <li className="flex gap-1.5 items-center text-left">
                <Check className="h-5 w-5 shrink-0 text-green-600" />
                Control your price, dates, and rules.
              </li>
              <li className="flex gap-1.5 items-center text-left">
                <Check className="h-5 w-5 shrink-0 text-green-600" />
                Simple tools to manage your listing.
              </li>
              <li className="flex gap-1.5 items-center text-left">
                <Check className="h-5 w-5 shrink-0 text-green-600" />
                Secure chat and host support.
              </li>
              <li className="flex gap-1.5 items-center text-left">
                <Check className="h-5 w-5 shrink-0 text-green-600" />
                Fast, reliable payouts.
              </li>
            </div>
          </ul>
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center  gap-5">
            <div className="flex -space-x-4 ">
              <Image
                src="/users/user-1.png"
                height={40}
                width={40}
                alt="user image"
                className="inline-block rounded-full ring-2 ring-slate-100"
              />
              <Image
                src="/users/user-2.png"
                height={40}
                width={40}
                alt="user image"
                className="inline-block rounded-full ring-2 ring-slate-100"
              />
              <Image
                src="/users/user-3.png"
                height={40}
                width={40}
                alt="user image"
                className="inline-block rounded-full ring-2 ring-slate-100"
              />
              <Image
                src="/users/user-4.jpg"
                height={40}
                width={40}
                alt="user image"
                className="inline-block rounded-full ring-2 ring-slate-100"
              />
              <Image
                src="/users/user-5.jpg"
                height={40}
                width={40}
                alt="user image"
                className="inline-block object-cover rounded-full ring-2 ring-slate-100"
              />
            </div>
            <div className="flex flex-col justify-between items-center sm:items-start">
              <div className="flex gap-0.5">
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
              </div>
              <p>
                <span className="font-semibold">
                  <CountUp end={142560} duration={4} />
                </span>{" "}
                happy hosts
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5 sm:mx-15 md:mx-0 mx-10">
            <div className="flex flex-col border-2 border-green-600 dark:border-white px-3 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 shadow-md ">
              <HousePlus className="" />
              <div className="flex flex-row gap-1.5 items-center justify-center pb-5">
                <span className="font-semibold text-green-600">
                  <CountUp end={5400} duration={4} separator="," />+
                </span>
                <p>active hosts worldwide</p>
              </div>
            </div>
            <div className="flex flex-col border-2 border-green-600 dark:border-white px-3 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 shadow-md ">
              <Pin />
              <div className="flex flex-row gap-1.5 items-center justify-center pb-5">
                <span className="font-semibold text-green-600">
                  <CountUp end={27} duration={2.5} />+
                </span>
                <p>countries listed</p>
              </div>
            </div>
            <div className="flex flex-col border-2 border-green-600 dark:border-white px-3 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 shadow-md ">
              <Star />
              <div className="flex flex-row gap-1.5 items-center justify-center pb-5">
                <p>
                  Avg rating:{" "}
                  <span className="font-semibold text-green-600">
                    <CountUp end={4.8} decimals={2} duration={1.5} />
                    /5{" "}
                  </span>
                  from travelers
                </p>
              </div>
            </div>
            <div className="flex flex-col border-2 border-green-600 dark:border-white px-3 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 shadow-md ">
              <LockKeyhole />
              <div className="flex flex-row gap-1.5 items-center justify-center pb-5">
                <span className="font-semibold text-green-600">
                  <CountUp end={100} duration={2.5} />%
                </span>
                <p>secure payouts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
