import { Link } from "react-router-dom";
import useCategories from "@/hooks/useCategories";
import { Loader } from "lucide-react";

const CategoriesPage = () => {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] py-8">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="mt-10 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-4 md:py-8">
      <h1 className="text-2xl font-medium uppercase text-foreground">All Categories</h1>
      <div className="w-20 h-2 border-b-4 border-primary mt-1"></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-10">
        {categories
          .filter((c) => c.isActive !== false)
          .map((category) => (
            <Link
              key={category._id}
              to={`/shop/${category.slug}`}
              className="rounded-xl overflow-hidden block group"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover transition duration-300 ease-in-out group-hover:scale-110"
              />
            </Link>
          ))}
      </div>
    </main>
  );
};

export default CategoriesPage;
