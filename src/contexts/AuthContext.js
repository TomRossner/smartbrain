import React, { useState, createContext } from 'react';
import { login, register } from '../http/requests';

export const AuthContext = createContext({
    currentUser: null,
    setCurrentUser: () => {},
    loadUser: () => {}
});

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    const loadUser = (data) => {
      return setCurrentUser(data);
    }

    const loginUser = async (credentials) => {
      const user = await login(credentials);
      return loadUser(user);
    }

    const registerUser = async (data) => {
      return await register(data);
    }
    
    const value = {currentUser, setCurrentUser, loginUser, loadUser, registerUser};
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}