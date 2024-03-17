import { createContext,useEffect, useState } from "react";
export const AuthContext = createContext();


const AuthProvider = ({children}) => {

  const [currentUser, setCurrentUser] = useState({
     user:null,
     token:""
  }); 


  useEffect(() => {
    const data = localStorage.getItem('currentUser')
    if(data){
      const parseData = JSON.parse(data);
    

    setCurrentUser({
      user:parseData.user,
      token:parseData.token
    })
  }
  },[])


  const logOut = () => {
    setCurrentUser({
      user:null,
      token:""
    });
    localStorage.removeItem('currentUser');
  }


  return (
    <AuthContext.Provider value={{currentUser,setCurrentUser,logOut}}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthProvider;
