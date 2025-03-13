import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

export type Profile = Tables<'profiles'>;
export type ProfileInsert = TablesInsert<'profiles'>;

export interface ProfileServiceResponse<T> {
  data: T | null;
  error: Error | null;
}

export class ProfileService {
  /**
   * Get a user's profile
   */
  static async getProfile(userId: string): Promise<ProfileServiceResponse<Profile>> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error fetching profile:', error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Update a user's profile
   */
  static async updateProfile(
    userId: string,
    updates: Partial<Omit<ProfileInsert, 'id'>>
  ): Promise<ProfileServiceResponse<Profile>> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Create a profile if it doesn't exist
   */
  static async createProfileIfNotExists(
    userId: string,
    profileData: Partial<Omit<ProfileInsert, 'id'>> = {}
  ): Promise<ProfileServiceResponse<Profile>> {
    try {
      // First check if profile exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      // If profile exists, return it
      if (existingProfile) {
        return { data: existingProfile, error: null };
      }

      // Otherwise, create a new one
      const { data, error } = await supabase
        .from('profiles')
        .insert({ id: userId, ...profileData })
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error creating/fetching profile:', error);
      return { data: null, error: error as Error };
    }
  }
}
