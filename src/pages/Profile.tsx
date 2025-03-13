
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';
import { useProfile } from '@/hooks/use-profile';
import { useUser } from '@/hooks/use-user';

// Import the refactored components
import PersonalInfo from '@/components/profile/PersonalInfo';
import CodingPreferences from '@/components/profile/CodingPreferences';
import AccountSecurity from '@/components/profile/AccountSecurity';
import AccountManagement from '@/components/profile/AccountManagement';
import ProfileLoading from '@/components/profile/ProfileLoading';

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
          <ProfileLoading />
        ) : (
          <>
            <PersonalInfo 
              fullName={fullName}
              role={role}
              company={company}
              setFullName={setFullName}
              setRole={setRole}
              setCompany={setCompany}
              onSave={handlePersonalInfoSave}
              isUpdating={isUpdating}
            />
            
            <CodingPreferences 
              preferredLanguages={preferredLanguages}
              frameworks={frameworks}
              tools={tools}
              setPreferredLanguages={setPreferredLanguages}
              setFrameworks={setFrameworks}
              setTools={setTools}
              onSave={handleCodingPreferencesSave}
              isUpdating={isUpdating}
            />
            
            <AccountSecurity />
            
            <AccountManagement onDeleteAccount={handleDeleteAccount} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Profile;
