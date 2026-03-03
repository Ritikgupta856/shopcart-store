import { Link } from "react-router-dom";

const Product = ({ data }) => {
  return (
    <Link
      to={`/product/${data.slug}`}
      className="block w-full max-w-[300px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[440px] xl:max-w-[480px] 2xl:max-w-full"
    >
      <div className="relative w-full h-72 2xl:h-[22rem] rounded-2xl overflow-hidden bg-gray-100 p-4 flex items-center justify-center">
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
