import { useNavigate } from "react-router-dom";

const Category = ({ categories }) => {
  const navigate = useNavigate();

  console.log(categories)

  return (
    <section
      id="category"
      className="px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-4 md:py-8 mt-10"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-10 cursor-pointer">
        {categories?.map((item) => (
          <div
            key={item._id}
            className="bg-black cursor-pointer overflow-hidden"
            onClick={() => navigate(`/category/${item.slug}`)}
          >
            <img
              src={item.image}
              alt=""
              className="transition duration-300 ease-in-out hover:scale-[1.2]"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
