import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/useCartStore";
import useAuthStore from "../store/useAuthStore";

const Cart = ({ setshowCart }) => {
  const [loading, setLoading] = useState(false);
  const { cartItems, cartSubTotal, handleAddToCart, handleRemoveFromCart, handleCartProductQuantity, setShowCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const stripe = await stripePromise;

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/create-checkout-session`,
        {
          products: cartItems,
          user: user?.fullname,
          totalAmount: cartSubTotal,
        }
      );

      console.log(res);

      await stripe.redirectToCheckout({
        sessionId: res.data.sessionId,
      });
    } catch (error) {
      console.log("error hello", error);
    }
  };

  return (
    <div>
      <div className="flex fixed top-0 left-0 h-full w-full z-50">
        <div className="bg-black bg-opacity-50 w-full h-full justify-end flex top-0 left-0">
          <div className=" flex flex-col w-full h-full md:w-[340px] bg-white transform translate-x-full animate-slide-cart-window relative z-1">
            <div className="flex justify-between items-center border-b border-gray-200 p-4 w-full">
              <span className="text-lg font-semibold uppercase">
                Shopping Cart
              </span>
              <span
                className="cursor-pointer"
                onClick={() => setshowCart(false)}
              >
                <MdClose />
              </span>
            </div>

            {!cartItems?.length && (
              <div className="flex flex-col items-center justify-center h-full">
                <BsCartX size={120} />
                <span className="mt-5 text-lg font-medium">
                  No products in the cart
                </span>
                <button
                  className="bg-black text-white p-4 mt-10 uppercase"
                  onClick={() => {
                    navigate("/");
                    setshowCart(false);
                  }}
                >
                  Return to Shop
                </button>
              </div>
            )}

            {!!cartItems?.length && (
              <>
                <CartItem />
                <div className="border-t border-gray-200">
                  <div className="flex justify-between w-full px-4 py-3 border-b border-gray-200">
                    <div className="text-lg font-semibold  uppercase">
                      Subtotal
                    </div>
                    <div className="text-lg font-semibold text-purple-600">
                      &#8377;{cartSubTotal}{" "}
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <button
                      onClick={() => {
                        if (!user) {
                          setshowCart(false);
                          navigate("/login");
                        } else {
                          handlePayment();
                        }
                      }}
                      className="w-full bg-black flex gap-2 items-center justify-center hover:bg-black/70 transition text-lg py-3 px-4 mt-4 text-white"
                    >
                      Checkout
                      {loading && (
                        <img className="flex" src="/spinner.svg" alt="" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
