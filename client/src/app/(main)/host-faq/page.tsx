import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

function Page() {
  return (
    <MaxWidthWrapper className="py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Host FAQ</h1>
      <Accordion type="multiple" className="w-full space-y-2">
        {/* Getting Started */}
        <AccordionItem value="getting-started-1">
          <AccordionTrigger className="font-semibold text-lg">
            How do I become a host on StayNest?
          </AccordionTrigger>
          <AccordionContent>
            Just click &quot;Nest Your House&quot; in the navigation, choose
            your property type and country, and follow the steps to list it.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="getting-started-2">
          <AccordionTrigger className="font-semibold text-lg">
            Is there a fee to list my property?
          </AccordionTrigger>
          <AccordionContent>
            No upfront fees. StayNest takes a small commission from bookings to
            keep the platform running.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="getting-started-3">
          <AccordionTrigger className="font-semibold text-lg">
            What types of properties can I list?
          </AccordionTrigger>
          <AccordionContent>
            Rooms, Apartments, and Villas — as long as it’s clean, safe, and
            available for short-term stays.
          </AccordionContent>
        </AccordionItem>

        {/* Listing Your Place */}
        <AccordionItem value="listing-1">
          <AccordionTrigger className="font-semibold text-lg">
            How do I create a good listing?
          </AccordionTrigger>
          <AccordionContent>
            Add clear photos, a good title and description, and accurate
            amenities. Honesty builds trust and gets more bookings.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="listing-2">
          <AccordionTrigger className="font-semibold text-lg">
            Can I edit my listing after publishing it?
          </AccordionTrigger>
          <AccordionContent>
            Yes, you can update your listing anytime from your profile page.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="listing-3">
          <AccordionTrigger className="font-semibold text-lg">
            How do I upload images?
          </AccordionTrigger>
          <AccordionContent>
            Use the image upload section in the &quot;Create Your Nest&quot;
            form. You can add multiple high-quality photos.
          </AccordionContent>
        </AccordionItem>

        {/* Booking & Guests */}
        <AccordionItem value="booking-1">
          <AccordionTrigger className="font-semibold text-lg">
            How do bookings work?
          </AccordionTrigger>
          <AccordionContent>
            Guests can request to book your place. You’ll be notified to accept
            or decline. You can also allow instant booking.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="booking-2">
          <AccordionTrigger className="font-semibold text-lg">
            Can I approve or reject guests?
          </AccordionTrigger>
          <AccordionContent>
            Yes, if you disable instant booking, you&apos;ll receive requests
            that you can manually approve or reject.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="booking-3">
          <AccordionTrigger className="font-semibold text-lg">
            What happens if a guest damages my property?
          </AccordionTrigger>
          <AccordionContent>
            We encourage you to report it immediately. Depending on your
            country, StayNest may offer host protection or mediation support.
          </AccordionContent>
        </AccordionItem>

        {/* Payments */}
        <AccordionItem value="payment-1">
          <AccordionTrigger className="font-semibold text-lg">
            How do I get paid?
          </AccordionTrigger>
          <AccordionContent>
            You’ll receive payouts via bank transfer or other selected methods
            after the guest checks in.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="payment-2">
          <AccordionTrigger className="font-semibold text-lg">
            When do I receive payouts?
          </AccordionTrigger>
          <AccordionContent>
            Typically 24–48 hours after guest check-in. It may vary depending on
            your bank or region.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="payment-3">
          <AccordionTrigger className="font-semibold text-lg">
            What payment methods are supported?
          </AccordionTrigger>
          <AccordionContent>
            Bank transfer, PayPal, and more depending on your country.
            You&apos;ll select your method in your host settings.
          </AccordionContent>
        </AccordionItem>

        {/* Safety & Support */}
        <AccordionItem value="safety-1">
          <AccordionTrigger className="font-semibold text-lg">
            What if something goes wrong?
          </AccordionTrigger>
          <AccordionContent>
            Contact StayNest support. We’ll help resolve issues fairly. Always
            communicate and transact within the platform.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="safety-2">
          <AccordionTrigger className="font-semibold text-lg">
            How does StayNest protect hosts?
          </AccordionTrigger>
          <AccordionContent>
            We verify users, offer messaging tools, and review systems to
            promote safe and respectful hosting.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="safety-3">
          <AccordionTrigger className="font-semibold text-lg">
            Is there customer support for hosts?
          </AccordionTrigger>
          <AccordionContent>
            Yes — reach us anytime through the Contact Us page or host
            dashboard.
          </AccordionContent>
        </AccordionItem>

        {/* Hosting Rules */}
        <AccordionItem value="rules-1">
          <AccordionTrigger className="font-semibold text-lg">
            Can I set house rules?
          </AccordionTrigger>
          <AccordionContent>
            Yes, include them clearly in your listing so guests know what to
            expect before booking.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rules-2">
          <AccordionTrigger className="font-semibold text-lg">
            Can I cancel a booking as a host?
          </AccordionTrigger>
          <AccordionContent>
            Yes, but frequent cancellations hurt trust. Only cancel for
            emergencies or serious violations.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </MaxWidthWrapper>
  );
}

export default Page;
