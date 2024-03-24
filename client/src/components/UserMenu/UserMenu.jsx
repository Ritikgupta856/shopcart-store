import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";



const UserMenu = ({setshowMenu}) => {
  const { currentUser,logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="absolute top-15 right-10 z-10 flex min-w-[180px] flex-col rounded-md border bg-white  shadow-lg shadow-blue-gray-500/10 cursor-pointer">
      {currentUser.user  ? (
        <div>
          <p className="capatialize hover:bg-gray-100 px-3 py-2">{currentUser.user.fullname}</p>
          <hr/>
          <p className="px-3 py-2 hover:bg-gray-100" onClick={logOut}>Logout</p>
        </div>
      ) : (
        <div >
          <div className=" hover:bg-gray-100 px-3 py-2" onClick={()=> {navigate("/login");setshowMenu(false)}}>Login</div>
          <hr/>
          <div className=" hover:bg-gray-100 px-3 py-2 " onClick={()=> {navigate("/register");setshowMenu(false)}}>Register</div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
