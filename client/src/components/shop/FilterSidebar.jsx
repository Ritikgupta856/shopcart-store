import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FilterSidebar = ({
  categories,
  activeCategorySlug,
  brands,
  selectedBrand,
  onBrandChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  inStock,
  onInStockChange,
  onClearAll,
  buildCategoryLink,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-foreground text-sm">Filters</span>
        <button onClick={onClearAll} className="text-xs text-primary hover:underline">
          Clear All
        </button>
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-text-muted-2">Category</span>
        <Link
          to={buildCategoryLink(null)}
          className={`text-sm py-1 ${!activeCategorySlug ? "text-primary font-medium" : "text-text-secondary hover:text-foreground"}`}
        >
          All Products
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to={buildCategoryLink(cat.slug)}
            className={`text-sm py-1 ${activeCategorySlug === cat.slug ? "text-primary font-medium" : "text-text-secondary hover:text-foreground"}`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-text-muted-2">Price Range</span>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="h-9 text-sm"
          />
          <span className="text-text-muted-2">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="h-9 text-sm"
          />
        </div>
      </div>

      {/* Brand */}
      {brands.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-text-muted-2">Brand</span>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedBrand === brand}
                  onChange={() => onBrandChange(selectedBrand === brand ? "" : brand)}
                  className="size-4 accent-primary"
                />
                {brand}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Availability */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-text-muted-2">Availability</span>
        <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="size-4 accent-primary"
          />
          In Stock Only
        </label>
      </div>
    </div>
  );
};

export default FilterSidebar;
