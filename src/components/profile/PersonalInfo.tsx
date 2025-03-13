
import React from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GlassCard from '@/components/ui/GlassCard';
import { useUser } from '@/hooks/use-user';

interface PersonalInfoProps {
  fullName: string;
  role: string;
  company: string;
  setFullName: (value: string) => void;
  setRole: (value: string) => void;
  setCompany: (value: string) => void;
  onSave: () => void;
  isUpdating: boolean;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  fullName,
  role,
  company,
  setFullName,
  setRole,
  setCompany,
  onSave,
  isUpdating
}) => {
  const { user } = useUser();

  return (
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
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input 
              id="email" 
              type="email" 
              value={user?.email || ''}
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
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium">
              Company
            </label>
            <Input 
              id="company" 
              placeholder="Your company" 
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            className="bg-gradient" 
            onClick={onSave}
            disabled={isUpdating}
          >
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};

export default PersonalInfo;
