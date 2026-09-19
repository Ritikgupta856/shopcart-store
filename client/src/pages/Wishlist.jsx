import ProductGrid from "@/components/ProductGrid";
import useWishlistStore from "@/store/useWishlistStore";
import { Link } from "react-router-dom";
import { BsHeartbreak } from "react-icons/bs";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  const { wishlistItems } = useWishlistStore();

  if (wishlistItems.length === 0) {
    return (
      <main className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
        <BsHeartbreak size={56} className="text-text-muted-2" />
        <p className="text-lg font-semibold text-foreground">Your wishlist is empty</p>
        <p className="text-sm text-text-secondary">Save items you love and find them here later.</p>
        <Button asChild size="lg" className="mt-1">
          <Link to="/shop">Browse Products</Link>
        </Button>
      </main>
    );
  }

  return (
    <main>
      <ProductGrid products={wishlistItems} headingText="My Wishlist" />
    </main>
  );
};

export default Wishlist;
