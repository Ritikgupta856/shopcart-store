import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Breadcrumb from "@/components/shop/Breadcrumb";
import ShopToolbar from "@/components/shop/ShopToolbar";
import FilterSidebar from "@/components/shop/FilterSidebar";
import MobileFilterSheet from "@/components/shop/MobileFilterSheet";
import Pagination from "@/components/shop/Pagination";
import ProductSkeleton from "@/components/shop/ProductSkeleton";
import ShopEmptyState from "@/components/shop/ShopEmptyState";
import ShopErrorState from "@/components/shop/ShopErrorState";
import Product from "@/components/Product";
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

  const brands = useMemo(() => {
    return [...new Set(allProducts.map((p) => p.brand).filter(Boolean))].sort();
  }, [allProducts]);

  const apiParams = useMemo(() => {
    const params = new URLSearchParams();
    if (slug) params.set("category", slug);
    if (collection) params.set("collection", collection);
    if (searchParams.get("search")) params.set("search", searchParams.get("search"));
    if (searchParams.get("brand")) params.set("brand", searchParams.get("brand"));
    if (searchParams.get("minPrice")) params.set("minPrice", searchParams.get("minPrice"));
    if (searchParams.get("maxPrice")) params.set("maxPrice", searchParams.get("maxPrice"));
    if (searchParams.get("sort")) params.set("sort", searchParams.get("sort"));
    if (searchParams.get("inStock")) params.set("inStock", searchParams.get("inStock"));
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
        updateParam("search", searchInput || null, true);
      }
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const updateParam = (key, value, resetPage) => {
    const next = new URLSearchParams(searchParams);
    if (value === null || value === "" || value === false) {
      next.delete(key);
    } else {
      next.set(key, value);
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

  const filterProps = {
    categories,
    activeCategorySlug: slug || null,
    brands,
    selectedBrand: searchParams.get("brand") || "",
    onBrandChange: (val) => updateParam("brand", val || null, true),
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    onMinPriceChange: (val) => updateParam("minPrice", val || null, true),
    onMaxPriceChange: (val) => updateParam("maxPrice", val || null, true),
    inStock: searchParams.get("inStock") === "true",
    onInStockChange: (val) => updateParam("inStock", val ? "true" : null, true),
    onClearAll: handleClearAll,
    buildCategoryLink,
  };

  const pageTitle = collection === "trending"
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

  return (
    <main className="mt-10 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-6">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">{pageTitle}</h1>
        <p className="text-sm text-text-secondary mt-1">{pageDescription}</p>
      </div>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-[260px] shrink-0">
          <FilterSidebar {...filterProps} />
        </aside>

        <div className="flex-1 min-w-0">
          <ShopToolbar
            total={total}
            search={searchInput}
            onSearchChange={setSearchInput}
            sort={searchParams.get("sort") || ""}
            onSortChange={(val) => updateParam("sort", val || null, true)}
            onOpenMobileFilters={() => setMobileFiltersOpen(true)}
          />

          {loading ? (
            <ProductSkeleton count={PAGE_SIZE} />
          ) : error ? (
            <ShopErrorState onRetry={() => setSearchParams(new URLSearchParams(searchParams))} />
          ) : products.length === 0 ? (
            <ShopEmptyState onClearFilters={handleClearAll} />
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Product key={product._id} data={product} />
                ))}
              </div>
              <p className="text-center text-xs text-text-muted-2 mt-6">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total} products
              </p>
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={(p) => updateParam("page", String(p), false)}
              />
            </>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <MobileFilterSheet onClose={() => setMobileFiltersOpen(false)} {...filterProps} />
      )}
    </main>
  );
};

export default Shop;
