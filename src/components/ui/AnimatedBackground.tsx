
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  children?: React.ReactNode; // Make children optional
  className?: string;
}

const AnimatedBackground = ({ children, className }: AnimatedBackgroundProps) => {
  return (
    <div 
      className={cn(
        "bg-gradient-to-r from-promptly-blue/80 to-promptly-purple/80 animate-gradient-x bg-[length:200%_auto]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedBackground;
