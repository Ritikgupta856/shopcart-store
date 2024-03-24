import { useNavigate } from "react-router-dom";
const Category = ({ categories }) => {
  const navigate = useNavigate();

  return (
    <section id="category" className="px-4 py-4 md:px-8 mt-10 ">
    
      <div className="grid grid-cols-2  lg:grid-cols-4 gap-5 my-10 cursor-pointer">
        {categories.map((item) => (
          <div
            key={item._id}
            className="bg-black"
            onClick={() => navigate(`/category/${item.name.toLowerCase()}`)}
          >
            <img
              src={item.image}
              alt=""
              className="transition duration-300 ease hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
