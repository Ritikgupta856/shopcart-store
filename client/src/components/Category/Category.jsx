import { useNavigate } from "react-router-dom";
const Category = ({ categories }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 px-4 py-2 my-6 md:my-12 justify-center z-0">
    
      {categories.map((item) => (
        <div key={item._id} className="cursor-pointer" onClick={() => navigate(`/category/${item.name}`) }>
          <img src={item.image} alt="" className="transition duration-300 ease hover:scale-105 " />
        </div>
      ))}
    </div>
  );
};

export default Category;
