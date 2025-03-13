
import React, { useState } from 'react';
import { Lightbulb, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import FormField from './FormField';
import TagsManager from './TagsManager';
import AIPromptSuggestions from './AIPromptSuggestions';

interface Tag {
  id: string;
  name: string;
}

interface PromptFormProps {
  onSave?: (promptData: {
    title: string;
    content: string;
    tags: string[];
  }) => void;
  onCancel?: () => void;
  initialData?: {
    title: string;
    content: string;
    tags: string[];
  };
}

const PromptForm = ({ onSave, onCancel, initialData }: PromptFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [tags, setTags] = useState<Tag[]>(
    initialData?.tags.map((tag, index) => ({ id: `${index}`, name: tag })) || []
  );
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);
  
  const aiSuggestions = {
    promptTitle: "Try to make your title clear and descriptive of the task you want AI to perform",
    promptContent: "Include specific instructions and context. Consider adding examples of desired output format.",
    tagSuggestions: ["react", "typescript", "frontend", "component", "optimization"],
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast.error("Please add a title for your prompt");
      return;
    }
    
    if (!content.trim()) {
      toast.error("Please add content to your prompt");
      return;
    }
    
    if (onSave) {
      onSave({
        title,
        content,
        tags: tags.map(tag => tag.name),
      });
    }
  };

  const handleApplySuggestion = (suggestion: string) => {
    setContent(prev => prev + (prev ? '\n\n' : '') + suggestion);
    setShowAiSuggestion(false);
  };

  return (
    <div className="space-y-6">
      <FormField 
        id="prompt-title" 
        label="Prompt Title" 
        tooltip={aiSuggestions.promptTitle}
      >
        <Input
          id="prompt-title"
          placeholder="Enter a descriptive title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg"
        />
      </FormField>

      <FormField 
        id="prompt-content" 
        label="Prompt Content" 
        tooltip={aiSuggestions.promptContent}
        rightElement={
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto text-promptly-purple flex items-center gap-1"
            onClick={() => setShowAiSuggestion(!showAiSuggestion)}
          >
            <Lightbulb className="h-4 w-4" />
            <span>AI Suggestions</span>
          </Button>
        }
      >
        <div className="relative">
          <textarea
            id="prompt-content"
            placeholder="Write your prompt here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-32 p-4 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          
          {showAiSuggestion && (
            <AIPromptSuggestions 
              onClose={() => setShowAiSuggestion(false)} 
              onApplySuggestion={handleApplySuggestion}
            />
          )}
        </div>
      </FormField>

      <TagsManager 
        tags={tags} 
        setTags={setTags} 
        suggestedTags={aiSuggestions.tagSuggestions} 
      />

      <div className="flex justify-end gap-3 pt-4">
        <Button 
          variant="outline" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-gradient">
          <Save className="mr-2 h-4 w-4" />
          Save Prompt
        </Button>
      </div>
    </div>
  );
};

export default PromptForm;
