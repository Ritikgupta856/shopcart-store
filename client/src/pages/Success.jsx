import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import useCartStore from "@/store/useCartStore";

export default function Success() {
  const resetCart = useCartStore((state) => state.resetCart);

  useEffect(() => {
    resetCart();
  }, [resetCart]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-background">
      <div className="w-full max-w-md p-8 rounded-2xl space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-success-bg rounded-full blur-xl transform -translate-y-4"></div>
          <CheckCircle className="w-20 h-20 mx-auto text-success relative" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Payment Successful
        </h1>
        <p className="text-lg text-text-secondary mb-8">
          Thank you for your purchase! Your order is confirmed and will be
          processed soon.
        </p>
        <Button asChild className="px-8 py-6 text-lg rounded-xl">
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
