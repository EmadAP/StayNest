import { Check, Star } from "lucide-react";
import Image from "next/image";
import React from "react";

interface UserTestimonialProps {
  name: string;
  image: string;
  message: string;
  rating?: number;
}

function UserTestimonial({
  name,
  image,
  message,
  rating = 5,
}: UserTestimonialProps) {
  return (
    <div>
      <div className="w-96 h-64 border-2 border-green-600 dark:border-white rounded-2xl p-6 shadow-lg bg-white dark:bg-black ">
        <div className="flex flex-row items-center justify-between pb-6">
          <div className="flex flex-row items-center gap-6">
            <div className="relative w-16 h-16">
              <Image
                src={image}
                alt={name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="font-semibold">{name}</p>
              <div className="flex flex-row items-center gap-1">
                <Check className="text-green-600 h-4 w-4 stroke-[3px]" />
                <p className="text-sm text-zinc-600 dark:text-zinc-500">
                  Verified Host
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 text-green-600 fill-green-600" />
            ))}
          </div>
        </div>

        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
}

export default UserTestimonial;
