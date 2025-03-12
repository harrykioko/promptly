
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
        "bg-white/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg",
        hoverEffect && "hover-lift",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
