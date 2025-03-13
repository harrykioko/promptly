
import { useUserContext } from '@/contexts/UserContext';

export function useUser() {
  const userContext = useUserContext();
  
  return {
    user: userContext.user,
    session: userContext.session,
    isLoading: userContext.isLoading,
    isAuthenticated: userContext.isAuthenticated,
    signUp: userContext.signUp,
    signIn: userContext.signIn,
    signInWithGoogle: userContext.signInWithGoogle,
    signInWithGithub: userContext.signInWithGithub,
    signOut: userContext.signOut
  };
}
