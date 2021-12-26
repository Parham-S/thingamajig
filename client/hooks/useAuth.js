import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

/**
 * Custom hook which grabs everything shared in Context
 * which is currentUser and setCurrentUser
 * @returns {object}
 */
export const useAuth = () => useContext(UserContext);
