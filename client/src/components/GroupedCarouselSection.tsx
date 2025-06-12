"use client";
import React from "react";
import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NestCard from "./NestCard";
import { Listing } from "@/lib/type";

interface GroupedCarouselSectionProps {
  title: string;
  link: string;
  listings: Listing[];
}

const GroupedCarouselSection: React.FC<GroupedCarouselSectionProps> = ({
  title,
  link,
  listings,
}) => {
  const preview = listings.slice(0, 10);

  return (
    <section>
      <MaxWidthWrapper>
        <div className="mb-4 flex justify-between items-center">
          <Link
            href={link}
            className="text-2xl font-semibold capitalize hover:underline"
          >
            {title} →
          </Link>
        </div>

        <div className="relative border-2 border-green-600 p-3 rounded-xl bg-slate-200 dark:bg-slate-800">
          <Carousel opts={{ align: "start" }} className="w-full">
            <div className="absolute -top-13 right-1 mt-2 z-10 flex gap-4">
              <CarouselPrevious className="static w-auto h-auto p-2" />
              <CarouselNext className="static w-auto h-auto p-2" />
            </div>

            <CarouselContent>
              {preview.map((listing) => (
                <CarouselItem
                  key={listing._id}
                  className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <div className="p-1">
                    <NestCard {...listing} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default GroupedCarouselSection;
