import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  User, 
  LogOut,
  Menu,
  X,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GradientText from '../ui/GradientText';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Sidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  
  const navItems = [
    { 
      icon: LayoutDashboard, 
      name: 'Dashboard', 
      path: '/dashboard'
    },
    { 
      icon: FileText, 
      name: 'My Prompts', 
      path: '/prompts'
    },
    { 
      icon: Layers, 
      name: 'Templates', 
      path: '/templates'
    },
    { 
      icon: User, 
      name: 'Profile', 
      path: '/profile'
    }
  ];
  
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 md:hidden bg-gradient text-white p-3 rounded-full shadow-lg"
        onClick={toggleMobileMenu}
      >
        {isMobileOpen ? <X /> : <Menu />}
      </button>
      
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-gradient-to-b from-promptly-blue/20 to-promptly-purple/20 backdrop-blur-xl border-r border-white/10 shadow-lg transition-all duration-300 ease-in-out md:translate-x-0 md:sticky md:top-0 md:h-screen overflow-y-auto rounded-r-2xl",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          isExpanded ? "w-64" : "w-20"
        )}
      >
        <button
          className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
          onClick={toggleExpanded}
        >
          {isExpanded ? 
            <ChevronLeft className="h-5 w-5 drop-shadow-md" /> : 
            <ChevronRight className="h-5 w-5 drop-shadow-md" />
          }
        </button>

        <div className="flex flex-col h-full p-4">
          <div className="py-6 px-4 flex justify-center md:justify-start">
            <Link to="/dashboard" onClick={() => setIsMobileOpen(false)}>
              {isExpanded ? (
                <GradientText as="h1" className="text-2xl font-bold">Promptly</GradientText>
              ) : (
                <GradientText as="h1" className="text-2xl font-bold filter drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">P</GradientText>
              )}
            </Link>
          </div>
          
          <div className="px-4 mb-6">
            {isExpanded ? (
              <Button className="w-full justify-start bg-gradient hover:shadow-lg" asChild>
                <Link to="/prompts/new" onClick={() => setIsMobileOpen(false)}>
                  <Plus className="h-5 w-5 mr-2" />
                  Create New
                </Link>
              </Button>
            ) : (
              <Button className="w-full justify-center bg-gradient hover:shadow-lg p-2" asChild>
                <Link to="/prompts/new" onClick={() => setIsMobileOpen(false)}>
                  <Plus className="h-5 w-5 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]" />
                </Link>
              </Button>
            )}
          </div>
          
          {isExpanded && (
            <div className="px-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search prompts..." 
                  className="pl-10 bg-background/50 border-white/10"
                />
              </div>
            </div>
          )}
          
          <nav className="flex-1 space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = isActiveRoute(item.path);
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors relative",
                    !isExpanded && "justify-center",
                    isActive
                      ? "bg-white/15 text-primary" 
                      : "hover:bg-white/10 text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <div className={cn(
                    "relative flex items-center justify-center",
                    isActive && !isExpanded && "after:absolute after:inset-0 after:rounded-full after:bg-blue-500/20 after:blur-md after:z-[-1]"
                  )}>
                    <Icon 
                      className={cn(
                        "h-5 w-5",
                        isActive && !isExpanded && "text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                      )} 
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    
                    {isActive && !isExpanded && (
                      <span className="absolute left-0 w-1 h-full bg-primary rounded-r-md -ml-4"></span>
                    )}
                  </div>
                  
                  {isExpanded && <span className="ml-3">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-auto px-4 py-4 border-t border-white/10">
            <Button 
              variant="ghost" 
              className={cn(
                "w-full text-muted-foreground hover:text-destructive",
                isExpanded ? "justify-start" : "justify-center p-2"
              )} 
              asChild
            >
              <Link to="/login">
                <LogOut 
                  className="h-5 w-5 filter drop-shadow-[0_0_3px_rgba(255,255,255,0.7)]" 
                />
                {isExpanded && <span className="ml-3">Logout</span>}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
