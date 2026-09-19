import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Category = ({ categories }) => {
  const visibleCategories = (categories || [])
    .filter((c) => c.isActive !== false)
    .slice(0, 5);

  if (visibleCategories.length === 0) return null;

  return (
    <section
      id="category"
      className="px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-8 md:py-12"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Shop by Category</h2>
        <Link to="/categories" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
          View All Categories <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {visibleCategories.map((item) => (
          <Link
            key={item._id}
            to={`/shop/${item.slug}`}
            className="block overflow-hidden rounded-2xl border border-border transition-transform hover:-translate-y-1"
          >
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Category;
