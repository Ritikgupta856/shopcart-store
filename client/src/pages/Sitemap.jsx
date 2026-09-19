import { Link } from "react-router-dom";
import StaticPageLayout from "@/components/StaticPageLayout";

const links = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Categories", path: "/categories" },
  { name: "Wishlist", path: "/wishlist" },
  { name: "Contact", path: "/contact" },
  { name: "FAQs", path: "/faqs" },
  { name: "Shipping Policy", path: "/shipping-policy" },
  { name: "Returns & Refunds", path: "/returns-refunds" },
  { name: "Terms & Conditions", path: "/terms-conditions" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Help Center", path: "/help-center" },
  { name: "Track Order", path: "/track-order" },
  { name: "Size Guide", path: "/size-guide" },
];

const Sitemap = () => (
  <StaticPageLayout title="Sitemap">
    <ul className="list-none pl-0 grid grid-cols-1 sm:grid-cols-2 gap-2">
      {links.map((link) => (
        <li key={link.path}>
          <Link to={link.path} className="text-primary hover:underline">
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </StaticPageLayout>
);

export default Sitemap;
