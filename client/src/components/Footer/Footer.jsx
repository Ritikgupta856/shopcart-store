import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import Payment from "../../assets/payments.png";

const Footer = () => {
  return (
    <footer className="bg-black w-full text-white">
      <div className="p-6 md:p-8 max-w-[1200px] flex flex-wrap gap-5 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14 justify-between">
        <div className="flex flex-col max-w-[300px] gap-6">
          <div className="text-xl font-medium">About</div>
          <div className="text-sm text-justify text-neutral-400">
            Welcome to our online store for all your audio and technology needs!
            We offer a wide range of products including headphones, Bluetooth
            speakers, smartwatches and more. With our user-friendly website, you
            can easily shop from the comfort of your home and have your favorite
            items delivered to you. Experience the best of technology with us.
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-xl font-medium">Contact</div>
          <div className="flex flex-col gap-4 text-neutral-400">
            <div className="flex items-center gap-2">
              <FaLocationArrow />
              <div className="text-sm">
                Hiranmagri Rd, Sector 3, Udaipur, 313001
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaMobileAlt />
              <div className="text-sm">Phone: 9471 272 026</div>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope />
              <div className="text-sm">Email: store@shopcart.com</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-xl font-medium">Categories</div>
          <div className="flex flex-col gap-4 text-sm cursor-pointer text-neutral-400">
            <span>Headphones</span>
            <span>Smart Watches</span>
            <span>Bluetooth Speakers</span>
            <span>Wireless Earbuds</span>
            <span>Home Theatre</span>
            <span>Projectors</span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-xl font-medium">Pages</div>
          <div className="flex flex-col gap-4 text-sm cursor-pointer text-neutral-400">
            <span>Home</span>
            <span>About</span>
            <span>Privacy Policy</span>
            <span>Returns</span>
            <span>Terms & Conditions</span>
            <span>Contact Us</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 border-t border-neutral-700 py-4 px-6 md:px-8 sm:flex-row sm:justify-between">
        <span className="text-sm text-neutral-400">Copyright @2024 ShopCart. All Rights Reserved</span>
        <img src={Payment} alt="Payment Methods" />
      </div>
    </footer>
  );
};

export default Footer;