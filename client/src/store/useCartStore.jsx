import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      showCart: false,
      setShowCart: (showCart) => set({ showCart }),
      cartItems: [],
      setCartItems: (cartItems) => set({ cartItems }),
      cartCount: 0,
      cartSubTotal: 0,
      handleAddToCart: (product, quantity) => {
        let items = [...get().cartItems];
        let index = items.findIndex((p) => product._id === p._id);
        if (index !== -1) {
          items[index] = {
            ...items[index],
            quantity: items[index].quantity + quantity,
          };
        } else {
          items.push({ ...product, quantity });
        }
        localStorage.setItem("cartItems", JSON.stringify(items));
        set({ cartItems: items });
        get().updateCartMeta();
      },
      handleRemoveFromCart: (product) => {
        let items = [...get().cartItems];
        items = items.filter((p) => p._id !== product._id);
        localStorage.setItem("cartItems", JSON.stringify(items));
        set({ cartItems: items });
        get().updateCartMeta();
      },
      handleCartProductQuantity: (type, product) => {
        let items = [...get().cartItems];
        let index = items.findIndex((p) => product._id === p._id);
        if (type === "inc") {
          items[index].quantity += 1;
        } else if (type === "dec") {
          if (items[index].quantity === 1) return;
          items[index].quantity -= 1;
        }
        localStorage.setItem("cartItems", JSON.stringify(items));
        set({ cartItems: items });
        get().updateCartMeta();
      },
      updateCartMeta: () => {
        const items = get().cartItems;
        const count = items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
        const subTotal = items?.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        ) || 0;
        set({ cartCount: count, cartSubTotal: subTotal });
      },
      initializeCart: () => {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
          set({ cartItems: JSON.parse(storedCartItems) });
        }
        get().updateCartMeta();
      },
    }),
    {
      name: "cartStore",
      partialize: (state) => ({ cartItems: state.cartItems }),
    }
  )
);

export default useCartStore;
