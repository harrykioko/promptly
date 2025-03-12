
import React from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const GradientText = ({ 
  children, 
  className, 
  as: Component = 'span' 
}: GradientTextProps) => {
  return (
    <Component className={cn("text-gradient font-bold", className)}>
      {children}
    </Component>
  );
};

export default GradientText;
