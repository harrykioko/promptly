
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TemplateCard from '@/components/templates/TemplateCard';
import { Plus, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Mock data for tags
const allTags = [
  'development', 'writing', 'marketing', 'data', 
  'design', 'ai', 'workflow', 'productivity'
];

const Templates = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Mock data for templates
  const templates = [
    {
      id: '1',
      title: 'Full-Stack Development Suite',
      description: 'A collection of prompts for full-stack development covering React, Node.js, and database design.',
      promptCount: 6,
      tags: ['development', 'react', 'node', 'database'],
      lastUpdated: '2 days ago'
    },
    {
      id: '2',
      title: 'Technical Documentation',
      description: 'Prompts for creating API documentation, code comments, and technical guides.',
      promptCount: 4,
      tags: ['documentation', 'writing', 'api'],
      lastUpdated: '1 week ago'
    },
    {
      id: '3',
      title: 'Data Analysis Workflow',
      description: 'End-to-end prompts for data cleaning, analysis, visualization, and reporting.',
      promptCount: 5,
      tags: ['data', 'analysis', 'visualization'],
      lastUpdated: '2 weeks ago'
    },
    {
      id: '4',
      title: 'UI/UX Design Process',
      description: 'A comprehensive collection of prompts for the entire design process from research to implementation.',
      promptCount: 8,
      tags: ['design', 'ui', 'ux'],
      lastUpdated: '3 weeks ago'
    }
  ];
  
  // Filter templates based on selected tags
  const filteredTemplates = selectedTags.length > 0
    ? templates.filter(template => 
        template.tags.some(tag => selectedTags.includes(tag))
      )
    : templates;
    
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  return (
    <DashboardLayout title="Templates">
      <div className="space-y-8">
        {/* Header and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Templates</h1>
            <p className="text-muted-foreground">
              Group related prompts into multi-step templates
            </p>
          </div>
          <Button className="bg-gradient">
            <Plus className="mr-2 h-4 w-4" />
            Create New Template
          </Button>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search templates..." 
              className="pl-10"
            />
          </div>
          
          <div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors",
                selectedTags.includes(tag)
                  ? "bg-secondary text-white"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              )}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        
        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTemplates.map(template => (
            <TemplateCard 
              key={template.id}
              id={template.id}
              title={template.title}
              description={template.description}
              promptCount={template.promptCount}
              tags={template.tags}
              lastUpdated={template.lastUpdated}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Templates;
