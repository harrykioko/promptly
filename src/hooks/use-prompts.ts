
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PromptService, Prompt, PromptInsert } from "@/services/PromptService";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface UsePromptsOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function usePrompts(options: UsePromptsOptions = {}) {
  const [userId, setUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Get the current user ID
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      }
    };

    getCurrentUser();
  }, []);

  // Query for fetching all prompts for the current user
  const {
    data: prompts,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['prompts', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await PromptService.getUserPrompts(userId);
      if (error) throw error;
      return data || [];
    },
    enabled: !!userId,
  });

  // Mutation for creating a prompt
  const createPromptMutation = useMutation({
    mutationFn: async (promptData: Omit<PromptInsert, "id" | "user_id" | "created_at" | "updated_at">) => {
      if (!userId) throw new Error("User not authenticated");
      
      const fullPromptData = {
        ...promptData,
        user_id: userId
      };
      
      const { data, error } = await PromptService.createPrompt(fullPromptData);
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['prompts', userId] });
      toast.success("Prompt created successfully");
      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (error: Error) => {
      toast.error(`Failed to create prompt: ${error.message}`);
      if (options.onError) options.onError(error);
    }
  });

  // Mutation for updating a prompt
  const updatePromptMutation = useMutation({
    mutationFn: async ({ 
      promptId, 
      updates,
      saveVersion = true 
    }: { 
      promptId: string; 
      updates: Partial<Omit<PromptInsert, "id" | "user_id" | "created_at" | "updated_at">>;
      saveVersion?: boolean;
    }) => {
      // If we're updating content and saveVersion is true, save the old version first
      if (saveVersion && updates.content) {
        // Get the current prompt to save its content as a version
        const { data: currentPrompt } = await PromptService.getUserPrompts(userId!);
        const prompt = currentPrompt?.find(p => p.id === promptId);
        
        if (prompt) {
          await PromptService.addVersionHistory(promptId, prompt.content);
        }
      }
      
      // Update the prompt
      const { data, error } = await PromptService.updatePrompt(promptId, updates);
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['prompts', userId] });
      toast.success("Prompt updated successfully");
      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (error: Error) => {
      toast.error(`Failed to update prompt: ${error.message}`);
      if (options.onError) options.onError(error);
    }
  });

  // Mutation for deleting a prompt
  const deletePromptMutation = useMutation({
    mutationFn: async (promptId: string) => {
      const { error } = await PromptService.deletePrompt(promptId);
      if (error) throw error;
      return promptId;
    },
    onSuccess: (promptId) => {
      queryClient.invalidateQueries({ queryKey: ['prompts', userId] });
      toast.success("Prompt deleted successfully");
      if (options.onSuccess) options.onSuccess(promptId);
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete prompt: ${error.message}`);
      if (options.onError) options.onError(error);
    }
  });

  // Query for fetching version history for a prompt
  const getVersionHistory = async (promptId: string) => {
    const { data, error } = await PromptService.getVersionHistory(promptId);
    if (error) throw error;
    return data || [];
  };

  return {
    prompts,
    isLoading,
    isError,
    error,
    refetch,
    createPrompt: createPromptMutation.mutate,
    updatePrompt: updatePromptMutation.mutate,
    deletePrompt: deletePromptMutation.mutate,
    getVersionHistory,
    // Mutation states
    isCreating: createPromptMutation.isPending,
    isUpdating: updatePromptMutation.isPending,
    isDeleting: deletePromptMutation.isPending,
  };
}
