import authService from '../services/authService';
import { useMutation, useQueryClient } from 'react-query';

export default function useSignUpUser() {
  const queryClient = useQueryClient();

  return useMutation((form) => authService.signup(form), {
    onSuccess: (user) => {
      queryClient.setQueryData('CURRENT_USER', user.user);
    },
  });
}
