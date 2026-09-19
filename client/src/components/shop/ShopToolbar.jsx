import { SlidersHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const sortOptions = [
  { value: "", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

const ShopToolbar = ({ total, search, onSearchChange, sort, onSortChange, onOpenMobileFilters }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
      <span className="text-sm text-text-secondary shrink-0">{total} products</span>

      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-2" size={16} />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring shrink-0"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            Sort by: {opt.label}
          </option>
        ))}
      </select>

      <button
        onClick={onOpenMobileFilters}
        className="lg:hidden flex items-center gap-2 h-10 px-4 rounded-md border border-input text-sm text-foreground shrink-0"
      >
        <SlidersHorizontal size={16} />
        Filters
      </button>
    </div>
  );
};

export default ShopToolbar;
