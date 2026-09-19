import { useNavigate, Link } from "react-router-dom";
import { FaRegHeart, FaBoxOpen, FaSignOutAlt } from "react-icons/fa";
import useAuthStore from "../store/useAuthStore";

const UserMenu = ({ setshowMenu }) => {
  const { user, logOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    setshowMenu(false);
    navigate("/");
  };

  const close = () => setshowMenu(false);

  return (
    <div
      role="menu"
      className="absolute right-0 top-full z-30 mt-2 flex min-w-[220px] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card"
    >
      {user ? (
        <div>
          <div className="px-4 py-3 border-b border-border">
            <p className="text-xs text-text-muted-2">Signed in as</p>
            <span className="font-semibold text-foreground">{user.fullname}</span>
          </div>
          <Link
            to="/my-orders"
            onClick={close}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
          >
            <FaBoxOpen size={14} className="text-text-muted-2" />
            My Orders
          </Link>
          <Link
            to="/wishlist"
            onClick={close}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
          >
            <FaRegHeart size={14} className="text-text-muted-2" />
            Wishlist
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-danger-bg transition-colors border-t border-border w-full text-left"
          >
            <FaSignOutAlt size={14} />
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link
            to="/login"
            onClick={close}
            className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            onClick={close}
            className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors border-t border-border"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
