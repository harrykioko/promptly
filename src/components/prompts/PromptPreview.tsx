
import React from 'react';
import { Clock, Tag, Copy } from 'lucide-react';
import { Button } from '../ui/button';
import GlassCard from '../ui/GlassCard';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Tag {
  id: string;
  name: string;
  color?: string;
}

interface PromptPreviewProps {
  title: string;
  content: string;
  tags: Tag[];
}

const PromptPreview = ({ title, content, tags }: PromptPreviewProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    toast.success("Prompt copied to clipboard");
  };

  const getTagDisplay = (tag: Tag) => {
    return (
      <span 
        key={tag.id} 
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          tag.color || "bg-secondary/20 text-secondary-foreground"
        )}
      >
        <Tag className="h-3 w-3 mr-1" />
        {tag.name}
      </span>
    );
  };
  
  return (
    <GlassCard className="hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg">{title || "Untitled Prompt"}</h3>
      </div>
      
      <div className="mb-4">
        <p className="text-muted-foreground line-clamp-3 text-sm">
          {content || "No content yet"}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.length > 0 
          ? tags.map((tag) => getTagDisplay(tag)) 
          : <span className="text-xs text-muted-foreground">No tags added</span>}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>Preview</span>
        </div>
        
        <Button size="sm" className="bg-gradient" onClick={copyToClipboard}>
          <Copy className="h-4 w-4 mr-1" />
          Copy
        </Button>
      </div>
    </GlassCard>
  );
};

export default PromptPreview;
