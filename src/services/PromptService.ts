
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type Prompt = Tables<"prompts">;
export type PromptInsert = TablesInsert<"prompts">;
export type PromptVersion = Tables<"prompt_versions">;
export type PromptVersionInsert = TablesInsert<"prompt_versions">;

export interface PromptServiceResponse<T> {
  data: T | null;
  error: Error | null;
}

export class PromptService {
  /**
   * Create a new prompt
   */
  static async createPrompt(
    promptData: Omit<PromptInsert, "id" | "created_at" | "updated_at">
  ): Promise<PromptServiceResponse<Prompt>> {
    try {
      const { data, error } = await supabase
        .from("prompts")
        .insert(promptData)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Error creating prompt:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Fetch all prompts for a specific user
   */
  static async getUserPrompts(userId: string): Promise<PromptServiceResponse<Prompt[]>> {
    try {
      const { data, error } = await supabase
        .from("prompts")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Error fetching user prompts:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Update an existing prompt
   */
  static async updatePrompt(
    promptId: string,
    updates: Partial<Omit<PromptInsert, "id" | "created_at" | "updated_at">>
  ): Promise<PromptServiceResponse<Prompt>> {
    try {
      // Include updated_at timestamp
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("prompts")
        .update(updateData)
        .eq("id", promptId)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Error updating prompt:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Delete a prompt
   */
  static async deletePrompt(promptId: string): Promise<PromptServiceResponse<void>> {
    try {
      const { error } = await supabase
        .from("prompts")
        .delete()
        .eq("id", promptId);

      if (error) throw error;

      return { data: null, error: null };
    } catch (error) {
      console.error("Error deleting prompt:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Add a version history entry for a prompt
   */
  static async addVersionHistory(
    promptId: string,
    content: string
  ): Promise<PromptServiceResponse<PromptVersion>> {
    try {
      // Get the latest version number for this prompt
      const { data: versions, error: fetchError } = await supabase
        .from("prompt_versions")
        .select("version_number")
        .eq("prompt_id", promptId)
        .order("version_number", { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      // Calculate the new version number
      const newVersionNumber = versions && versions.length > 0 
        ? versions[0].version_number + 1 
        : 1;

      // Insert the new version
      const versionData: PromptVersionInsert = {
        prompt_id: promptId,
        content,
        version_number: newVersionNumber
      };

      const { data, error } = await supabase
        .from("prompt_versions")
        .insert(versionData)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Error adding version history:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Fetch version history for a prompt
   */
  static async getVersionHistory(promptId: string): Promise<PromptServiceResponse<PromptVersion[]>> {
    try {
      const { data, error } = await supabase
        .from("prompt_versions")
        .select("*")
        .eq("prompt_id", promptId)
        .order("version_number", { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Error fetching version history:", error);
      return { data: null, error: error as Error };
    }
  }
}
