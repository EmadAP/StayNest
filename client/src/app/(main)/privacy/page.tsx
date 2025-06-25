import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

function Page() {
  return (
    <MaxWidthWrapper className="py-16 space-y-8">
      <h1 className="text-3xl font-bold text-center">Privacy Policy</h1>

      {/* Introduction */}
      <section>
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p className="text-muted-foreground">
          This Privacy Policy explains how StayNest collects, uses, and protects
          your personal information when you use our website and services.
        </p>
      </section>

      {/* Info we collect */}
      <section>
        <h2 className="text-xl font-semibold mb-2">
          2. Information We Collect
        </h2>
        <p className="text-muted-foreground">
          We collect information you provide when creating an account, listing a
          property, or making a booking. This includes your name, email,
          location, and listing or payment info.
        </p>
      </section>

      {/* How we use it */}
      <section>
        <h2 className="text-xl font-semibold mb-2">
          3. How We Use Your Information
        </h2>
        <p className="text-muted-foreground">
          We use your data to manage accounts, facilitate bookings, process
          payments, improve our platform, and communicate with you about your
          activity on StayNest.
        </p>
      </section>

      {/* Cookies */}
      <section>
        <h2 className="text-xl font-semibold mb-2">4. Cookies & Tracking</h2>
        <p className="text-muted-foreground">
          We use cookies and similar technologies to remember your preferences,
          analyze site traffic, and enhance user experience. You can disable
          cookies in your browser settings.
        </p>
      </section>

      {/* Sharing */}
      <section>
        <h2 className="text-xl font-semibold mb-2">
          5. Sharing Your Information
        </h2>
        <p className="text-muted-foreground">
          We do not sell your personal information. We may share it with service
          providers (e.g., payment processors) or when required by law.
        </p>
      </section>

      {/* Retention */}
      <section>
        <h2 className="text-xl font-semibold mb-2">6. Data Retention</h2>
        <p className="text-muted-foreground">
          We retain your information as long as your account is active or as
          needed to comply with legal obligations and resolve disputes.
        </p>
      </section>

      {/* Your rights */}
      <section>
        <h2 className="text-xl font-semibold mb-2">7. Your Rights</h2>
        <p className="text-muted-foreground">
          You can access, correct, or delete your data anytime by contacting us
          or through your account settings. In some regions, you may have
          additional privacy rights.
        </p>
      </section>

      {/* Security */}
      <section>
        <h2 className="text-xl font-semibold mb-2">8. Security</h2>
        <p className="text-muted-foreground">
          We use security measures to protect your data, but no system is 100%
          secure. Please protect your account with a strong password.
        </p>
      </section>

      {/* Changes */}
      <section>
        <h2 className="text-xl font-semibold mb-2">
          9. Changes to This Policy
        </h2>
        <p className="text-muted-foreground">
          We may update this policy occasionally. If we make significant
          changes, we’ll notify you via email or platform notice.
        </p>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
        <p className="text-muted-foreground">
          For questions or requests related to your data, contact us at{" "}
          <a href="mailto:privacy@staynest.com" className="underline">
            privacy@staynest.com
          </a>
          .
        </p>
      </section>
    </MaxWidthWrapper>
  );
}

export default Page;
