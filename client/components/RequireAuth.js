import React from 'react';
import { Navigate } from 'react-router-dom';

const getAuth = () => sessionStorage.getItem('token');

const RequireAuth = ({ children, redirectTo }) => {
  let isAuthenticated = getAuth();
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;
