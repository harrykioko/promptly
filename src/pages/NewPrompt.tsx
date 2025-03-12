
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PromptForm from '@/components/prompts/PromptForm';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/components/ui/GlassCard';

const NewPrompt = () => {
  const navigate = useNavigate();
  
  const handleSavePrompt = (promptData: {
    title: string;
    content: string;
    tags: string[];
  }) => {
    // Here you would typically save the prompt to your backend
    console.log('Saving prompt:', promptData);
    
    // Show success message
    toast.success('Your prompt has been created!');
    
    // Navigate back to prompts list
    navigate('/prompts');
  };
  
  return (
    <DashboardLayout title="Create New Prompt">
      <div className="space-y-8 max-w-5xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold mb-2">Create New Prompt</h1>
          <p className="text-muted-foreground">
            Design a powerful prompt with AI assistance
          </p>
        </div>
        
        <GlassCard>
          <PromptForm onSave={handleSavePrompt} />
        </GlassCard>

        <div className="bg-blue-50/30 border border-blue-100 rounded-xl p-6">
          <h3 className="text-lg font-medium text-blue-800 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
            Tips for effective prompts
          </h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Be specific about what you want the AI to do</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Provide context and examples when possible</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Break complex tasks into smaller steps</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Define the format you want the response in</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Use clear, concise language</span>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewPrompt;
