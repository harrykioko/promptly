
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileService, Profile } from '@/services/ProfileService';
import { useUser } from './use-user';
import { toast } from 'sonner';

export interface UseProfileOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useProfile(options: UseProfileOptions = {}) {
  const { user } = useUser();
  const userId = user?.id;
  const queryClient = useQueryClient();

  // Query for fetching user profile
  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await ProfileService.getProfile(userId);
      if (error) throw error;
      
      return data;
    },
    enabled: !!userId,
  });

  // Mutation for updating profile
  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: Partial<Omit<Profile, 'id'>>) => {
      if (!userId) throw new Error('User not authenticated');
      
      const { data, error } = await ProfileService.updateProfile(userId, profileData);
      if (error) throw error;
      
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
      toast.success('Profile updated successfully');
      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (error: Error) => {
      toast.error(`Failed to update profile: ${error.message}`);
      if (options.onError) options.onError(error);
    }
  });

  // Ensure profile exists for the current user
  useEffect(() => {
    const createProfileIfNeeded = async () => {
      if (!userId) return;
      
      try {
        await ProfileService.createProfileIfNotExists(userId);
      } catch (error) {
        console.error('Error creating profile:', error);
      }
    };

    createProfileIfNeeded();
  }, [userId]);

  return {
    profile,
    isLoading,
    isError,
    error,
    refetch,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending
  };
}
