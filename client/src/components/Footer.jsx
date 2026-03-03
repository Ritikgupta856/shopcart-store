import { Link } from "react-router-dom";
import { FaLocationArrow, FaMobileAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const categories = [
    { name: "Headphones", slug: "headphones" },
    { name: "Smart Watches", slug: "smart-watches" },
    { name: "Bluetooth Speakers", slug: "bluetooth-speakers" },
    { name: "Wireless Earbuds", slug: "wireless-earbuds" },
    { name: "Home Theatre", slug: "home-theatre" },
  ];

  const pages = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about-us" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Returns", path: "/returns" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Contact Us", path: "/contact" },
  ];

  const socialLinks = [
    { icon: <FaFacebookF size={18} />, path: "#", color: "hover:text-[#1877F2]" },
    { icon: <FaTwitter size={18} />, path: "#", color: "hover:text-[#1DA1F2]" },
    { icon: <FaInstagram size={18} />, path: "#", color: "hover:text-[#E4405F]" },
    { icon: <FaLinkedinIn size={18} />, path: "#", color: "hover:text-[#0077B5]" },
  ];

  return (
    <footer className="bg-black w-full text-white border-t border-neutral-800">
      <div className="px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

        {/* Brand & About Section */}
        <div className="flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-2 group w-fit">
            <img src="/logo.svg" width={32} alt="ShopCart Logo" className="group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-2xl font-bold tracking-tight">
              ShopCart
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-neutral-400 max-w-xs">
            Experience the pinnacle of audio technology. Our curated collection of premium headphones, speakers, and smart devices is designed for those who demand excellence in every beat.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.path}
                className={`w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 transition-all duration-300 ${social.color} hover:border-current hover:-translate-y-1 shadow-lg`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold relative w-fit after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-1/2 after:h-0.5 after:bg-primary">
            Categories
          </h3>
          <ul className="flex flex-col gap-3">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  to={`/category/${cat.slug}`}
                  className="text-sm text-neutral-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold relative w-fit after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-1/2 after:h-0.5 after:bg-primary">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-3">
            {pages.map((page) => (
              <li key={page.name}>
                <Link
                  to={page.path}
                  className="text-sm text-neutral-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold relative w-fit after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-1/2 after:h-0.5 after:bg-primary">
            Get in Touch
          </h3>
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-4 text-neutral-400 group cursor-default">
              <div className="w-8 h-8 rounded bg-neutral-900 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                <FaLocationArrow size={14} />
              </div>
              <div className="text-sm flex-1 leading-relaxed">
                Hiranmagri Rd, Sector 3,<br />Udaipur, Rajasthan 313001
              </div>
            </div>
            <div className="flex items-center gap-4 text-neutral-400 group cursor-pointer hover:text-white transition-colors duration-200">
              <div className="w-8 h-8 rounded bg-neutral-900 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                <FaMobileAlt size={14} />
              </div>
              <div className="text-sm font-medium">9471 272 026</div>
            </div>
            <div className="flex items-center gap-4 text-neutral-400 group cursor-pointer hover:text-white transition-colors duration-200">
              <div className="w-8 h-8 rounded bg-neutral-900 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                <FaEnvelope size={14} />
              </div>
              <div className="text-sm font-medium truncate">store@shopcart.com</div>
            </div>
          </div>
        </div>

      </div>

      <div className="border-t border-neutral-900/50 bg-black/40">
        <div className="px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <span className="text-xs text-neutral-500 font-medium tracking-wide">
            © {new Date().getFullYear()} SHOPCART. ALL RIGHTS RESERVED.
          </span>
          <div className="flex items-center gap-4 transition-all duration-500">
            <span className="text-[10px] text-neutral-600 uppercase tracking-[0.2em] hidden md:block">Secure Payments</span>
            <img src="/payments.png" alt="Payment Methods" className="h-6" />
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;

