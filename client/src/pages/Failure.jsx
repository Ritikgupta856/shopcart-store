import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Failure() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-background">
      <div className="w-full max-w-md p-8 rounded-2xl space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-danger-bg rounded-full blur-xl transform -translate-y-4"></div>
          <XCircle className="w-20 h-20 mx-auto text-danger relative" />
        </div>
        <h1 className="text-3xl font-bold text-danger mb-4">Payment Failed</h1>
        <p className="text-lg text-text-secondary mb-8">
          Unfortunately, your payment was not successful. Please try again or
          contact our support team for assistance.
        </p>
        <Button asChild className="px-8 py-6 text-lg rounded-xl">
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
