import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get('/api/v1/users/current', { headers });
      setCurrentUser(res.data);
    }
  }, []);

  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </UserContext.Provider>
  );
};
