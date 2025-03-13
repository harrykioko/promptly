
import React from 'react';
import { Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GlassCard from '@/components/ui/GlassCard';

interface CodingPreferencesProps {
  preferredLanguages: string;
  frameworks: string;
  tools: string;
  setPreferredLanguages: (value: string) => void;
  setFrameworks: (value: string) => void;
  setTools: (value: string) => void;
  onSave: () => void;
  isUpdating: boolean;
}

const CodingPreferences: React.FC<CodingPreferencesProps> = ({
  preferredLanguages,
  frameworks,
  tools,
  setPreferredLanguages,
  setFrameworks,
  setTools,
  onSave,
  isUpdating
}) => {
  return (
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
            onClick={onSave}
            disabled={isUpdating}
          >
            {isUpdating ? 'Saving...' : 'Save Preferences'}
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};

export default CodingPreferences;
