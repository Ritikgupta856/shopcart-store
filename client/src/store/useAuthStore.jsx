import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      currentUser: {
        user: null,
        token: "",
      },
      setCurrentUser: (userObj) => set({ currentUser: userObj }),
      logOut: () => {
        set({ currentUser: { user: null, token: "" } });
        localStorage.removeItem("currentUser");
      },
    }),
    {
      name: "currentUser",
      partialize: (state) => ({ currentUser: state.currentUser }),
    }
  )
);

export default useAuthStore;
