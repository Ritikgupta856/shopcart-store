import { FaTruck, FaShieldAlt, FaUndo, FaLeaf } from "react-icons/fa";

const items = [
  { icon: FaTruck, title: "Free Shipping", description: "On orders over ₹999" },
  { icon: FaShieldAlt, title: "Secure Payments", description: "100% safe & reliable" },
  { icon: FaUndo, title: "Easy Returns", description: "7-day hassle-free" },
  { icon: FaLeaf, title: "Sustainable Choices", description: "A greener tomorrow" },
];

const TrustFeatures = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-6 border-b border-border">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <item.icon className="text-primary shrink-0" size={18} />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-foreground">{item.title}</span>
              <span className="text-xs text-text-muted-2">{item.description}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustFeatures;
