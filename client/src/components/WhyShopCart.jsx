import { FaBoxOpen, FaMoneyBillWave, FaHeadset } from "react-icons/fa";

// Shipping, returns and payment safety already run in the top announcement bar —
// this strip only carries what isn't said there.
const items = [
  {
    icon: FaBoxOpen,
    title: "100% Original Products",
    description: "Sourced from trusted brands",
  },
  {
    icon: FaMoneyBillWave,
    title: "Cash on Delivery",
    description: "Available on eligible orders",
  },
  {
    icon: FaHeadset,
    title: "24/7 Customer Support",
    description: "We're here to help",
  },
];

const WhyShopCart = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col items-center text-center gap-3 p-4">
            <div className="flex items-center justify-center size-12 rounded-full bg-accent">
              <item.icon className="text-primary" size={20} />
            </div>
            <span className="font-semibold text-sm text-foreground">{item.title}</span>
            <span className="text-xs text-text-muted-2">{item.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyShopCart;
