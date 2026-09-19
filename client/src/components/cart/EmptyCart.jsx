import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
      <div className="flex items-center justify-center size-16 rounded-full bg-secondary">
        <ShoppingCart className="text-text-muted-2" size={28} />
      </div>
      <p className="text-lg font-medium text-foreground">Your cart is empty</p>
      <p className="text-sm text-text-muted-2">Looks like you haven't added anything yet.</p>
      <Button className="mt-2" onClick={() => navigate("/shop")}>
        Start Shopping
      </Button>
    </div>
  );
};

export default EmptyCart;
