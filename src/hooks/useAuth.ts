import { useAuthContext } from '@/contexts/authContext';

export const useAuth = () => {
  const { user, login, logout } = useAuthContext();
  return { user, login, logout };
};
