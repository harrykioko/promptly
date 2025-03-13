
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { ArrowRight, Star, History, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PromptCard from '@/components/prompts/PromptCard';
import GradientText from '@/components/ui/GradientText';
import { usePrompts } from '@/hooks/use-prompts';
import { useTemplates } from '@/hooks/use-templates';
import { useUser } from '@/hooks/use-user';
import { useProfile } from '@/hooks/use-profile';

const Dashboard = () => {
  const { user } = useUser();
  const { profile, isLoading: isProfileLoading } = useProfile();
  const { prompts, isLoading: isPromptsLoading } = usePrompts();
  const { templates, isLoading: isTemplatesLoading } = useTemplates();
  
  // Get recent prompts (latest 3)
  const recentPrompts = React.useMemo(() => {
    if (!prompts) return [];
    
    return [...prompts]
      .sort((a, b) => {
        const dateA = new Date(a.updated_at || a.created_at || '').getTime();
        const dateB = new Date(b.updated_at || b.created_at || '').getTime();
        return dateB - dateA;
      })
      .slice(0, 3);
  }, [prompts]);
  
  // Calculate stats
  const stats = React.useMemo(() => {
    return {
      totalPrompts: prompts?.length || 0,
      templates: templates?.length || 0,
      // For favorites and usage, we'll use placeholders until implemented
      favorites: 0,
      usage: '0%'
    };
  }, [prompts, templates]);
  
  const isLoading = isPromptsLoading || isTemplatesLoading || isProfileLoading;
  
  if (isLoading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-8">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {profile?.full_name || user?.email?.split('@')[0] || 'User'}!
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your prompt activity
          </p>
        </div>
        
        {/* Stats */}
        <section className="mb-8">
          <DashboardStats 
            totalPrompts={stats.totalPrompts}
            templates={stats.templates}
            favorites={stats.favorites}
            usage={stats.usage}
          />
        </section>
        
        {/* Recent Prompts */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Recent Prompts
            </h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/prompts" className="text-muted-foreground hover:text-foreground flex items-center">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {recentPrompts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPrompts.map((prompt) => (
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
          ) : (
            <div className="text-center py-10 border border-dashed rounded-lg">
              <p className="text-muted-foreground mb-4">You haven't created any prompts yet</p>
              <Button className="bg-gradient" asChild>
                <Link to="/prompts/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Prompt
                </Link>
              </Button>
            </div>
          )}
        </section>
        
        {/* Two Column Layout: Recent Activity and Favorites */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          
          {/* Quick Actions */}
          <div>
            <div className="glass-dark rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">
                <GradientText>AI Assistant</GradientText>
              </h3>
              <p className="mb-6 text-white/80 text-sm">
                Get intelligent suggestions to improve your prompts using GPT-4o and Claude.
              </p>
              <Button className="w-full bg-white/20 hover:bg-white/30 text-white">
                <Star className="mr-2 h-4 w-4" />
                Optimize my prompts
              </Button>
            </div>
            
            <div className="glass mt-6 rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <History className="mr-2 h-5 w-5" />
                Version History
              </h3>
              {prompts && prompts.length > 0 ? (
                <div className="space-y-3">
                  {prompts.slice(0, 2).map(prompt => (
                    <div key={prompt.id} className="flex justify-between items-center text-sm p-2 rounded-lg bg-background/70">
                      <div>
                        <p className="font-medium">{prompt.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(prompt.updated_at || prompt.created_at || '').toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No version history yet
                </p>
              )}
              <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                <Link to="/prompts">
                  View all versions
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
