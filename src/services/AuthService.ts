
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export interface AuthResponse<T> {
  data: T | null;
  error: Error | null;
}

export class AuthService {
  /**
   * Get the current logged in user
   */
  static async getCurrentUser(): Promise<AuthResponse<User>> {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { data: data.user, error: null };
    } catch (error) {
      console.error('Error fetching current user:', error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Sign up a new user
   */
  static async signUp(email: string, password: string): Promise<AuthResponse<any>> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error signing up:', error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Sign in a user with email and password
   */
  static async signIn(email: string, password: string): Promise<AuthResponse<any>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error signing in:', error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Sign in with OAuth provider
   */
  static async signInWithOAuth(provider: 'google' | 'github'): Promise<AuthResponse<any>> {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Sign out the current user
   */
  static async signOut(): Promise<AuthResponse<null>> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { data: null, error: null };
    } catch (error) {
      console.error('Error signing out:', error);
      return { data: null, error: error as Error };
    }
  }
}
