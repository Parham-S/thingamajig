import { useQuery } from 'react-query';
import authService from '../services/authService';

export default function useCurrentUser() {
  return useQuery('CURRENT_USER', authService.getCurrentUser);
}
