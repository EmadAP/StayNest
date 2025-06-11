"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import UserTestimonial from "./UserTestimonial";
import { useInView } from "framer-motion";
import { TESTIMONIALS } from "@/lib/mock";
import { Testimonial } from "@/lib/type";

function splitArray<T>(array: T[], numParts: number): T[][] {
  const result: T[][] = Array.from({ length: numParts }, () => []);
  array.forEach((item, index) => {
    result[index % numParts].push(item);
  });
  return result;
}

function ReviewRow({
  reviews,
  className,
  msPerPixel = 15,
}: {
  reviews: Testimonial[];
  className?: string;
  msPerPixel?: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const duration = `${width * msPerPixel}ms`;

  useEffect(() => {
    if (!rowRef.current) return;
    const observer = new ResizeObserver(() => {
      setWidth(rowRef.current?.scrollWidth ?? 0);
    });
    observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={rowRef}
        className={cn(
          "flex w-max gap-10 sm:gap-6 animate-marquee-horizontal",
          className
        )}
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        {[...reviews, ...reviews].map((review, i) => (
          <div
            key={i}
            className="shrink-0 w-[380px] sm:w-[390px] md:w-[400px] lg:w-[410px]"
          >
            <UserTestimonial {...review} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewGrid() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const rows: Testimonial[][] = splitArray(TESTIMONIALS, 2);

  return (
    <div
      ref={containerRef}
      className="relative mt-24 space-y-10 overflow-hidden "
    >
      {isInView ? (
        <>
          <ReviewRow reviews={rows[0]} className="animate-scroll-ltr" />
          <ReviewRow reviews={rows[1]} className="animate-scroll-ltr" />
          {/* <ReviewRow reviews={rows[2]} className="animate-scroll-ltr" /> */}
        </>
      ) : null}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-slate-100 dark:from-slate-800" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-slate-100 dark:from-slate-800" />
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="relative max-w-screen-2xl mx-auto px-4">
      <ReviewGrid />
    </section>
  );
}
