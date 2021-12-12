import React, { useEffect, useContext, useMemo } from 'react';
import { useLocation } from 'react-router';
import { UserContext } from '../contexts/UserContext';
import { Navigate } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const TokenConfirm = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const query = useQuery();
  useEffect(() => {
    const token = query.get('token');
    sessionStorage.setItem('token', token);
    setCurrentUser(null);
  }, []);
  return <Navigate to="/" />;
};

export default TokenConfirm;
