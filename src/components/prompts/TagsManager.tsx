
import React, { useState } from 'react';
import { X, HelpCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { cn } from '@/lib/utils';

interface Tag {
  id: string;
  name: string;
}

interface TagsManagerProps {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  suggestedTags: string[];
}

const TagsManager = ({ tags, setTags, suggestedTags }: TagsManagerProps) => {
  const [tagInput, setTagInput] = useState('');

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

  return (
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
        {suggestedTags.map((tag, index) => (
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
  );
};

export default TagsManager;
