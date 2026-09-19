import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCartStore from "@/store/useCartStore";

export default function Success() {
  const resetCart = useCartStore((state) => state.resetCart);

  useEffect(() => {
    resetCart();
    sessionStorage.removeItem("shopcart_coupon");
  }, [resetCart]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-xl border border-border bg-card px-6 py-10 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-success-bg">
          <CheckCircle2 className="text-success" size={32} />
        </div>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
          Payment successful
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Thank you for your purchase. Your order is confirmed and a receipt has been sent to your
          email.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="flex-1">
            <Link to="/my-orders">View My Orders</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="flex-1">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
