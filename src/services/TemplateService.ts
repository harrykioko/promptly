
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type Template = Tables<"templates">;
export type TemplateInsert = TablesInsert<"templates">;
export type TemplatePrompt = Tables<"template_prompts">;
export type TemplatePromptInsert = TablesInsert<"template_prompts">;

export interface TemplateServiceResponse<T> {
  data: T | null;
  error: Error | null;
}

export class TemplateService {
  /**
   * Create a new template
   */
  static async createTemplate(
    templateData: Omit<TemplateInsert, "id" | "created_at" | "updated_at">
  ): Promise<TemplateServiceResponse<Template>> {
    try {
      const { data, error } = await supabase
        .from("templates")
        .insert(templateData)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Error creating template:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Fetch all templates for a specific user
   */
  static async getUserTemplates(userId: string): Promise<TemplateServiceResponse<Template[]>> {
    try {
      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Error fetching user templates:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Get a single template by ID
   */
  static async getTemplate(templateId: string): Promise<TemplateServiceResponse<Template>> {
    try {
      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .eq("id", templateId)
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Error fetching template:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Update an existing template
   */
  static async updateTemplate(
    templateId: string,
    updates: Partial<Omit<TemplateInsert, "id" | "created_at" | "updated_at">>
  ): Promise<TemplateServiceResponse<Template>> {
    try {
      // Include updated_at timestamp
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("templates")
        .update(updateData)
        .eq("id", templateId)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Error updating template:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Delete a template
   */
  static async deleteTemplate(templateId: string): Promise<TemplateServiceResponse<void>> {
    try {
      const { error } = await supabase
        .from("templates")
        .delete()
        .eq("id", templateId);

      if (error) throw error;

      return { data: null, error: null };
    } catch (error) {
      console.error("Error deleting template:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Add a prompt to a template
   */
  static async addPromptToTemplate(
    templateId: string,
    promptId: string,
    orderIndex: number
  ): Promise<TemplateServiceResponse<TemplatePrompt>> {
    try {
      const templatePromptData: TemplatePromptInsert = {
        template_id: templateId,
        prompt_id: promptId,
        order_index: orderIndex,
      };

      const { data, error } = await supabase
        .from("template_prompts")
        .insert(templatePromptData)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Error adding prompt to template:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Get all prompts for a template
   */
  static async getTemplatePrompts(templateId: string): Promise<TemplateServiceResponse<TemplatePrompt[]>> {
    try {
      const { data, error } = await supabase
        .from("template_prompts")
        .select(`
          *,
          prompts (*)
        `)
        .eq("template_id", templateId)
        .order("order_index", { ascending: true });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Error fetching template prompts:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Remove a prompt from a template
   */
  static async removePromptFromTemplate(templatePromptId: string): Promise<TemplateServiceResponse<void>> {
    try {
      const { error } = await supabase
        .from("template_prompts")
        .delete()
        .eq("id", templatePromptId);

      if (error) throw error;

      return { data: null, error: null };
    } catch (error) {
      console.error("Error removing prompt from template:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Update a template prompt's order
   */
  static async updateTemplatePromptOrder(
    templatePromptId: string,
    newOrderIndex: number
  ): Promise<TemplateServiceResponse<TemplatePrompt>> {
    try {
      const { data, error } = await supabase
        .from("template_prompts")
        .update({ order_index: newOrderIndex })
        .eq("id", templatePromptId)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Error updating template prompt order:", error);
      return { data: null, error: error as Error };
    }
  }
}
