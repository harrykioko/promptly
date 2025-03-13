
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TemplateCard from '@/components/templates/TemplateCard';
import { Plus, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useTemplates } from '@/hooks/use-templates';
import { useUser } from '@/hooks/use-user';
import { Template } from '@/services/TemplateService';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Templates = () => {
  const { user } = useUser();
  const { templates, isLoading, isError, createTemplate, isCreating } = useTemplates();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newTemplateTitle, setNewTemplateTitle] = useState('');
  const [newTemplateDescription, setNewTemplateDescription] = useState('');
  
  // Extract all unique tags from templates
  const allTags = React.useMemo(() => {
    if (!templates) return [];
    
    const tagSet = new Set<string>();
    templates.forEach(template => {
      // Extract tags from prompts in templates (assuming tags are stored somewhere)
      // For now, using placeholder tags
      ['development', 'writing', 'marketing', 'data', 'design', 'ai', 'workflow', 'productivity'].forEach(tag => {
        tagSet.add(tag);
      });
    });
    
    return Array.from(tagSet);
  }, [templates]);
  
  // Filter templates based on selected tags and search term
  const filteredTemplates = React.useMemo(() => {
    if (!templates) return [];
    
    let filtered = templates;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(template => 
        template.title.toLowerCase().includes(term) || 
        (template.description && template.description.toLowerCase().includes(term))
      );
    }
    
    // For now, filtering by tags is a placeholder since templates don't have tags directly
    // In a real implementation, you'd need to either add tags to templates or fetch related tags
    
    return filtered;
  }, [templates, selectedTags, searchTerm]);
    
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  const handleCreateTemplate = () => {
    if (!newTemplateTitle.trim()) {
      toast.error('Please enter a template title');
      return;
    }
    
    createTemplate({
      title: newTemplateTitle.trim(),
      description: newTemplateDescription.trim() || null
    }, {
      onSuccess: () => {
        setCreateDialogOpen(false);
        setNewTemplateTitle('');
        setNewTemplateDescription('');
      }
    });
  };
  
  if (isError) {
    return (
      <DashboardLayout title="Templates">
        <div className="p-4 bg-red-100 rounded-md text-red-700">
          Error loading templates. Please try again later.
        </div>
      </DashboardLayout>
    );
  }
  
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
          <Button className="bg-gradient" onClick={() => setCreateDialogOpen(true)}>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-52 rounded-lg bg-muted animate-pulse"></div>
            ))}
          </div>
        ) : filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTemplates.map(template => (
              <TemplateCard 
                key={template.id}
                id={template.id}
                title={template.title}
                description={template.description || ''}
                promptCount={3} // Placeholder - would need to fetch actual count
                tags={['placeholder']} // Placeholder - would need to fetch actual tags
                lastUpdated={new Date(template.updated_at || template.created_at || '').toLocaleDateString()}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No templates found</p>
            <Button variant="outline" onClick={() => setCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Template
            </Button>
          </div>
        )}
      </div>

      {/* Create Template Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
            <DialogDescription>
              Templates allow you to group related prompts for easy access.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Template Title</Label>
              <Input 
                id="title" 
                placeholder="Enter a title" 
                value={newTemplateTitle}
                onChange={(e) => setNewTemplateTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Enter a description (optional)" 
                value={newTemplateDescription}
                onChange={(e) => setNewTemplateDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
            <Button className="bg-gradient" onClick={handleCreateTemplate} disabled={isCreating}>
              {isCreating ? 'Creating...' : 'Create Template'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Templates;
