import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ShopErrorState = ({ onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <div className="flex items-center justify-center size-14 rounded-full bg-danger-bg">
        <AlertTriangle className="text-danger" size={24} />
      </div>
      <p className="font-medium text-foreground">Unable to load products</p>
      <p className="text-sm text-text-muted-2 max-w-sm">
        Something went wrong while loading the shop.
      </p>
      <Button onClick={onRetry} className="mt-2">
        Try Again
      </Button>
    </div>
  );
};

export default ShopErrorState;
