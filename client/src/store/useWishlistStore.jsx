import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlistItems: [],

      isWishlisted: (productId) =>
        get().wishlistItems.some((item) => item._id === productId),

      toggleWishlist: (product) => {
        const exists = get().wishlistItems.some((item) => item._id === product._id);
        if (exists) {
          set({
            wishlistItems: get().wishlistItems.filter((item) => item._id !== product._id),
          });
        } else {
          set({ wishlistItems: [...get().wishlistItems, product] });
        }
      },

      removeFromWishlist: (productId) => {
        set({
          wishlistItems: get().wishlistItems.filter((item) => item._id !== productId),
        });
      },
    }),
    {
      name: "wishlistStore",
    }
  )
);

export default useWishlistStore;
