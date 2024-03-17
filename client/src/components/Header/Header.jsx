import { NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { CgShoppingCart } from "react-icons/cg";

import Search from "../Search/Search";

import Cart from "../Cart/Cart";
import { useContext, useState } from "react";
import { AppContext } from "@/Context/AppContext";
import { TbSearch } from "react-icons/tb";

import { FaRegUser } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import UserMenu from "../UserMenu/UserMenu";
import { AuthContext } from "../../Context/AuthContext";


const Header = () => {
  const [showCart, setshowCart] = useState(false);
  const [showSearch, setshowSearch] = useState(false);
  const [showMenu, setshowMenu] = useState(false);
  const { cartCount } = useContext(AppContext);
  const { currentUser} = useContext(AuthContext)

  const navigate = useNavigate();

  return (
    <header className="sticky z-100 top-0 w-full py-4 px-6 bg-white border-b-[1px] border-neutral-500/0.5">
      <div className="flex justify-between cursor-pointer">
        <div className="flex items-center gap-2" onClick={() => navigate("/")}>
          <img src={logo} width={40} alt="" />
          <div className="text-xl font-bold text-purple-800">ShopCart</div>
        </div>

        <div className="hidden sm:flex">
          <ul className="flex gap-10 items-center cursor-pointer font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-red-500" : "text-black"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/AboutUs"
                className={({ isActive }) =>
                  isActive ? "text-red-500" : "text-black"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Category"
                className={({ isActive }) =>
                  isActive ? "text-red-500" : "text-black"
                }
              >
                Category
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-8 cursor-pointer">
          <TbSearch size={20} onClick={() => setshowSearch(true)} />

          <span className="relative flex" onClick={() => setshowCart(true)}>
            <CgShoppingCart size={20} />
            {!!cartCount && (
              <span className=" absolute bg-red-500 -top-3 -right-4 rounded-full  flex items-center justify-center w-6 h-6 text-center text-white">
                {cartCount}
              </span>
            )}
          </span>
          <div className="relative ">
            {currentUser.user ? (
              <span
                onClick={() => setshowMenu(!showMenu)}
                className="relative text-white bg-black h-8 w-8 rounded-full flex items-center justify-center font-semibold"
              >
              {currentUser.user.firstname[0]}
              </span>
            ) : (
              <div
                className="flex items-center gap-1"
                onClick={() => setshowMenu(!showMenu)}
              >
                <FaRegUser size={20} />

                <MdKeyboardArrowDown />
              </div>
            )}
          </div>
        </div>
      </div>

      {showCart && <Cart setshowCart={setshowCart} />}
      {showSearch && <Search setshowSearch={setshowSearch} />}
      {showMenu && <UserMenu setshowMenu={setshowMenu} />}
    </header>
  );
};

export default Header;
