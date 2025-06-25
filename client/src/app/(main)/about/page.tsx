import React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Page() {
  return (
    <MaxWidthWrapper className="py-16 space-y-12 ">
      {/* Heading */}
      <section className="text-center bg-slate-200 p-4 rounded-2xl border-2 border-green-600 dark:bg-slate-800 dark:border-white">
        <h1 className="text-4xl font-bold mb-4 dark:text-green-600">
          About StayNest
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          StayNest is your trusted platform for discovering, booking, and
          hosting unique places to stay around the world. Whether you’re a
          traveler or a host, we help you find or offer the perfect nest.
        </p>
      </section>

      {/* How it works */}
      <section className="grid md:grid-cols-2 gap-8 ">
        <div className="bg-slate-200 p-4 rounded-2xl border-2 border-green-600 dark:bg-slate-800 dark:border-white">
          <h2 className="text-2xl font-semibold mb-2 dark:text-green-600">
            For Travelers
          </h2>
          <p className="text-muted-foreground">
            Browse curated listings from private rooms to full villas. Use
            powerful filters to find stays that match your needs — location,
            property type, price, and more. Booking is secure, fast, and
            effortless.
          </p>
        </div>
        <div className="bg-slate-200 p-4 rounded-2xl border-2 border-green-600 dark:bg-slate-800 dark:border-white">
          <h2 className="text-2xl font-semibold mb-2 dark:text-green-600">
            For Hosts
          </h2>
          <p className="text-muted-foreground">
            Share your space and earn. StayNest provides tools to create
            beautiful listings, manage bookings, and connect with guests. We
            take care of the platform — you focus on hosting.
          </p>
        </div>
      </section>

      {/* Why StayNest */}
      <section className="bg-slate-200 p-4 rounded-2xl border-2 border-green-600 dark:bg-slate-800 dark:border-white ">
        <h2 className="text-2xl font-semibold mb-4 text-center dark:text-green-600">
          Why StayNest?
        </h2>
        <ul className="text-muted-foreground list-disc list-inside space-y-2 max-w-lg mx-auto">
          <li>Clean, modern UI for a smooth experience</li>
          <li>Transparent booking system and fair host policies</li>
          <li>Personalized recommendations and filters</li>
          <li>Focus on trust and safety for both sides</li>
          <li>Open-source spirit (built by devs, for devs too!)</li>
        </ul>
      </section>

      {/* Creator / Credits */}
      <section className="text-center bg-slate-200 p-4 rounded-2xl border-2 border-green-600 dark:bg-slate-800 dark:border-white">
        <h2 className="text-2xl font-semibold mb-2 dark:text-green-600">
          Built by Hated
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          StayNest is a solo project by Hated — designed, coded, and shipped
          with care. The goal? To learn, create, and solve real-world problems
          with clean code and great UX.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center">
        <p className="text-lg mb-4">Ready to get started?</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/nestYourHouse">
            <Button variant="default">Become a Host</Button>
          </Link>
          <Link href="/browse">
            <Button variant="outline">Explore Listings</Button>
          </Link>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}

export default Page;
