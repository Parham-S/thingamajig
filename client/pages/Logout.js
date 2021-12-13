import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import authService from '../services/authService';

const Logout = () => {
  const { setCurrentUser } = useAuth();
  useEffect(() => {
    authService.logout();
    setCurrentUser(null);
  }, []);
  return <Navigate to="/" />;
};

export default Logout;
