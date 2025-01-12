import {useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { CgShoppingCart } from "react-icons/cg";

import Search from "../Search/Search";

import Cart from "../Cart/Cart";
import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { TbSearch } from "react-icons/tb";

import { FaRegUser } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import UserMenu from "../UserMenu/UserMenu";
import { AuthContext } from "../../Context/AuthContext";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

const Header = () => {
  const [showCart, setshowCart] = useState(false);
  const [showSearch, setshowSearch] = useState(false);
  const [showMenu, setshowMenu] = useState(false);
  const { cartCount } = useContext(AppContext);
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <header className="sticky z-20 top-0 w-full py-4 px-8 bg-white border-b-[1px] border-neutral-500/0.5 shadow-md">
      <div className="flex justify-between cursor-pointer">
        <div className="flex items-center gap-2" onClick={() => navigate("/")}>
          <img src={logo} width={30} alt="" />
          <span className="text-xl font-bold text-primary">ShopCart</span>
        </div>

        <div className="hidden sm:flex">
          <div className="flex gap-10 items-center cursor-pointer font-medium">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground " 
                      href="/"
                    >
                      Home
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="/aboutus"
                    >
                      About Us
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                      {[
                        "Headphones",
                        "Smart Watches",
                        "Speakers",
                        "Earbuds",
                        "Home Theatre",
                     
                      ].map((item) => (
                        <li key={item}>
                          <NavigationMenuLink asChild>
                            <a
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              href={`#${item.toLowerCase()}`}
                            >
                              <div className="text-sm font-medium leading-none">
                                {item}
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
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
                {currentUser.user.fullname[0]}
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
