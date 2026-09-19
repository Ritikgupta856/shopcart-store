import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Breadcrumb from "@/components/shop/Breadcrumb";
import ShopToolbar from "@/components/shop/ShopToolbar";
import ActiveFilterChips from "@/components/shop/ActiveFilterChips";
import FilterSidebar from "@/components/shop/FilterSidebar";
import MobileFilterSheet from "@/components/shop/MobileFilterSheet";
import Pagination from "@/components/shop/Pagination";
import ProductSkeleton from "@/components/shop/ProductSkeleton";
import ShopEmptyState from "@/components/shop/ShopEmptyState";
import ShopErrorState from "@/components/shop/ShopErrorState";
import Product from "@/components/Product";
import { PageContainer, PageHeader } from "@/components/ui/page-container";
import useCategories from "@/hooks/useCategories";
import useProducts from "@/hooks/useProducts";
import useShopProducts from "@/hooks/useShopProducts";

const PAGE_SIZE = 12;

const Shop = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");

  const { categories } = useCategories();
  const { products: allProducts } = useProducts();

  const activeCategory = categories.find((c) => c.slug === slug);
  const collection = searchParams.get("collection") || "";

  const brands = useMemo(
    () => [...new Set(allProducts.map((p) => p.brand).filter(Boolean))].sort(),
    [allProducts]
  );
  const catalogHasRatings = useMemo(
    () => allProducts.some((p) => p.reviewCount > 0),
    [allProducts]
  );

  const apiParams = useMemo(() => {
    const params = new URLSearchParams();
    if (slug) params.set("category", slug);
    if (collection) params.set("collection", collection);
    for (const key of ["search", "brand", "minPrice", "maxPrice", "sort", "inStock", "minRating"]) {
      const value = searchParams.get(key);
      if (value) params.set(key, value);
    }
    params.set("page", searchParams.get("page") || "1");
    params.set("limit", String(PAGE_SIZE));
    return params;
  }, [slug, collection, searchParams]);

  const { products, total, page, totalPages, loading, error } = useShopProducts(apiParams);

  useEffect(() => {
    setSearchInput(searchParams.get("search") || "");
  }, [searchParams.get("search")]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = searchParams.get("search") || "";
      if (searchInput !== current) {
        updateParams({ search: searchInput || null }, true);
      }
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const updateParams = (updates, resetPage) => {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "" || value === false) next.delete(key);
      else next.set(key, value);
    }
    if (resetPage) next.delete("page");
    setSearchParams(next);
  };

  const buildCategoryLink = (categorySlug) => {
    const next = new URLSearchParams(searchParams);
    next.delete("page");
    const qs = next.toString();
    const base = categorySlug ? `/shop/${categorySlug}` : "/shop";
    return qs ? `${base}?${qs}` : base;
  };

  const handleClearAll = () => {
    setSearchInput("");
    setSearchParams({});
  };

  const selectedBrand = searchParams.get("brand") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const minRating = searchParams.get("minRating") || "";
  const inStock = searchParams.get("inStock") === "true";
  const activeSearch = searchParams.get("search") || "";

  const chips = useMemo(() => {
    const list = [];
    if (activeSearch) {
      list.push({
        key: "search",
        label: `“${activeSearch}”`,
        onRemove: () => {
          setSearchInput("");
          updateParams({ search: null }, true);
        },
      });
    }
    if (selectedBrand) {
      list.push({
        key: "brand",
        label: selectedBrand,
        onRemove: () => updateParams({ brand: null }, true),
      });
    }
    if (minPrice || maxPrice) {
      const label = minPrice && maxPrice
        ? `₹${Number(minPrice).toLocaleString("en-IN")} – ₹${Number(maxPrice).toLocaleString("en-IN")}`
        : minPrice
        ? `Over ₹${Number(minPrice).toLocaleString("en-IN")}`
        : `Under ₹${Number(maxPrice).toLocaleString("en-IN")}`;
      list.push({
        key: "price",
        label,
        onRemove: () => updateParams({ minPrice: null, maxPrice: null }, true),
      });
    }
    if (minRating) {
      list.push({
        key: "rating",
        label: `${minRating}★ & up`,
        onRemove: () => updateParams({ minRating: null }, true),
      });
    }
    if (inStock) {
      list.push({
        key: "inStock",
        label: "In stock only",
        onRemove: () => updateParams({ inStock: null }, true),
      });
    }
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSearch, selectedBrand, minPrice, maxPrice, minRating, inStock, searchParams]);

  const filterProps = {
    categories,
    activeCategorySlug: slug || null,
    brands,
    selectedBrand,
    onBrandChange: (val) => updateParams({ brand: val || null }, true),
    minPrice,
    maxPrice,
    onPriceChange: (min, max) => updateParams({ minPrice: min || null, maxPrice: max || null }, true),
    minRating,
    onMinRatingChange: (val) => updateParams({ minRating: val || null }, true),
    showRatingFilter: catalogHasRatings,
    inStock,
    onInStockChange: (val) => updateParams({ inStock: val ? "true" : null }, true),
    activeFilterCount: chips.length,
    onClearAll: handleClearAll,
    buildCategoryLink,
  };

  const pageTitle =
    collection === "trending"
      ? "Trending Now"
      : collection === "new-arrivals"
      ? "New Arrivals"
      : activeCategory
      ? activeCategory.name
      : "Shop";

  const pageDescription = activeCategory
    ? activeCategory.shortDescription || `Explore the latest in ${activeCategory.name.toLowerCase()}.`
    : "Discover electronics, fashion, home essentials, sports gear and beauty products.";

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    ...(activeCategory
      ? [{ label: "Shop", path: "/shop" }, { label: activeCategory.name }]
      : [{ label: "Shop" }]),
  ];

  const rangeStart = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, total);

  return (
    <PageContainer>
      <Breadcrumb items={breadcrumbItems} />
      <PageHeader title={pageTitle} description={pageDescription} />

      <div className="flex items-start gap-8 xl:gap-10">
        <aside className="hidden w-[240px] shrink-0 lg:block">
          <div className="sticky top-24">
            <FilterSidebar {...filterProps} />
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <ShopToolbar
            search={searchInput}
            onSearchChange={setSearchInput}
            sort={searchParams.get("sort") || ""}
            onSortChange={(val) => updateParams({ sort: val || null }, true)}
            onOpenMobileFilters={() => setMobileFiltersOpen(true)}
            activeFilterCount={chips.length}
          />

          {chips.length > 0 && (
            <div className="mt-4">
              <ActiveFilterChips chips={chips} onClearAll={handleClearAll} />
            </div>
          )}

          {!loading && !error && total > 0 && (
            <p className="mt-4 text-sm text-text-secondary">
              Showing <span className="font-medium text-foreground">{rangeStart}–{rangeEnd}</span> of{" "}
              <span className="font-medium text-foreground">{total}</span> products
            </p>
          )}

          <div className="mt-5">
            {loading ? (
              <ProductSkeleton count={PAGE_SIZE} />
            ) : error ? (
              <ShopErrorState onRetry={() => setSearchParams(new URLSearchParams(searchParams))} />
            ) : products.length === 0 ? (
              <ShopEmptyState onClearFilters={handleClearAll} />
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 xl:grid-cols-4">
                  {products.map((product) => (
                    <Product key={product._id} data={product} />
                  ))}
                </div>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={(p) => updateParams({ page: String(p) }, false)}
                />
              </>
            )}
          </div>
        </section>
      </div>

      {mobileFiltersOpen && (
        <MobileFilterSheet
          onClose={() => setMobileFiltersOpen(false)}
          resultCount={total}
          {...filterProps}
        />
      )}
    </PageContainer>
  );
};

export default Shop;
