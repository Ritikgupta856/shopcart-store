import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const UserMenu = ({ setshowMenu }) => {
  const { currentUser, logOut } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleLogout = () => {
    logOut();
    setshowMenu(false); 
  };

  return (
    <div className="absolute top-15 right-10 z-10 flex min-w-[200px] flex-col rounded-md border bg-white  shadow-lg shadow-blue-gray-500/10 cursor-pointer">
      {currentUser.user ? (
        <div>
          <div className="px-3 py-2 capatialize ">
            <p className="font-bold">Welcome User,</p>
            <span className="text-purple-500 font-semibold mt-2">
              {currentUser.user.fullname}
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
            className=" hover:bg-gray-100 px-3 py-2"
            onClick={() => {
              navigate("/login");
              setshowMenu(false);
            }}
          >
            Login
          </div>
          <hr />
          <div
            className=" hover:bg-gray-100 px-3 py-2 "
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
