"use client";

import React, { useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function Page() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you'd normally handle form submission (e.g., API call)
    setSubmitted(true);
  };
  return (
    <MaxWidthWrapper className="py-16 space-y-10">
      <h1 className="text-3xl font-bold text-center">Contact Us</h1>

      <section className="text-muted-foreground text-center max-w-xl mx-auto">
        <p>
          Have questions, feedback, or need help? We&apos;d love to hear from
          you. Reach us through the form below or email us directly at{" "}
          <a href="mailto:support@staynest.com" className="underline">
            support@staynest.com
          </a>
          .
        </p>
      </section>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div>
            <Label htmlFor="name" className="mb-2">
              Your Name
            </Label>
            <Input type="text" id="name" required placeholder="Jane Doe" />
          </div>

          <div>
            <Label htmlFor="email" className="mb-2">
              Email Address
            </Label>
            <Input
              type="email"
              id="email"
              required
              placeholder="jane@example.com"
            />
          </div>

          <div>
            <Label htmlFor="message" className="mb-2">
              Message
            </Label>
            <Textarea
              id="message"
              required
              placeholder="Write your message here..."
              rows={5}
            />
          </div>

          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      ) : (
        <div className="text-center text-green-600 text-lg font-medium">
          Your message has been sent! We&apos;ll get back to you soon.
        </div>
      )}
    </MaxWidthWrapper>
  );
}

export default Page;
