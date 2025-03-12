import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PromptCard from '@/components/prompts/PromptCard';
import { Plus, Filter, Grid3X3, List, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

// Mock data for tags
const allTags = [
  'typescript', 'react', 'sql', 'api', 'documentation', 
  'database', 'frontend', 'backend', 'optimization', 'component'
];

const MyPrompts = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Mock data for prompts
  const prompts = [
    {
      id: '1',
      title: 'React Component Generator',
      content: 'Create a React functional component with TypeScript typing. Include useState and useEffect hooks as necessary. The component should be responsive and follow best practices.',
      tags: ['react', 'typescript', 'component'],
      lastUpdated: '2 hours ago',
      isFavorite: true
    },
    {
      id: '2',
      title: 'SQL Query Optimizer',
      content: 'Analyze the following SQL query and suggest optimizations for better performance. Consider indexing, query structure, and potential alternatives.',
      tags: ['sql', 'database', 'optimization'],
      lastUpdated: 'Yesterday',
      isFavorite: false
    },
    {
      id: '3',
      title: 'API Documentation Helper',
      content: 'Generate comprehensive documentation for the following API endpoint. Include request/response examples, error codes, and parameter descriptions.',
      tags: ['api', 'documentation', 'rest'],
      lastUpdated: '3 days ago',
      isFavorite: true
    },
    {
      id: '4',
      title: 'Code Review Prompt',
      content: 'Review the following code for potential bugs, performance issues, and adherence to best practices. Suggest improvements and refactoring when appropriate.',
      tags: ['code-review', 'best-practices'],
      lastUpdated: '1 week ago',
      isFavorite: false
    },
    {
      id: '5',
      title: 'Database Schema Designer',
      content: 'Help me design a normalized database schema for the following requirements. Consider relationships, indexes, and data types for optimal performance.',
      tags: ['database', 'schema', 'design'],
      lastUpdated: '2 weeks ago',
      isFavorite: false
    },
    {
      id: '6',
      title: 'CI/CD Pipeline Setup',
      content: 'Create a CI/CD pipeline configuration for a Node.js application using GitHub Actions. Include testing, building, and deployment steps.',
      tags: ['ci-cd', 'github-actions', 'devops'],
      lastUpdated: '3 weeks ago',
      isFavorite: true
    }
  ];
  
  // Filter prompts based on selected tags
  const filteredPrompts = selectedTags.length > 0
    ? prompts.filter(prompt => 
        prompt.tags.some(tag => selectedTags.includes(tag))
      )
    : prompts;
    
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  return (
    <DashboardLayout title="My Prompts">
      <div className="space-y-8">
        {/* Header and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Prompts</h1>
            <p className="text-muted-foreground">
              Manage and organize all your AI prompts
            </p>
          </div>
          <Button className="bg-gradient" asChild>
            <Link to="/prompts/new">
              <Plus className="mr-2 h-4 w-4" />
              Create New Prompt
            </Link>
          </Button>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search prompts..." 
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button 
              variant={view === 'grid' ? 'default' : 'outline'} 
              size="icon" 
              onClick={() => setView('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button 
              variant={view === 'list' ? 'default' : 'outline'} 
              size="icon" 
              onClick={() => setView('list')}
            >
              <List className="h-4 w-4" />
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
                  ? "bg-primary text-white"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              )}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        
        {/* Prompts Grid/List */}
        <div className={cn(
          view === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
        )}>
          {filteredPrompts.map(prompt => (
            <PromptCard 
              key={prompt.id}
              id={prompt.id}
              title={prompt.title}
              content={prompt.content}
              tags={prompt.tags}
              lastUpdated={prompt.lastUpdated}
              isFavorite={prompt.isFavorite}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyPrompts;
