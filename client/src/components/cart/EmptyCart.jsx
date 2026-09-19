import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card px-6 py-20 text-center">
    <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
      <ShoppingBag className="text-text-muted-2" size={28} />
    </div>
    <h2 className="mt-5 text-lg font-semibold text-foreground">Your cart is empty</h2>
    <p className="mt-1.5 max-w-sm text-sm text-text-secondary">
      Looks like you haven&apos;t added anything yet. Browse the catalogue and find something you love.
    </p>
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <Button asChild size="lg">
        <Link to="/shop">Start Shopping</Link>
      </Button>
      <Button asChild variant="outline" size="lg">
        <Link to="/categories">Browse Categories</Link>
      </Button>
    </div>
  </div>
);

export default EmptyCart;
