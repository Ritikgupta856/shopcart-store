import { useNavigate } from "react-router-dom";

const Product = ({ id, data }) => {
  const navigate = useNavigate();

  return (
    <div className="w-[calc(50%-5px)] md:w-[calc(25%-15px)] mt-10 cursor-pointer " onClick={() => navigate("/product/" + id)}>
      <div className="w-full h-[200px] md:h-[350px] flex items-center justify-center  bg-gray-100">
        <img
          src={data.image}
          alt=""
          className="w-full hover:scale-110 transition duration-300 "
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="truncate mt-2 text-[16px] font-medium">{data?.name}</span>
        <span className="font-medium text-2xl"> &#8377;{data?.price}</span>
      </div>
    </div>
  );
};

export default Product;
