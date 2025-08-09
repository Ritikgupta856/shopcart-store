import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Newsletter = () => {
  return (
    <div className="h-[70vh] flex items-center py-4 px-4 w-full bg-newsletter bg-cover">
      <div className="flex flex-col items-center mx-auto my-0 gap-4">
        <div className="uppercase text-neutral-500 font-medium">Newsletter</div>
        <span className="uppercase text-medium sm:text-2xl font-medium">
          Sign up for latest updates and offers
        </span>
        <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-2">
          <input
            type="text"
            placeholder="Email Address"
            className="outline-none flex-shrink-0 border-neutral-500/0.2 focus:border-black border px-3 py-2 w-64"
          />
          <button className="bg-[#8e2de2] text-center text-white w-30 py-2 px-6 hover:scale-90">
            Subscribe
          </button>
        </div>

        <span className="text-neutral-500">
          Will be used in accordance with Privacy Policy{" "}
        </span>

        <span className="flex gap-4">
          <div className="rounded-full bg-black p-2 text-white hover:scale-110 cursor-pointer">
            <FaFacebookF size={14} />
          </div>

          <div className="rounded-full bg-black p-2 text-white hover:scale-110 cursor-pointer">
            <FaTwitter size={14} />
          </div>

          <div className="rounded-full bg-black p-2 text-white hover:scale-110 cursor-pointer">
            <FaInstagram size={14} />
          </div>

          <div className="rounded-full bg-black p-2 text-white hover:scale-110 cursor-pointer">
            <FaLinkedinIn size={14} />
          </div>
        </span>
      </div>
    </div>
  );
};

export default Newsletter;
