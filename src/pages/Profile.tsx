
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  User, 
  Mail, 
  Github, 
  Laptop, 
  Languages, 
  Key, 
  UserCog,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GlassCard from '@/components/ui/GlassCard';
import { useProfile } from '@/hooks/use-profile';
import { useUser } from '@/hooks/use-user';
import { toast } from 'sonner';

const Profile = () => {
  const { user, signOut } = useUser();
  const { profile, isLoading, updateProfile, isUpdating } = useProfile();
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [preferredLanguages, setPreferredLanguages] = useState('');
  const [frameworks, setFrameworks] = useState('');
  const [tools, setTools] = useState('');
  
  // Initialize form with profile data when loaded
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      
      // Extract personal data from personal_notes (stored as JSON)
      try {
        if (profile.personal_notes) {
          const personalData = JSON.parse(profile.personal_notes);
          setRole(personalData.role || '');
          setCompany(personalData.company || '');
          setFrameworks(personalData.frameworks || '');
          setTools(personalData.tools || '');
        }
      } catch (error) {
        console.error('Error parsing personal notes:', error);
      }
      
      // Convert array to comma separated string
      if (profile.preferred_languages) {
        setPreferredLanguages(profile.preferred_languages.join(', '));
      }
    }
  }, [profile]);
  
  const handlePersonalInfoSave = () => {
    updateProfile({
      full_name: fullName,
      personal_notes: JSON.stringify({
        role,
        company,
        frameworks,
        tools
      })
    });
  };
  
  const handleCodingPreferencesSave = () => {
    // Convert comma separated string to array
    const languages = preferredLanguages
      .split(',')
      .map(lang => lang.trim())
      .filter(Boolean);
    
    updateProfile({
      preferred_languages: languages
    });
  };
  
  const handleDeleteAccount = () => {
    // For now, just show a toast
    toast.error('This feature is not implemented yet');
  };
  
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
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
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
                    onClick={handlePersonalInfoSave}
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </Button>
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
                      value={preferredLanguages}
                      onChange={(e) => setPreferredLanguages(e.target.value)}
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
                      value={frameworks}
                      onChange={(e) => setFrameworks(e.target.value)}
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
                    value={tools}
                    onChange={(e) => setTools(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Tools you commonly use in your workflow
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    className="bg-gradient" 
                    onClick={handleCodingPreferencesSave}
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Saving...' : 'Save Preferences'}
                  </Button>
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
                  <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
                </div>
              </div>
            </GlassCard>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Profile;
