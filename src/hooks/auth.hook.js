import { useState } from "react";

export const useAuth = () => {
  const [token, setToken] = useState(tokenFromLocalStorage());

  function tokenFromLocalStorage() {
    const found = localStorage.getItem("token");
    return found ? found : null;
  }

  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return { login, logout, token };
};
