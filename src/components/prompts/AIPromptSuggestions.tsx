
import React from 'react';
import { X, MessageSquarePlus } from 'lucide-react';
import { Button } from '../ui/button';
import GlassCard from '../ui/GlassCard';
import { toast } from 'sonner';

interface AIPromptSuggestionsProps {
  onClose: () => void;
  onApplySuggestion: (suggestion: string) => void;
}

const AIPromptSuggestions = ({ onClose, onApplySuggestion }: AIPromptSuggestionsProps) => {
  const handleApplySuggestion = (suggestion: string) => {
    onApplySuggestion(suggestion);
    toast.success("Suggestion applied");
  };

  return (
    <GlassCard className="absolute right-0 top-full mt-2 w-96 z-10 shadow-xl">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">AI Suggestions</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
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
  );
};

export default AIPromptSuggestions;
