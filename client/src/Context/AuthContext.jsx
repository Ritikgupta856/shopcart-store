import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("currentUser");
    if (data) {
      const parseData = JSON.parse(data);

      setCurrentUser({
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);

  const logOut = () => {
    setCurrentUser({
      user: null,
      token: "",
    });
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
