
import React from 'react';
import { Clock, FileText, Layers, Edit, Copy } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

type ActivityType = 'created' | 'edited' | 'copied' | 'used';

interface ActivityItem {
  id: string;
  type: ActivityType;
  name: string;
  isTemplate: boolean;
  timestamp: string;
}

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case 'created':
      return <FileText className="h-4 w-4" />;
    case 'edited':
      return <Edit className="h-4 w-4" />;
    case 'copied':
      return <Copy className="h-4 w-4" />;
    case 'used':
      return <FileText className="h-4 w-4" />;
  }
};

const getActivityText = (item: ActivityItem) => {
  const itemType = item.isTemplate ? 'template' : 'prompt';
  
  switch (item.type) {
    case 'created':
      return `Created ${itemType} "${item.name}"`;
    case 'edited':
      return `Edited ${itemType} "${item.name}"`;
    case 'copied':
      return `Copied ${itemType} "${item.name}"`;
    case 'used':
      return `Used ${itemType} "${item.name}"`;
  }
};

interface ActivityListProps {
  activities: ActivityItem[];
}

const ActivityList = ({ activities }: ActivityListProps) => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${
            activity.isTemplate ? 'bg-secondary/20' : 'bg-primary/20'
          }`}>
            {activity.isTemplate ? 
              <Layers className="h-4 w-4 text-secondary" /> : 
              getActivityIcon(activity.type)
            }
          </div>
          <div className="flex-1">
            <p className="text-sm">{getActivityText(activity)}</p>
            <p className="text-xs text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1" /> {activity.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const RecentActivity = () => {
  // Mock data
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'created',
      name: 'React Component Helper',
      isTemplate: false,
      timestamp: 'Just now'
    },
    {
      id: '2',
      type: 'edited',
      name: 'Web Development Collection',
      isTemplate: true,
      timestamp: '2 hours ago'
    },
    {
      id: '3',
      type: 'copied',
      name: 'Code Review Prompt',
      isTemplate: false,
      timestamp: '3 hours ago'
    },
    {
      id: '4',
      type: 'used',
      name: 'Database Design Helper',
      isTemplate: false,
      timestamp: 'Yesterday'
    },
    {
      id: '5',
      type: 'created',
      name: 'API Documentation',
      isTemplate: false,
      timestamp: '2 days ago'
    }
  ];
  
  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Recent Activity</h3>
      </div>
      <ActivityList activities={activities} />
    </GlassCard>
  );
};

export default RecentActivity;
