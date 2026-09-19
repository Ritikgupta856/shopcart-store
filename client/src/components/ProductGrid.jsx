import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Product from "./Product";


const ProductGrid = ({ products, innerPage, headingText, compact, viewAllLink }) => {
  return (
    <div className={compact ? "" : "px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-4 md:py-8"}>
      {!innerPage && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">{headingText}</h2>
          {viewAllLink && (
            <Link to={viewAllLink} className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 my-6 mb-16">
        {products.map((item) => (
          <Product key={item._id} id={item._id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
