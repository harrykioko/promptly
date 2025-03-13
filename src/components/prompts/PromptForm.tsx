import React, { useState } from 'react';
import { X, HelpCircle, Lightbulb, MessageSquarePlus, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { toast } from 'sonner';
import GlassCard from '../ui/GlassCard';
import { cn } from '@/lib/utils';

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
  const [tagInput, setTagInput] = useState('');
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);
  
  const aiSuggestions = {
    promptTitle: "Try to make your title clear and descriptive of the task you want AI to perform",
    promptContent: "Include specific instructions and context. Consider adding examples of desired output format.",
    tagSuggestions: ["react", "typescript", "frontend", "component", "optimization"],
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !tags.some(tag => tag.name === tagInput.trim())) {
      setTags([...tags, { id: Date.now().toString(), name: tagInput.trim() }]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (id: string) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
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
    
    toast.success("Prompt saved successfully");
  };

  const handleApplySuggestion = (suggestion: string) => {
    setContent(prev => prev + (prev ? '\n\n' : '') + suggestion);
    setShowAiSuggestion(false);
    toast.success("Suggestion applied");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center">
          <label htmlFor="prompt-title" className="text-lg font-medium block mb-2">
            Prompt Title
          </label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>{aiSuggestions.promptTitle}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Input
          id="prompt-title"
          placeholder="Enter a descriptive title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <label htmlFor="prompt-content" className="text-lg font-medium block mb-2">
            Prompt Content
          </label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>{aiSuggestions.promptContent}</p>
            </TooltipContent>
          </Tooltip>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto text-promptly-purple flex items-center gap-1"
            onClick={() => setShowAiSuggestion(!showAiSuggestion)}
          >
            <Lightbulb className="h-4 w-4" />
            <span>AI Suggestions</span>
          </Button>
        </div>
        <div className="relative">
          <textarea
            id="prompt-content"
            placeholder="Write your prompt here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-32 p-4 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          
          {showAiSuggestion && (
            <GlassCard className="absolute right-0 top-full mt-2 w-96 z-10 shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">AI Suggestions</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowAiSuggestion(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-promptly-purple/10 rounded-lg">
                  <p className="text-sm mb-2">
                    Add specific instructions about the desired format or style:
                  </p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="w-full justify-start text-left text-xs" 
                    onClick={() => handleApplySuggestion("Please format your response with clear headings, bullet points for key items, and code examples where appropriate.")}
                  >
                    <MessageSquarePlus className="h-3 w-3 mr-2 flex-shrink-0" />
                    <span className="truncate">Format with headings, bullet points and code examples</span>
                  </Button>
                </div>
                <div className="p-3 bg-promptly-blue/10 rounded-lg">
                  <p className="text-sm mb-2">
                    Add context about the intended audience:
                  </p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="w-full justify-start text-left text-xs" 
                    onClick={() => handleApplySuggestion("This explanation is intended for junior developers who are familiar with JavaScript but new to TypeScript and React hooks.")}
                  >
                    <MessageSquarePlus className="h-3 w-3 mr-2 flex-shrink-0" />
                    <span className="truncate">For junior devs familiar with JS but new to TS/React</span>
                  </Button>
                </div>
                <div className="p-3 bg-green-100/20 rounded-lg">
                  <p className="text-sm mb-2">
                    Add example of expected output:
                  </p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="w-full justify-start text-left text-xs" 
                    onClick={() => handleApplySuggestion("I'd like your response to follow this structure:\n1. Brief overview of the concept\n2. Code example with comments\n3. Common pitfalls to avoid\n4. Best practices")}
                  >
                    <MessageSquarePlus className="h-3 w-3 mr-2 flex-shrink-0" />
                    <span className="truncate">Define a specific response structure</span>
                  </Button>
                </div>
              </div>
            </GlassCard>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <label htmlFor="prompt-tags" className="text-lg font-medium block mb-2">
            Tags
          </label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add tags to categorize your prompt</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map(tag => (
            <div 
              key={tag.id} 
              className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {tag.name}
              <button 
                onClick={() => handleRemoveTag(tag.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            id="prompt-tags"
            placeholder="Add tags..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleAddTag} variant="outline">Add</Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          <p className="text-sm text-muted-foreground w-full mb-1">Suggested tags:</p>
          {aiSuggestions.tagSuggestions.map((tag, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={cn(
                "bg-muted/50 hover:bg-muted text-xs",
                tags.some(t => t.name === tag) && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => {
                if (!tags.some(t => t.name === tag)) {
                  setTags([...tags, { id: Date.now().toString(), name: tag }]);
                }
              }}
              disabled={tags.some(t => t.name === tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

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

