import { Link } from "react-router-dom";
import StaticPageLayout from "@/components/StaticPageLayout";

const links = [
  { name: "Frequently Asked Questions", path: "/faqs" },
  { name: "Shipping Policy", path: "/shipping-policy" },
  { name: "Returns & Refunds", path: "/returns-refunds" },
  { name: "Track Order", path: "/track-order" },
  { name: "Contact Us", path: "/contact" },
];

const HelpCenter = () => (
  <StaticPageLayout title="Help Center">
    <p>Find answers to common questions, or reach out directly if you need more help.</p>
    <ul className="list-none space-y-2 pl-0">
      {links.map((link) => (
        <li key={link.path}>
          <Link to={link.path} className="text-primary hover:underline font-medium">
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </StaticPageLayout>
);

export default HelpCenter;
