import React, { useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Logout = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  useEffect(() => {
    sessionStorage.removeItem('token');
    setCurrentUser(null);
  }, []);
  return <Navigate to="/" />;
};

export default Logout;
