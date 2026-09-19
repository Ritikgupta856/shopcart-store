import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const cardBackgrounds = [
  "bg-[hsl(146,30%,93%)]",
  "bg-[hsl(20,45%,92%)]",
  "bg-[hsl(40,46%,93%)]",
  "bg-[hsl(154,25%,92%)]",
  "bg-[hsl(340,35%,94%)]",
];

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
        {visibleCategories.map((item, index) => (
          <Link
            key={item._id}
            to={`/shop/${item.slug}`}
            className={`group relative overflow-hidden rounded-2xl border border-border p-4 flex flex-col justify-between min-h-[180px] transition-transform hover:-translate-y-1 ${cardBackgrounds[index % cardBackgrounds.length]}`}
          >
            <div>
              <span className="font-semibold text-foreground block">{item.name}</span>
              {item.shortDescription && (
                <span className="text-xs text-text-secondary block mt-1">{item.shortDescription}</span>
              )}
            </div>
            <img
              src={item.image}
              alt={item.name}
              className="absolute right-2 bottom-10 w-20 h-20 object-contain opacity-90 group-hover:scale-110 transition-transform"
            />
            <span className="flex items-center justify-center size-8 rounded-full bg-primary text-white self-start mt-auto">
              <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Category;
