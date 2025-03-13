
import React from 'react';
import { Key, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';

const AccountSecurity: React.FC = () => {
  return (
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
  );
};

export default AccountSecurity;
