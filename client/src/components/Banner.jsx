import { FaTruck, FaUndo, FaShieldAlt, FaHeadset } from "react-icons/fa";

const items = [
  { icon: FaTruck, text: "Free shipping on orders over ₹999" },
  { icon: FaUndo, text: "Easy returns within 7 days" },
  { icon: FaShieldAlt, text: "Secure & safe payments" },
  { icon: FaHeadset, text: "Help Center" },
];

export default function Banner() {
  return (
    <div className="w-full bg-[hsl(151,43%,22%)] text-white py-2 px-4 text-xs">
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-1.5">
        {items.map((item) => (
          <span key={item.text} className="flex items-center gap-1.5 whitespace-nowrap">
            <item.icon size={12} />
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
