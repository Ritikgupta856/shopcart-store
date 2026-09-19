import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Product from "./Product";

const ProductGrid = ({ products, innerPage, headingText, compact, viewAllLink }) => {
  return (
    <section className={compact ? "" : "px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-8 md:py-12"}>
      {!innerPage && (
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {headingText}
          </h2>
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline"
            >
              View All <ArrowRight size={14} />
            </Link>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 xl:grid-cols-4">
        {products.map((item) => (
          <Product key={item._id} data={item} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
