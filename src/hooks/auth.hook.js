import { useCallback, useEffect, useState } from "react";

export const useAuth = () => {
  const [token, setToken] = useState();

  const login = useCallback((token) => {
    setToken(token);
    localStorage.setItem("token", token);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
  }, []);

  useEffect(() => {
    const found = localStorage.getItem("token");
    if (found) {
      login(found);
    }
  }, [login]);

  return { login, logout, token };
};
