
import React from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
