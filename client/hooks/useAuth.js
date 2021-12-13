import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

/**
 * Custom hook which grabs everything shared in Context
 * @returns {object}
 */
export const useAuth = () => useContext(UserContext);
