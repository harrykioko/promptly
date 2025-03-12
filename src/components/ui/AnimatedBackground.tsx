
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  children?: React.ReactNode; // Children is optional
  className?: string;
}

const AnimatedBackground = ({ children, className }: AnimatedBackgroundProps) => {
  return (
    <div 
      className={cn(
        "relative overflow-hidden w-full h-full",
        className
      )}
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-promptly-blue/90 via-promptly-purple/90 to-promptly-indigo/90 animate-gradient-x bg-[length:200%_auto]"></div>
      
      {/* Wavy lines pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 C1150,200 1350,0 1500,100 V800 H0 V100Z" 
            fill="none" 
            stroke="white" 
            strokeWidth="2"
            className="animate-pulse"
          />
          <path 
            d="M0,300 C150,400 350,200 500,300 C650,400 850,200 1000,300 C1150,400 1350,200 1500,300 V800 H0 V300Z" 
            fill="none" 
            stroke="white" 
            strokeWidth="1.5"
            className="animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
          <path 
            d="M0,500 C150,600 350,400 500,500 C650,600 850,400 1000,500 C1150,600 1350,400 1500,500 V800 H0 V500Z" 
            fill="none" 
            stroke="white" 
            strokeWidth="1"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </svg>
      </div>
      
      {/* Glowing orb effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-promptly-light-blue blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-promptly-light-purple blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1.5s" }}></div>
      
      {/* Add a subtle grid pattern for more depth */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHY2YzYuNjI3IDAgMTIgNS4zNzMgMTIgMTJoNnptLTYgNmMwLTYuNjI3LTUuMzczLTEyLTEyLTEydjZjMy4zMTQgMCA2IDIuNjg2IDYgNmg2eiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
      
      {children}
    </div>
  );
};

export default AnimatedBackground;
