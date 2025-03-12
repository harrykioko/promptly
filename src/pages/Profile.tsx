
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  User, 
  Mail, 
  Github, 
  Laptop, 
  Languages, 
  Key, 
  UserCog 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GlassCard from '@/components/ui/GlassCard';

const Profile = () => {
  return (
    <DashboardLayout title="Profile">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>
        
        {/* Profile Information */}
        <GlassCard>
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <User className="mr-2 h-5 w-5" />
            Personal Information
          </h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input 
                  id="name" 
                  placeholder="Your name" 
                  defaultValue="Alex Johnson"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Your email" 
                  defaultValue="alex@example.com"
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <Input 
                  id="role" 
                  placeholder="Your role" 
                  defaultValue="Full-Stack Developer"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Company
                </label>
                <Input 
                  id="company" 
                  placeholder="Your company" 
                  defaultValue="TechCorp"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button className="bg-gradient">Save Changes</Button>
            </div>
          </div>
        </GlassCard>
        
        {/* Coding Preferences */}
        <GlassCard>
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Laptop className="mr-2 h-5 w-5" />
            Coding Preferences
          </h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="languages" className="text-sm font-medium">
                  Preferred Languages
                </label>
                <Input 
                  id="languages" 
                  placeholder="e.g., JavaScript, Python, Go" 
                  defaultValue="TypeScript, JavaScript, Python"
                />
                <p className="text-xs text-muted-foreground">
                  Comma separated list
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="frameworks" className="text-sm font-medium">
                  Frameworks & Libraries
                </label>
                <Input 
                  id="frameworks" 
                  placeholder="e.g., React, Next.js, Express" 
                  defaultValue="React, Next.js, Node.js, Express"
                />
                <p className="text-xs text-muted-foreground">
                  Comma separated list
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="tools" className="text-sm font-medium">
                Development Tools
              </label>
              <Input 
                id="tools" 
                placeholder="e.g., VS Code, Docker, Git" 
                defaultValue="VS Code, Docker, Git, GitHub"
              />
              <p className="text-xs text-muted-foreground">
                Tools you commonly use in your workflow
              </p>
            </div>
            
            <div className="flex justify-end">
              <Button className="bg-gradient">Save Preferences</Button>
            </div>
          </div>
        </GlassCard>
        
        {/* Account Security */}
        <GlassCard>
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Key className="mr-2 h-5 w-5" />
            Account Security
          </h2>
          
          <div className="space-y-6">
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="font-medium mb-2">Change Password</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ensure your account is using a strong password for better security.
              </p>
              <Button variant="outline">Update Password</Button>
            </div>
            
            <div className="p-4 bg-secondary/10 rounded-lg">
              <h3 className="font-medium mb-2">Connected Accounts</h3>
              <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Github className="h-5 w-5 mr-3" />
                    <div>
                      <p className="font-medium">GitHub</p>
                      <p className="text-xs text-muted-foreground">Connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3" />
                    <div>
                      <p className="font-medium">Google</p>
                      <p className="text-xs text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
        
        {/* Account Management */}
        <GlassCard className="border-destructive/20">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <UserCog className="mr-2 h-5 w-5" />
            Account Management
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-destructive/10 rounded-lg">
              <h3 className="font-medium mb-2 text-destructive">Danger Zone</h3>
              <p className="text-sm text-muted-foreground mb-4">
                These actions are irreversible. Please proceed with caution.
              </p>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
