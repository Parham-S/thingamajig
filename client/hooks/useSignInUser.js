import authService from '../services/authService';
import { useMutation, useQueryClient } from 'react-query';

export default function useSignInUser() {
  const queryClient = useQueryClient();

  return useMutation((form) => authService.login(form), {
    onSuccess: (user) => {
      queryClient.setQueryData('CURRENT_USER', user.user);
    },
  });
}
