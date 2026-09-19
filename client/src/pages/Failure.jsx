import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Failure() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-xl border border-border bg-card px-6 py-10 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-danger-bg">
          <XCircle className="text-danger" size={32} />
        </div>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">Payment failed</h1>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Your payment could not be completed and you have not been charged. Your cart has been kept
          so you can try again.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="flex-1">
            <Link to="/cart">Back to Cart</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="flex-1">
            <Link to="/help-center">Get Help</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
