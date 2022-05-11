import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogIn : (email, password) => {}
});

export default AuthContext;

export const AuthContextProvider= (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  }
  const loginHandler = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', '1');
  }

  return (<AuthContext.Provider 
    value={{
    isLoggedIn: isLoggedIn, 
    onLogout: logoutHandler, 
    onLogIn: loginHandler
    }}>
      {props.children}</AuthContext.Provider>);
}