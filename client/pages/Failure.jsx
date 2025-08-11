import { Button } from "@/components/ui/button";
import { X, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Failure() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-white">
      <div className="w-full max-w-md p-8 rounded-2xl space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-olive-green/10 rounded-full blur-xl transform -translate-y-4"></div>
          <XCircle className="w-20 h-20 mx-auto text-red-500 relative" />
        </div>
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-lg text-gray-700 mb-8">
          Unfortunately, your payment was not successful. Please try again or
          contact our support team for assistance.
        </p>
        <Button
          asChild
          className="bg-violet-500 hover:bg-violet-600 text-white px-8 py-6 text-lg rounded-xl transition-transform"
        >
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}