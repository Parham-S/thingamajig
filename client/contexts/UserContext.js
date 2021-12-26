import React, { useState, useEffect, createContext } from 'react';
import authService from '../services/authService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(async () => {
    const user = await authService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
