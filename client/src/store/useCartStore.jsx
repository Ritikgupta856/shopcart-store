import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      showCart: false,
      setShowCart: (showCart) => set({ showCart }),
      cartItems: [],
      setCartItems: (cartItems) => {
        set({ cartItems });
        get().updateCartMeta();
      },
      cartCount: 0,
      cartSubTotal: 0,

      resetCart: () => set({ cartItems: [], cartCount: 0, cartSubTotal: 0 }),

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
        set({ cartItems: items });
        get().updateCartMeta();
      },

      handleRemoveFromCart: (product) => {
        let items = [...get().cartItems];
        items = items.filter((p) => p._id !== product._id);
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
        set({ cartItems: items });
        get().updateCartMeta();
      },

      updateCartMeta: () => {
        const items = get().cartItems;
        const count = items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
        const subTotal =
          items?.reduce((acc, item) => acc + item.quantity * item.price, 0) ||
          0;
        set({ cartCount: count, cartSubTotal: subTotal });
      },
    }),
    {
      name: "cartStore", 
      partialize: (state) => ({
        cartItems: state.cartItems,
        cartCount: state.cartCount,
        cartSubTotal: state.cartSubTotal,
      }),
    }
  )
);

export default useCartStore;
