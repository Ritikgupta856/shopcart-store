import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import useCategories from "@/hooks/useCategories";

const quickLinks = [
  { name: "Contact", path: "/contact" },
  { name: "FAQs", path: "/faqs" },
  { name: "Shipping Policy", path: "/shipping-policy" },
  { name: "Returns & Refunds", path: "/returns-refunds" },
  { name: "Terms & Conditions", path: "/terms-conditions" },
];

const supportLinks = [
  { name: "Help Center", path: "/help-center" },
  { name: "Track Order", path: "/track-order" },
  { name: "Size Guide", path: "/size-guide" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Sitemap", path: "/sitemap" },
];

const socialLinks = [
  { icon: <FaFacebookF size={16} />, path: "#" },
  { icon: <FaTwitter size={16} />, path: "#" },
  { icon: <FaInstagram size={16} />, path: "#" },
  { icon: <FaLinkedinIn size={16} />, path: "#" },
];

const Footer = () => {
  const { categories } = useCategories();

  return (
    <footer className="bg-[hsl(151,43%,15%)] w-full text-white">
      <div className="px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <img src="/logo.svg" width={28} alt="ShopCart Logo" />
            <span className="text-xl font-bold tracking-tight">ShopCart</span>
          </Link>
          <p className="text-sm text-white/70 max-w-xs">Good things, all in one place.</p>
          <div className="flex gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.path}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Shop by Category */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">Shop by Category</h3>
          <ul className="flex flex-col gap-2">
            {categories.slice(0, 5).map((cat) => (
              <li key={cat.slug}>
                <Link to={`/shop/${cat.slug}`} className="text-sm text-white/70 hover:text-white transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            {quickLinks.map((page) => (
              <li key={page.path}>
                <Link to={page.path} className="text-sm text-white/70 hover:text-white transition-colors">
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Support */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">Customer Support</h3>
          <ul className="flex flex-col gap-2">
            {supportLinks.map((page) => (
              <li key={page.path}>
                <Link to={page.path} className="text-sm text-white/70 hover:text-white transition-colors">
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <span className="text-xs text-white/60">
            © {new Date().getFullYear()} ShopCart. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
