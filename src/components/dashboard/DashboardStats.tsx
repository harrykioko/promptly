
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

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="Total Prompts" 
        value={42} 
        icon={FileText} 
        change="+5 this week" 
        trend="up" 
      />
      <StatCard 
        title="Templates" 
        value={8} 
        icon={Layers} 
        change="+2 this week" 
        trend="up" 
      />
      <StatCard 
        title="Favorites" 
        value={12} 
        icon={Star} 
      />
      <StatCard 
        title="Usage" 
        value="86%" 
        icon={Activity} 
        change="+12% from last month" 
        trend="up" 
      />
    </div>
  );
};

export default DashboardStats;
