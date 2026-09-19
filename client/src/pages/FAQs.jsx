import StaticPageLayout from "@/components/StaticPageLayout";

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Most orders are delivered within 3-7 business days depending on your location.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major credit/debit cards and UPI via Stripe checkout.",
  },
  {
    q: "Can I cancel my order?",
    a: "Orders can be cancelled before they're shipped. Contact support for assistance.",
  },
  {
    q: "How do I track my order?",
    a: "Order status is available from your account once tracking details are added.",
  },
];

const FAQs = () => (
  <StaticPageLayout title="Frequently Asked Questions">
    {faqs.map((item) => (
      <div key={item.q}>
        <p className="font-semibold text-foreground">{item.q}</p>
        <p>{item.a}</p>
      </div>
    ))}
  </StaticPageLayout>
);

export default FAQs;
