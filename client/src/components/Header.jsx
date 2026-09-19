import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { TbSearch } from "react-icons/tb";
import { Menu, X, ChevronDown } from "lucide-react";
import Search from "./Search";
import UserMenu from "./UserMenu";
import useCartStore from "../store/useCartStore";
import useWishlistStore from "../store/useWishlistStore";
import useAuthStore from "../store/useAuthStore";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Categories", path: "/categories" },
];

const iconButtonClass =
  "relative flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const CountBadge = ({ count }) => (
  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold leading-none text-white">
    {count > 99 ? "99+" : count}
  </span>
);

const Header = () => {
  const [showSearch, setshowSearch] = useState(false);
  const [showMenu, setshowMenu] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { cartCount } = useCartStore();
  const { wishlistItems } = useWishlistStore();
  const { user } = useAuthStore();

  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);

  const isLinkActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  useEffect(() => {
    setMobileNavOpen(false);
    setshowMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!showMenu) return;
    const onPointerDown = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setshowMenu(false);
    };
    const onKeyDown = (e) => e.key === "Escape" && setshowMenu(false);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [showMenu]);

  return (
    <header className="sticky top-0 z-20 w-full border-b border-border bg-card px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40">
      <div className="flex h-16 items-center gap-3 sm:gap-4 lg:gap-6">
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open menu"
          className={`${iconButtonClass} -ml-1.5 lg:hidden`}
        >
          <Menu size={20} />
        </button>

        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-accent">
            <img src="/logo.svg" width={20} alt="" />
          </span>
          <span className="hidden text-lg font-bold tracking-tight text-foreground sm:block">
            ShopCart
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setshowSearch(true)}
          className="hidden h-10 min-w-0 flex-1 items-center gap-2.5 rounded-lg border border-input bg-secondary px-3.5 text-sm text-text-muted-2 transition-colors hover:border-primary/40 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:flex"
        >
          <TbSearch size={17} className="shrink-0" />
          <span className="truncate">Search for products, brands and more...</span>
        </button>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex h-9 items-center rounded-md px-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      active
                        ? "font-semibold text-primary"
                        : "font-medium text-text-secondary hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => setshowSearch(true)}
            aria-label="Search"
            className={`${iconButtonClass} md:hidden`}
          >
            <TbSearch size={19} />
          </button>

          <Link
            to="/wishlist"
            aria-label={`Wishlist${wishlistItems.length ? ` (${wishlistItems.length} items)` : ""}`}
            className={iconButtonClass}
          >
            <FaRegHeart size={18} />
            {!!wishlistItems.length && <CountBadge count={wishlistItems.length} />}
          </Link>

          <Link
            to="/cart"
            aria-label={`Cart${cartCount ? ` (${cartCount} items)` : ""}`}
            className={iconButtonClass}
          >
            <CgShoppingCart size={20} />
            {!!cartCount && <CountBadge count={cartCount} />}
          </Link>

          <div className="relative ml-1" ref={userMenuRef}>
            <button
              type="button"
              onClick={() => setshowMenu((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={showMenu}
              aria-label="Account menu"
              className="flex items-center gap-1 rounded-full transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {user ? (
                <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {user.fullname[0].toUpperCase()}
                </span>
              ) : (
                <span className="flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-secondary">
                  <FaRegUser size={17} />
                </span>
              )}
              <ChevronDown
                size={14}
                className={`hidden text-text-muted-2 transition-transform sm:block ${
                  showMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {showMenu && <UserMenu setshowMenu={setshowMenu} />}
          </div>
        </div>
      </div>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileNavOpen(false)} />
          <div className="relative flex h-full w-full max-w-xs flex-col bg-card">
            <div className="flex h-16 items-center justify-between border-b border-border px-5">
              <span className="text-base font-semibold text-foreground">Menu</span>
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close menu"
                className={iconButtonClass}
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-col p-3">
              {navLinks.map((link) => {
                const active = isLinkActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-accent text-accent-foreground"
                        : "text-text-secondary hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto border-t border-border p-3">
              {user ? (
                <Link
                  to="/my-orders"
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-secondary hover:text-foreground"
                >
                  My Orders
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setMobileNavOpen(false);
                    navigate("/login");
                  }}
                  className="w-full rounded-md bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showSearch && <Search setshowSearch={setshowSearch} />}
    </header>
  );
};

export default Header;
