import { Link } from "react-router-dom";

const Product = ({ id, data }) => {
  return (
    <Link to={`/product/${id}`} className="block w-full max-w-[300px]">
  
      <div className="relative w-full h-60 md:h-72 rounded-2xl overflow-hidden bg-gray-100 p-4 flex items-center justify-center">
        <img
          src={data?.image}
          alt={data?.name}
          className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
        />
      </div>


      <div className="mt-3 flex flex-col gap-1 px-2">
        <span className="truncate text-[16px] font-medium">{data?.name}</span>
        <span className="font-medium text-2xl">₹{data?.price}</span>
      </div>
    </Link>
  );
};

export default Product;
