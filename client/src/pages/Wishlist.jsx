import ProductGrid from "@/components/ProductGrid";
import useWishlistStore from "@/store/useWishlistStore";
import { Link } from "react-router-dom";
import { BsHeartbreak } from "react-icons/bs";

const Wishlist = () => {
  const { wishlistItems } = useWishlistStore();

  if (wishlistItems.length === 0) {
    return (
      <main className="mt-10 min-h-[50vh] flex flex-col items-center justify-center gap-4 px-4">
        <BsHeartbreak size={64} className="text-text-muted-2" />
        <p className="text-lg font-medium text-foreground">Your wishlist is empty</p>
        <Link to="/shop" className="bg-primary text-primary-foreground rounded-md px-6 py-3 text-sm font-medium">
          Browse Products
        </Link>
      </main>
    );
  }

  return (
    <main className="mt-10">
      <ProductGrid products={wishlistItems} headingText="My Wishlist" />
    </main>
  );
};

export default Wishlist;
