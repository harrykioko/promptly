
import React from 'react';
import { FileText, Layers, Star, Activity } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface DashboardStatsProps {
  totalPrompts: number;
  templates: number;
  favorites: number;
  usage: string;
}

const StatCard = ({ title, value, icon: Icon, change, trend }: StatCardProps) => {
  return (
    <GlassCard className="flex items-center">
      <div className="bg-gradient p-3 rounded-md mr-4">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex items-center">
          <p className="text-2xl font-bold">{value}</p>
          {change && (
            <span className={`text-xs ml-2 ${
              trend === 'up' ? 'text-green-500' : 
              trend === 'down' ? 'text-red-500' : 
              'text-muted-foreground'
            }`}>
              {change}
            </span>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

const DashboardStats = ({ 
  totalPrompts = 0, 
  templates = 0, 
  favorites = 0, 
  usage = '0%' 
}: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="Total Prompts" 
        value={totalPrompts} 
        icon={FileText} 
        change={totalPrompts > 0 ? `+${Math.min(totalPrompts, 5)} this week` : undefined}
        trend={totalPrompts > 0 ? 'up' : 'neutral'} 
      />
      <StatCard 
        title="Templates" 
        value={templates} 
        icon={Layers} 
        change={templates > 0 ? `+${Math.min(templates, 2)} this week` : undefined}
        trend={templates > 0 ? 'up' : 'neutral'} 
      />
      <StatCard 
        title="Favorites" 
        value={favorites} 
        icon={Star} 
      />
      <StatCard 
        title="Usage" 
        value={usage} 
        icon={Activity} 
        change={usage !== '0%' ? "+12% from last month" : undefined}
        trend={usage !== '0%' ? 'up' : 'neutral'} 
      />
    </div>
  );
};

export default DashboardStats;
