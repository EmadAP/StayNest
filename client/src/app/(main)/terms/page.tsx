import React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

function Page() {
  return (
    <MaxWidthWrapper className="py-16 space-y-8">
      <h1 className="text-3xl font-bold text-center">Terms of Service</h1>

      {/* Introduction */}
      <section>
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p className="text-muted-foreground">
          Welcome to StayNest. By accessing or using our platform, you agree to
          comply with and be bound by these Terms of Service. If you do not
          agree, please do not use StayNest.
        </p>
      </section>

      {/* User Accounts */}
      <section>
        <h2 className="text-xl font-semibold mb-2">2. User Accounts</h2>
        <p className="text-muted-foreground">
          You must be at least 18 years old to create an account. You are
          responsible for maintaining the confidentiality of your account and
          for all activities that occur under it.
        </p>
      </section>

      {/* Hosts */}
      <section>
        <h2 className="text-xl font-semibold mb-2">3. Host Responsibilities</h2>
        <p className="text-muted-foreground">
          Hosts must provide accurate information, maintain a clean and safe
          space, and comply with local laws. StayNest is not responsible for the
          conduct of hosts or guests.
        </p>
      </section>

      {/* Guests */}
      <section>
        <h2 className="text-xl font-semibold mb-2">
          4. Guest Responsibilities
        </h2>
        <p className="text-muted-foreground">
          Guests must respect host rules, treat the property with care, and
          communicate clearly. Damages may result in charges or legal action.
        </p>
      </section>

      {/* Payments */}
      <section>
        <h2 className="text-xl font-semibold mb-2">5. Payments & Fees</h2>
        <p className="text-muted-foreground">
          StayNest charges a service fee on bookings. All payments are processed
          securely. You agree to pay all applicable charges related to your
          bookings.
        </p>
      </section>

      {/* Cancellations */}
      <section>
        <h2 className="text-xl font-semibold mb-2">
          6. Cancellations & Refunds
        </h2>
        <p className="text-muted-foreground">
          Cancellation and refund policies vary by listing. Please review them
          before booking. StayNest reserves the right to mediate disputes.
        </p>
      </section>

      {/* Prohibited Conduct */}
      <section>
        <h2 className="text-xl font-semibold mb-2">7. Prohibited Conduct</h2>
        <p className="text-muted-foreground">
          Users may not use StayNest for illegal activities, harassment,
          discrimination, or spam. Violations may result in suspension or
          termination.
        </p>
      </section>

      {/* Liability */}
      <section>
        <h2 className="text-xl font-semibold mb-2">
          8. Limitation of Liability
        </h2>
        <p className="text-muted-foreground">
          StayNest is not liable for damages, losses, or disputes between users.
          Our platform is provided “as is” without warranties of any kind.
        </p>
      </section>

      {/* Changes */}
      <section>
        <h2 className="text-xl font-semibold mb-2">9. Changes to Terms</h2>
        <p className="text-muted-foreground">
          We may update these terms from time to time. Continued use of StayNest
          after changes means you accept the revised terms.
        </p>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
        <p className="text-muted-foreground">
          If you have questions about these terms, please contact us at{" "}
          <a href="mailto:support@staynest.com" className="underline">
            support@staynest.com
          </a>
          .
        </p>
      </section>
    </MaxWidthWrapper>
  );
}

export default Page;
