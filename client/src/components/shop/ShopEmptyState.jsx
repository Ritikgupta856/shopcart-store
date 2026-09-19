import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

const ShopEmptyState = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <div className="flex items-center justify-center size-14 rounded-full bg-secondary">
        <PackageSearch className="text-text-muted-2" size={24} />
      </div>
      <p className="font-medium text-foreground">No products found</p>
      <p className="text-sm text-text-muted-2 max-w-sm">
        Try adjusting your filters or search for something else.
      </p>
      <Button variant="outline" onClick={onClearFilters} className="mt-2">
        Clear Filters
      </Button>
    </div>
  );
};

export default ShopEmptyState;
