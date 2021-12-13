import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router';
import { Navigate } from 'react-router-dom';

import authService from '../services/authService';
import { useAuth } from '../hooks/useAuth';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const TokenConfirm = () => {
  const { setCurrentUser } = useAuth();
  const query = useQuery();
  useEffect(() => {
    const token = query.get('token');
    authService.setToken(token);
    setCurrentUser(null);
  }, []);
  return <Navigate to="/" />;
};

export default TokenConfirm;
