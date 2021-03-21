import React from "react";

export const AuthContext = React.createContext({
  token: undefined,
  login: (token) => {},
  logout: () => {},
  isAuthenticated: false,
});
