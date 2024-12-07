import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(false);

  const toggleAuthLogin = () => {
    setAuth(true);
  };

  const toggleAuthLogout = () => {
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{isAuth, toggleAuthLogin, toggleAuthLogout}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider};