import StaticPageLayout from "@/components/StaticPageLayout";

const PrivacyPolicy = () => (
  <StaticPageLayout title="Privacy Policy">
    <p>We collect only the information needed to process your orders — your name, email, shipping address, and payment details (handled securely via Stripe, never stored on our servers).</p>
    <p>We don't sell or share your personal information with third parties beyond what's required to fulfill your order.</p>
    <p>You may request deletion of your account data at any time by contacting us.</p>
  </StaticPageLayout>
);

export default PrivacyPolicy;
