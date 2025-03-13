
import React, { useState } from 'react';
import { X, HelpCircle, Circle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface Tag {
  id: string;
  name: string;
  color?: string;
}

interface TagsManagerProps {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  suggestedTags: string[];
}

const TAG_COLORS = [
  { name: 'blue', value: 'bg-promptly-blue text-white' },
  { name: 'purple', value: 'bg-promptly-purple text-white' },
  { name: 'indigo', value: 'bg-promptly-indigo text-white' },
  { name: 'gray', value: 'bg-promptly-gray text-white' },
  { name: 'light-blue', value: 'bg-promptly-light-blue text-promptly-blue' },
  { name: 'light-purple', value: 'bg-promptly-light-purple text-promptly-purple' },
];

const TagsManager = ({ tags, setTags, suggestedTags }: TagsManagerProps) => {
  const [tagInput, setTagInput] = useState('');
  const [selectedColor, setSelectedColor] = useState(TAG_COLORS[0]);

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !tags.some(tag => tag.name === tagInput.trim())) {
      setTags([
        ...tags, 
        { 
          id: Date.now().toString(), 
          name: tagInput.trim(), 
          color: selectedColor.value 
        }
      ]);
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

  const getTagClassName = (tag: Tag) => {
    return cn(
      "px-3 py-1 rounded-full text-sm flex items-center gap-1",
      tag.color || "bg-secondary/20 text-secondary-foreground" 
    );
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
            <p>Add color-coded tags to categorize your prompt</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map(tag => (
          <div 
            key={tag.id} 
            className={getTagClassName(tag)}
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
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="flex-shrink-0">
              <div className={cn("w-4 h-4 rounded-full", selectedColor.value.split(' ')[0])} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="grid grid-cols-3 gap-2">
              {TAG_COLORS.map((color) => (
                <Button
                  key={color.name}
                  variant="ghost"
                  className="p-1 h-auto"
                  onClick={() => setSelectedColor(color)}
                >
                  <div className="flex items-center gap-2">
                    <div className={cn("w-4 h-4 rounded-full", color.value.split(' ')[0])} />
                    <span className="text-xs capitalize">{color.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        
        <Button onClick={handleAddTag} variant="outline">Add</Button>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-2">
        <p className="text-sm text-muted-foreground w-full mb-1">Suggested tags:</p>
        {suggestedTags.map((tag, index) => {
          // Assign different colors to suggested tags in a rotational way
          const color = TAG_COLORS[index % TAG_COLORS.length].value;
          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={cn(
                color.split(' ')[0], // Only use the background color
                "hover:opacity-80 text-xs",
                tags.some(t => t.name === tag) && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => {
                if (!tags.some(t => t.name === tag)) {
                  setTags([...tags, { 
                    id: Date.now().toString(), 
                    name: tag,
                    color
                  }]);
                }
              }}
              disabled={tags.some(t => t.name === tag)}
            >
              {tag}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TagsManager;
