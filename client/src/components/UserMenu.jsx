import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const UserMenu = ({ setshowMenu }) => {
  const { user, logOut } = useAuthStore();
  const navigate = useNavigate();
  console.log(user)

  const handleLogout = () => {
    logOut();
    setshowMenu(false);
    navigate("/"); // navigation after logout
  };

  return (
    <div className="absolute top-15 right-10 z-10 flex min-w-[200px] flex-col rounded-md border bg-white shadow-lg shadow-blue-gray-500/10 cursor-pointer">
      {user ? (
        <div>
          <div className="px-3 py-2 capitalize">
            <p className="font-bold">Welcome User,</p>
            <span className="text-purple-500 font-semibold mt-2">
              {user.fullname}
            </span>
          </div>
          <hr />
          <p className="px-3 py-2 hover:bg-gray-100" onClick={handleLogout}>
            Logout
          </p>
        </div>
      ) : (
        <div>
          <div
            className="hover:bg-gray-100 px-3 py-2"
            onClick={() => {
              navigate("/login");
              setshowMenu(false);
            }}
          >
            Login
          </div>
          <hr />
          <div
            className="hover:bg-gray-100 px-3 py-2"
            onClick={() => {
              navigate("/register");
              setshowMenu(false);
            }}
          >
            Register
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
