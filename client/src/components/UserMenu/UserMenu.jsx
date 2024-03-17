import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";



const UserMenu = ({setshowMenu}) => {
  const { currentUser,logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="absolute top-15 right-10 z-10 flex min-w-[180px] flex-col rounded-md border bg-white p-4 shadow-lg shadow-blue-gray-500/10 cursor-pointer">
      {currentUser.user  ? (
        <div className="">
          <p className="capatialize mb-2">{currentUser.user.firstname}</p>
          <p onClick={logOut}>Logout</p>
        </div>
      ) : (
        <div className="">
          <div className=" hover:bg-gray-100 hover:rounded-md mb-2" onClick={()=> {navigate("/login");setshowMenu(false)}}>Login</div>
          <hr/>
          <div className=" hover:bg-gray-100" onClick={()=> {navigate("/register");setshowMenu(false)}}>Register</div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
