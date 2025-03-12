
import React from 'react';
import { MoreHorizontal, Copy, Clock, Layers, Tag } from 'lucide-react';
import { Button } from '../ui/button';
import GlassCard from '../ui/GlassCard';
import { toast } from "sonner";

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  promptCount: number;
  tags: string[];
  lastUpdated: string;
}

const TemplateCard = ({ 
  id, 
  title, 
  description, 
  promptCount, 
  tags, 
  lastUpdated 
}: TemplateCardProps) => {
  
  const handleCopy = () => {
    toast.success("Template link copied to clipboard");
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
        <p className="text-muted-foreground line-clamp-2 text-sm">{description}</p>
      </div>
      
      <div className="flex items-center mb-4 text-sm text-muted-foreground">
        <Layers className="h-4 w-4 mr-1" />
        <span>{promptCount} prompts</span>
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
        
        <Button size="sm" className="bg-gradient" onClick={handleCopy}>
          <Copy className="h-4 w-4 mr-1" />
          Copy
        </Button>
      </div>
    </GlassCard>
  );
};

export default TemplateCard;
