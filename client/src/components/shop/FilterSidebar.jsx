import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Star, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FilterSection from "./FilterSection";

const PRICE_RANGES = [
  { label: "Under ₹500", min: "", max: "500" },
  { label: "₹500 – ₹2,000", min: "500", max: "2000" },
  { label: "₹2,000 – ₹10,000", min: "2000", max: "10000" },
  { label: "₹10,000 – ₹25,000", min: "10000", max: "25000" },
  { label: "Over ₹25,000", min: "25000", max: "" },
];

const RATING_OPTIONS = [4, 3, 2];

const FilterSidebar = ({
  categories,
  activeCategorySlug,
  brands,
  selectedBrand,
  onBrandChange,
  minPrice,
  maxPrice,
  onPriceChange,
  minRating,
  onMinRatingChange,
  showRatingFilter,
  inStock,
  onInStockChange,
  activeFilterCount,
  onClearAll,
  buildCategoryLink,
}) => {
  const [brandQuery, setBrandQuery] = useState("");
  const [draftMin, setDraftMin] = useState(minPrice);
  const [draftMax, setDraftMax] = useState(maxPrice);

  // Keep the inputs in step when the range is changed from outside (chips, clear all).
  useEffect(() => {
    setDraftMin(minPrice);
    setDraftMax(maxPrice);
  }, [minPrice, maxPrice]);

  const visibleBrands = brandQuery
    ? brands.filter((b) => b.toLowerCase().includes(brandQuery.toLowerCase()))
    : brands;

  const applyDraftPrice = (e) => {
    e.preventDefault();
    onPriceChange(draftMin, draftMax);
  };

  const isActiveRange = (range) => minPrice === range.min && maxPrice === range.max;

  const selectRange = (range) =>
    isActiveRange(range) ? onPriceChange("", "") : onPriceChange(range.min, range.max);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">Filters</span>
          {activeFilterCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 rounded-md text-xs font-medium text-text-secondary transition-colors hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <X size={12} />
            Clear all
          </button>
        )}
      </div>

      <FilterSection title="Category">
        <div className="flex flex-col">
          <Link
            to={buildCategoryLink(null)}
            className={`rounded-md px-2 py-1.5 text-sm transition-colors ${
              !activeCategorySlug
                ? "bg-accent font-medium text-accent-foreground"
                : "text-text-secondary hover:bg-secondary hover:text-foreground"
            }`}
          >
            All Products
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={buildCategoryLink(cat.slug)}
              className={`rounded-md px-2 py-1.5 text-sm transition-colors ${
                activeCategorySlug === cat.slug
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-text-secondary hover:bg-secondary hover:text-foreground"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            {PRICE_RANGES.map((range) => (
              <button
                key={range.label}
                type="button"
                onClick={() => selectRange(range)}
                className={`rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                  isActiveRange(range)
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-text-secondary hover:bg-secondary hover:text-foreground"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          <form onSubmit={applyDraftPrice} className="flex items-center gap-2">
            <Input
              type="number"
              inputMode="numeric"
              min="0"
              placeholder="Min"
              aria-label="Minimum price"
              value={draftMin}
              onChange={(e) => setDraftMin(e.target.value)}
              className="h-9 text-sm"
            />
            <span className="text-text-muted-2">–</span>
            <Input
              type="number"
              inputMode="numeric"
              min="0"
              placeholder="Max"
              aria-label="Maximum price"
              value={draftMax}
              onChange={(e) => setDraftMax(e.target.value)}
              className="h-9 text-sm"
            />
            <Button type="submit" variant="outline" size="sm" className="h-9 shrink-0">
              Go
            </Button>
          </form>
        </div>
      </FilterSection>

      {brands.length > 0 && (
        <FilterSection title="Brand">
          <div className="flex flex-col gap-2">
            {brands.length > 8 && (
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted-2" size={14} />
                <Input
                  placeholder="Search brands"
                  value={brandQuery}
                  onChange={(e) => setBrandQuery(e.target.value)}
                  className="h-9 pl-8 text-sm"
                />
              </div>
            )}
            <div className="scrollbar-slim flex max-h-52 flex-col gap-0.5 overflow-y-auto pr-1">
              {visibleBrands.length === 0 ? (
                <p className="px-2 py-1.5 text-xs text-text-muted-2">No brands match “{brandQuery}”.</p>
              ) : (
                visibleBrands.map((brand) => (
                  <label
                    key={brand}
                    className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-text-secondary transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrand === brand}
                      onChange={() => onBrandChange(selectedBrand === brand ? "" : brand)}
                      className="size-4 shrink-0 accent-primary"
                    />
                    <span className="truncate">{brand}</span>
                  </label>
                ))
              )}
            </div>
          </div>
        </FilterSection>
      )}

      {showRatingFilter && (
        <FilterSection title="Customer Rating">
          <div className="flex flex-col gap-0.5">
            {RATING_OPTIONS.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => onMinRatingChange(Number(minRating) === value ? "" : String(value))}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                  Number(minRating) === value
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-text-secondary hover:bg-secondary hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={13}
                      className={star <= value ? "fill-warning text-warning" : "text-border"}
                    />
                  ))}
                </span>
                <span>&amp; up</span>
              </button>
            ))}
          </div>
        </FilterSection>
      )}

      <FilterSection title="Availability">
        <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-text-secondary transition-colors hover:bg-secondary hover:text-foreground">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="size-4 shrink-0 accent-primary"
          />
          In stock only
        </label>
      </FilterSection>
    </div>
  );
};

export default FilterSidebar;
