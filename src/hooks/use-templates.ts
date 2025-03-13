
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TemplateService, Template, TemplatePrompt } from '@/services/TemplateService';
import { useUser } from './use-user';
import { toast } from 'sonner';

export interface UseTemplatesOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useTemplates(options: UseTemplatesOptions = {}) {
  const { user } = useUser();
  const userId = user?.id;
  const queryClient = useQueryClient();

  // Query for fetching all templates for the current user
  const {
    data: templates,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['templates', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await TemplateService.getUserTemplates(userId);
      if (error) throw error;
      
      return data || [];
    },
    enabled: !!userId,
  });

  // Mutation for creating a template
  const createTemplateMutation = useMutation({
    mutationFn: async (templateData: Omit<Template, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      if (!userId) throw new Error('User not authenticated');
      
      const fullTemplateData = {
        ...templateData,
        user_id: userId
      };
      
      const { data, error } = await TemplateService.createTemplate(fullTemplateData);
      if (error) throw error;
      
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['templates', userId] });
      toast.success('Template created successfully');
      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (error: Error) => {
      toast.error(`Failed to create template: ${error.message}`);
      if (options.onError) options.onError(error);
    }
  });

  // Mutation for updating a template
  const updateTemplateMutation = useMutation({
    mutationFn: async ({ 
      templateId, 
      updates 
    }: { 
      templateId: string; 
      updates: Partial<Omit<Template, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
    }) => {
      const { data, error } = await TemplateService.updateTemplate(templateId, updates);
      if (error) throw error;
      
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['templates', userId] });
      toast.success('Template updated successfully');
      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (error: Error) => {
      toast.error(`Failed to update template: ${error.message}`);
      if (options.onError) options.onError(error);
    }
  });

  // Mutation for deleting a template
  const deleteTemplateMutation = useMutation({
    mutationFn: async (templateId: string) => {
      const { error } = await TemplateService.deleteTemplate(templateId);
      if (error) throw error;
      
      return templateId;
    },
    onSuccess: (templateId) => {
      queryClient.invalidateQueries({ queryKey: ['templates', userId] });
      toast.success('Template deleted successfully');
      if (options.onSuccess) options.onSuccess(templateId);
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete template: ${error.message}`);
      if (options.onError) options.onError(error);
    }
  });

  // Function to get a single template with its prompts
  const getTemplateWithPrompts = async (templateId: string) => {
    try {
      // Get the template
      const { data: template, error: templateError } = await TemplateService.getTemplate(templateId);
      if (templateError) throw templateError;
      
      // Get the template prompts
      const { data: templatePrompts, error: promptsError } = await TemplateService.getTemplatePrompts(templateId);
      if (promptsError) throw promptsError;
      
      return {
        template,
        prompts: templatePrompts || []
      };
    } catch (error) {
      console.error('Error fetching template with prompts:', error);
      throw error;
    }
  };

  // Mutation for adding a prompt to a template
  const addPromptToTemplateMutation = useMutation({
    mutationFn: async ({ 
      templateId, 
      promptId, 
      orderIndex 
    }: { 
      templateId: string; 
      promptId: string;
      orderIndex: number;
    }) => {
      const { data, error } = await TemplateService.addPromptToTemplate(
        templateId,
        promptId,
        orderIndex
      );
      if (error) throw error;
      
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['template', variables.templateId] });
      toast.success('Prompt added to template');
      if (options.onSuccess) options.onSuccess(null);
    },
    onError: (error: Error) => {
      toast.error(`Failed to add prompt to template: ${error.message}`);
      if (options.onError) options.onError(error);
    }
  });

  // Mutation for removing a prompt from a template
  const removePromptFromTemplateMutation = useMutation({
    mutationFn: async ({
      templatePromptId,
      templateId
    }: {
      templatePromptId: string;
      templateId: string;
    }) => {
      const { error } = await TemplateService.removePromptFromTemplate(templatePromptId);
      if (error) throw error;
      
      return { templatePromptId, templateId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['template', data.templateId] });
      toast.success('Prompt removed from template');
      if (options.onSuccess) options.onSuccess(null);
    },
    onError: (error: Error) => {
      toast.error(`Failed to remove prompt from template: ${error.message}`);
      if (options.onError) options.onError(error);
    }
  });

  return {
    templates,
    isLoading,
    isError,
    error,
    refetch,
    createTemplate: createTemplateMutation.mutate,
    updateTemplate: updateTemplateMutation.mutate,
    deleteTemplate: deleteTemplateMutation.mutate,
    getTemplateWithPrompts,
    addPromptToTemplate: addPromptToTemplateMutation.mutate,
    removePromptFromTemplate: removePromptFromTemplateMutation.mutate,
    // Mutation states
    isCreating: createTemplateMutation.isPending,
    isUpdating: updateTemplateMutation.isPending,
    isDeleting: deleteTemplateMutation.isPending,
    isAddingPrompt: addPromptToTemplateMutation.isPending,
    isRemovingPrompt: removePromptFromTemplateMutation.isPending,
  };
}
