
import React from 'react';
import { LucideIcon } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
}

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  className,
  iconClassName
}: FeatureCardProps) => {
  return (
    <GlassCard className={cn("flex flex-col items-center text-center h-full", className)}>
      <div className={cn(
        "rounded-full p-3 bg-gradient-to-r from-promptly-blue/20 to-promptly-purple/20 mb-4",
        iconClassName
      )}>
        <Icon className="w-6 h-6 text-promptly-indigo" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </GlassCard>
  );
};

export default FeatureCard;
