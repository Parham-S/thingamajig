import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const RequireAuth = ({ children, redirectTo }) => {
  let isAuthenticated = authService.getToken();
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;
