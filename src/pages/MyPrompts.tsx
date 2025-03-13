
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PromptCard from '@/components/prompts/PromptCard';
import { Plus, Filter, Grid3X3, List, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { usePrompts } from '@/hooks/use-prompts';
import { useUser } from '@/hooks/use-user';

const MyPrompts = () => {
  const { user } = useUser();
  const { prompts, isLoading, isError } = usePrompts();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Extract all unique tags from prompts
  const allTags = React.useMemo(() => {
    if (!prompts) return [];
    
    const tagSet = new Set<string>();
    prompts.forEach(prompt => {
      if (prompt.tags) {
        prompt.tags.forEach(tag => tagSet.add(tag));
      }
    });
    
    return Array.from(tagSet);
  }, [prompts]);
  
  // Filter prompts based on selected tags and search term
  const filteredPrompts = React.useMemo(() => {
    if (!prompts) return [];
    
    let filtered = prompts;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(prompt => 
        prompt.title.toLowerCase().includes(term) || 
        prompt.content.toLowerCase().includes(term)
      );
    }
    
    if (selectedTags.length > 0) {
      filtered = filtered.filter(prompt => 
        prompt.tags && prompt.tags.some(tag => selectedTags.includes(tag))
      );
    }
    
    return filtered;
  }, [prompts, selectedTags, searchTerm]);
  
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
        {allTags.length > 0 && (
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
        )}
        
        {/* Loading State */}
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Loading your prompts...</p>
          </div>
        ) : isError ? (
          <div className="p-4 bg-red-100 rounded-md text-red-700">
            Error loading prompts. Please try again later.
          </div>
        ) : filteredPrompts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedTags.length > 0 
                ? "No prompts match your search criteria" 
                : "You don't have any prompts yet"}
            </p>
            <Button className="bg-gradient" asChild>
              <Link to="/prompts/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Prompt
              </Link>
            </Button>
          </div>
        ) : (
          /* Prompts Grid/List */
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
                tags={prompt.tags || []}
                lastUpdated={new Date(prompt.updated_at || prompt.created_at || '').toLocaleDateString()}
                isFavorite={false} // Need to implement favorites functionality
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyPrompts;
