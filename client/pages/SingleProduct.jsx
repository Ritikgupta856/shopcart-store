import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProducts from "../src/components/RelatedProducts";
import useCartStore from "@/store/useCartStore";

const socialMediaLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/",
    icon: <FaFacebookF size={16} />,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/",
    icon: <FaTwitter size={16} />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/",
    icon: <FaInstagram size={16} />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/",
    icon: <FaLinkedinIn size={16} />,
  },
  {
    name: "Pinterest",
    url: "https://www.pinterest.com/",
    icon: <FaPinterest size={16} />,
  },
];

const SingleProduct = () => {
  const [product, setProduct] = useState();
  const { slug } = useParams();
  const { handleAddToCart } = useCartStore();

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/products/${slug}`
      );
      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prevState) => prevState + 1);
  };
  const decrement = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  };

  if (!product) return null;

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 mt-10 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row w-full gap-10">
          <div className="bg-neutral-100 flex w-fit md:w-[500px] h-[500px] shrink-0 rounded-2xl">
            <img src={product.image} alt={product.image} className="w-full" />
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-3xl font-bold">{product.name}</span>
            <span className="text-xl font-medium">&#8377;{product.price}</span>
            <span className="font-medium text-[#6b6b6b]">
              {product.description}
            </span>

            <div className="flex flex-row gap-5 items-center mt-10">
              <div className="flex border-2">
                <span
                  className="border-r-2 p-5 cursor-pointer"
                  onClick={decrement}
                >
                  -
                </span>
                <span className="p-5 cursor-pointer">{quantity}</span>
                <span
                  className="border-l-2 p-5 cursor-pointer"
                  onClick={increment}
                >
                  +
                </span>
              </div>
              <button
                className="flex gap-2 items-center rounded-md bg-black p-4 text-sm font-semibold text-white hover:bg-black/80"
                onClick={() => {
                  handleAddToCart(product, quantity);
                  setQuantity(1);
                  toast.success("Product added successfully");
                }}
              >
                <FaCartPlus size={20} />
                ADD TO CART
              </button>
            </div>
            <hr className="mt-5" />
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-bold">
                Category :<span> {product.category.name} </span>
              </span>
              <span className="flex flex-row gap-2 items-center">
                Share:
                <span className="flex flex-row gap-4">
                  {socialMediaLinks.map((link, index) => (
                    <a key={index} href={link.url}>
                      {link.icon}
                    </a>
                  ))}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <RelatedProducts
            productId={product._id}
            categoryId={product.category._id}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
