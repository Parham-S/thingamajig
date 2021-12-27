import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import authService from '../services/authService';

const Logout = () => {
  const queryClient = useQueryClient();
  authService.logout();
  // should it be invalidateQueries instead? idk
  queryClient.resetQueries('CURRENT_USER', {
    refetchActive: false,
  });
  return <Navigate to='/' />;
};

export default Logout;
