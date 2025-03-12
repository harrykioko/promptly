
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
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GradientText from '../ui/GradientText';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Sidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
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
  
  // Helper to check if a route is active
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        className="fixed bottom-6 right-6 z-50 md:hidden bg-gradient text-white p-3 rounded-full shadow-lg"
        onClick={toggleMobileMenu}
      >
        {isMobileOpen ? <X /> : <Menu />}
      </button>
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 glass-dark transform transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:top-0 md:h-screen overflow-y-auto",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="py-6 px-4">
            <Link to="/dashboard" onClick={() => setIsMobileOpen(false)}>
              <GradientText as="h1" className="text-2xl font-bold">Promptly</GradientText>
            </Link>
          </div>
          
          {/* Create New Button */}
          <div className="px-4 mb-6">
            <Button className="w-full justify-start bg-gradient hover:shadow-lg" asChild>
              <Link to="/prompts/new" onClick={() => setIsMobileOpen(false)}>
                <Plus className="h-4 w-4 mr-2" />
                Create New
              </Link>
            </Button>
          </div>
          
          {/* Search */}
          <div className="px-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search prompts..." 
                className="pl-10 bg-background/50 border-white/10"
              />
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActiveRoute(item.path)
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-white/10 text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Logout */}
          <div className="mt-auto px-4 py-4 border-t border-white/10">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive" asChild>
              <Link to="/login">
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
