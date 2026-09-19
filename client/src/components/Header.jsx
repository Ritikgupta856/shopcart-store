import { useNavigate, Link, useLocation } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import Search from "./Search";
import { useState } from "react";
import useCartStore from "../store/useCartStore";
import useWishlistStore from "../store/useWishlistStore";
import { TbSearch } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import UserMenu from "./UserMenu";
import useAuthStore from "../store/useAuthStore";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Categories", path: "/categories" },
  { name: "Deals", path: "/deals" },
];

const Header = () => {
  const [showSearch, setshowSearch] = useState(false);
  const [showMenu, setshowMenu] = useState(false);
  const { cartCount } = useCartStore();
  const { wishlistItems } = useWishlistStore();
  const { user } = useAuthStore();

  const navigate = useNavigate();
  const location = useLocation();

  const isLinkActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <header className="sticky z-20 top-0 w-full py-3 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 bg-card border-b border-border shadow-soft">
      <div className="flex items-center gap-4 lg:gap-8">
        <div
          className="flex items-center gap-2 cursor-pointer shrink-0"
          onClick={() => navigate("/")}
        >
          <div className="flex items-center justify-center size-9 rounded-lg bg-accent">
            <img src={"/logo.svg"} width={20} alt="ShopCart Logo" />
          </div>
          <span className="hidden sm:block text-lg font-bold text-foreground">ShopCart</span>
        </div>

        <button
          type="button"
          onClick={() => setshowSearch(true)}
          className="hidden md:flex flex-1 max-w-xl items-center gap-2 rounded-lg border border-input bg-secondary px-4 py-2 text-sm text-text-muted-2 hover:border-primary/40 transition-colors"
        >
          <TbSearch size={18} />
          Search for products, brands and more...
        </button>

        <div className="hidden lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => {
                const active = isLinkActive(link.path);
                return (
                  <NavigationMenuItem key={link.path}>
                    <NavigationMenuLink asChild>
                      <Link
                        className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                          active ? "bg-accent text-accent-foreground" : "bg-background text-foreground"
                        }`}
                        to={link.path}
                      >
                        {link.name}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-5 md:gap-6 ml-auto shrink-0">
          <TbSearch
            size={20}
            onClick={() => setshowSearch(true)}
            className="cursor-pointer md:hidden text-foreground"
          />

          <Link to="/wishlist" className="relative flex cursor-pointer text-foreground">
            <FaRegHeart size={20} />
            {!!wishlistItems.length && (
              <span className="absolute bg-danger -top-3 -right-4 rounded-full flex items-center justify-center w-5 h-5 text-center text-white text-[11px]">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative flex cursor-pointer text-foreground">
            <CgShoppingCart size={20} />
            {!!cartCount && (
              <span className="absolute bg-danger -top-3 -right-4 rounded-full flex items-center justify-center w-5 h-5 text-center text-white text-[11px]">
                {cartCount}
              </span>
            )}
          </Link>
          <div className="relative">
            {user ? (
              <span
                onClick={() => setshowMenu(!showMenu)}
                className="relative text-white bg-primary h-8 w-8 rounded-full flex items-center justify-center font-semibold cursor-pointer"
              >
                {user.fullname[0]}
              </span>
            ) : (
              <div
                className="flex items-center gap-1 cursor-pointer text-foreground"
                onClick={() => setshowMenu(!showMenu)}
              >
                <FaRegUser size={20} />
                <MdKeyboardArrowDown />
              </div>
            )}
          </div>
        </div>
      </div>

      {showSearch && <Search setshowSearch={setshowSearch} />}
      {showMenu && <UserMenu setshowMenu={setshowMenu} />}
    </header>
  );
};

export default Header;
