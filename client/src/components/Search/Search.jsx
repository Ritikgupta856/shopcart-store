import { useContext, useState } from "react";

import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

const Search = ({ setshowSearch }) => {
  const { products } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="fixed inset-0 h-full w-full z-999 bg-white flex flex-col">
      <div className="flex justify-center items-center py-5 relative w-full border-b ">
        <input
          type="text"
          autoFocus
          placeholder="Search for products"
          className="w-full px-4 py-4 md:py-8 text-xl md:text-5xl outline-none bg-transparent  placeholder:text-2xl sm:placeholder:text-5xl text-center uppercase max-w-[1200px] h-10 sm:h-10"
          value={searchQuery}
          onChange={handleSearch}
        />
        <MdClose
          className="absolute right-4 text-xl cursor-pointer"
          onClick={() => setshowSearch(false)}
        />
      </div>
      <div className="max-w-screen-lg mx-auto flex-grow overflow-auto">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => {
              navigate("/product/" + product._id);
              setshowSearch(false);
            }}
            className="flex items-center cursor-pointer truncate p-4 border-b hover:bg-gray-50 gap-4"
          >
            <div className="w-16 h-16 bg-gray-200 shrink-0">
              <img
                className="w-full h-full object-cover"
                src={product.image}
              ></img>
            </div>

            <div className="flex flex-col truncate">
              <p className="font-medium truncate">{product.name}</p>
              <p className="text-sm text-gray-500 truncate">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>

  );
};

export default Search;
