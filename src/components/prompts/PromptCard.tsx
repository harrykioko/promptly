
import React from 'react';
import { MoreHorizontal, Copy, Clock, Tag } from 'lucide-react';
import { Button } from '../ui/button';
import GlassCard from '../ui/GlassCard';
import { toast } from "sonner";

interface PromptCardProps {
  id: string;
  title: string;
  content: string;
  tags: string[];
  lastUpdated: string;
  isFavorite?: boolean;
}

const PromptCard = ({ 
  id, 
  title, 
  content, 
  tags, 
  lastUpdated,
  isFavorite = false
}: PromptCardProps) => {
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    toast.success("Prompt copied to clipboard");
  };
  
  return (
    <GlassCard className="hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg">{title}</h3>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="mb-4">
        <p className="text-muted-foreground line-clamp-3 text-sm">{content}</p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/20 text-secondary-foreground"
          >
            <Tag className="h-3 w-3 mr-1" />
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>{lastUpdated}</span>
        </div>
        
        <Button size="sm" className="bg-gradient" onClick={copyToClipboard}>
          <Copy className="h-4 w-4 mr-1" />
          Copy
        </Button>
      </div>
    </GlassCard>
  );
};

export default PromptCard;
