import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    const count = cartItems?.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(count);
    const subTotal = cartItems?.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setCartSubTotal(subTotal);
  }, [cartItems]);

  const handleAddToCart = (product, quantity) => {
    let items = [...cartItems];
    let index = cartItems.findIndex((p) => product._id === p._id);

    if (index !== -1) {
      items[index] = {
        ...items[index],
        quantity: items[index].quantity + quantity,
      };
    } else {
      items.push({ ...product, quantity: quantity });
    }
    localStorage.setItem("cartItems", JSON.stringify(items));
    setCartItems(items);
  };

  const handleRemoveFromCart = (product) => {
    let items = [...cartItems];
    items = items.filter((p) => p._id != product._id);
    localStorage.setItem("cartItems", JSON.stringify(items));
    setCartItems(items);
  };

  const handleCartProductQuantity = (type, product) => {
    let items = [...cartItems];
    let index = cartItems.findIndex((p) => product._id === p._id);
    if (type == "inc") {
      items[index].quantity += 1;
    } else if (type === "dec") {
      if (items[index].quantity === 1) return;
      items[index].quantity -= 1;
    }
    localStorage.setItem("cartItems", JSON.stringify(items));
    setCartItems(items);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        categories,
        setCategories,
        cartItems,
        setCartItems,
        handleAddToCart,
        cartCount,
        handleRemoveFromCart,
        showCart,
        setShowCart,
        handleCartProductQuantity,
        cartSubTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
