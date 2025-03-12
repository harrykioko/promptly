
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard = ({ children, className, hoverEffect = true }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6",
        hoverEffect && "hover-lift",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
