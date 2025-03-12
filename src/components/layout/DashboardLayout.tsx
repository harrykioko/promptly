
import React from 'react';
import Sidebar from './Sidebar';
import { User, Bell, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import GradientText from '../ui/GradientText';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Top Nav */}
        <header className="sticky top-0 z-30 glass border-b border-white/10 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center md:hidden">
            <Link to="/dashboard">
              <GradientText as="h1" className="text-xl font-bold">Promptly</GradientText>
            </Link>
          </div>
          
          <h1 className="text-xl font-semibold hidden md:block">{title}</h1>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link to="/notifications">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link to="/profile">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Link>
            </Button>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
