
import React from 'react';
import { UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';

interface AccountManagementProps {
  onDeleteAccount: () => void;
}

const AccountManagement: React.FC<AccountManagementProps> = ({ onDeleteAccount }) => {
  return (
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
          <Button variant="destructive" onClick={onDeleteAccount}>Delete Account</Button>
        </div>
      </div>
    </GlassCard>
  );
};

export default AccountManagement;
