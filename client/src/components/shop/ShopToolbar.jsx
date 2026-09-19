import { SlidersHorizontal, Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

const sortOptions = [
  { value: "", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

const ShopToolbar = ({
  search,
  onSearchChange,
  sort,
  onSortChange,
  onOpenMobileFilters,
  activeFilterCount,
}) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onOpenMobileFilters}
        className="relative flex h-10 shrink-0 items-center gap-2 rounded-md border border-input px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:hidden"
      >
        <SlidersHorizontal size={15} />
        Filters
        {activeFilterCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
            {activeFilterCount}
          </span>
        )}
      </button>

      <div className="relative min-w-0 flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-2" size={16} />
        <Input
          placeholder="Search in this collection..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="relative shrink-0">
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort products"
          className="h-10 appearance-none rounded-md border border-input bg-background pl-3 pr-9 text-sm text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Sort: {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted-2"
        />
      </div>
    </div>
  );
};

export default ShopToolbar;
