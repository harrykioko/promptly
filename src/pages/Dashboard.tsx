
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { ArrowRight, Star, History, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PromptCard from '@/components/prompts/PromptCard';
import GradientText from '@/components/ui/GradientText';

const Dashboard = () => {
  // Mock data for recent prompts
  const recentPrompts = [
    {
      id: '1',
      title: 'React Component Generator',
      content: 'Create a React functional component with TypeScript typing. Include useState and useEffect hooks as necessary. The component should be responsive and follow best practices.',
      tags: ['react', 'typescript', 'component'],
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      title: 'SQL Query Optimizer',
      content: 'Analyze the following SQL query and suggest optimizations for better performance. Consider indexing, query structure, and potential alternatives.',
      tags: ['sql', 'database', 'optimization'],
      lastUpdated: 'Yesterday'
    },
    {
      id: '3',
      title: 'API Documentation Helper',
      content: 'Generate comprehensive documentation for the following API endpoint. Include request/response examples, error codes, and parameter descriptions.',
      tags: ['api', 'documentation', 'rest'],
      lastUpdated: '3 days ago'
    }
  ];

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-8">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">
            Here's an overview of your prompt activity
          </p>
        </div>
        
        {/* Stats */}
        <section className="mb-8">
          <DashboardStats />
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPrompts.map((prompt) => (
              <PromptCard 
                key={prompt.id}
                id={prompt.id}
                title={prompt.title}
                content={prompt.content}
                tags={prompt.tags}
                lastUpdated={prompt.lastUpdated}
              />
            ))}
          </div>
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
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm p-2 rounded-lg bg-background/70">
                  <div>
                    <p className="font-medium">React Component Generator</p>
                    <p className="text-xs text-muted-foreground">v1.3 • 2 hours ago</p>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
                <div className="flex justify-between items-center text-sm p-2 rounded-lg bg-background/70">
                  <div>
                    <p className="font-medium">SQL Query Optimizer</p>
                    <p className="text-xs text-muted-foreground">v2.1 • Yesterday</p>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View all versions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
