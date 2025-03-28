import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("token") ? true : false
  );

  const login = (token) => {
    console.log(token);
    localStorage.setItem("token", token);
    setUser(true);
  };
  const logout = () => {
    localStorage.removeItem("token", token);
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
