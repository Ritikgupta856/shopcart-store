import { Link} from "react-router-dom";

const Product = ({ id, data }) => {


  return (
    <Link to={"/product/" + id}>
      <div className="h-fit md:h-[350px] flex items-center justify-center bg-gray-100">
        <img
          src={data?.image}
          alt=""
          className="hover:scale-110 transition duration-300 shrink-0 "
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="truncate mt-2 text-[16px] font-medium">{data?.name}</span>
        <span className="font-medium text-2xl"> &#8377;{data?.price}</span>
      </div>
    </Link>
  );
};

export default Product;
