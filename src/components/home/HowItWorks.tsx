
import React from 'react';
import { UserPlus, FileText, Tag, Copy, Sparkles } from 'lucide-react';
import GradientText from '../ui/GradientText';
import GlassCard from '../ui/GlassCard';
import { cn } from '@/lib/utils';

const steps = [
  {
    icon: UserPlus,
    title: 'Sign Up',
    description: 'Create an account with your email or using social logins like Google or GitHub.',
    color: 'bg-blue-100'
  },
  {
    icon: FileText,
    title: 'Create Prompts',
    description: 'Start writing and storing your AI prompts in a centralized, secure location.',
    color: 'bg-purple-100'
  },
  {
    icon: Tag,
    title: 'Organize & Tag',
    description: 'Add tags to categorize prompts and group them into templates for easy access.',
    color: 'bg-indigo-100'
  },
  {
    icon: Sparkles,
    title: 'Optimize',
    description: 'Get AI-powered suggestions to improve your prompts for better results.',
    color: 'bg-cyan-100'
  },
  {
    icon: Copy,
    title: 'Use Anywhere',
    description: 'Copy prompts with one click and use them in any AI platform or model.',
    color: 'bg-emerald-100'
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-6 lg:px-12 bg-gradient-to-b from-white to-blue-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-promptly-blue/10 border border-promptly-blue/20">
            <span className="text-sm font-medium text-promptly-blue">
              Simple Process
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <GradientText>Promptly</GradientText> works
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes and transform how you work with AI prompts
          </p>
        </div>
        
        <div className="flex flex-col space-y-8 md:space-y-0 md:space-x-4 md:flex-row">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="flex-1 opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <StepCard 
                step={index + 1}
                icon={step.icon}
                title={step.title}
                description={step.description}
                iconColor={step.color}
                isLast={index === steps.length - 1}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface StepCardProps {
  step: number;
  icon: React.FC<any>;
  title: string;
  description: string;
  iconColor: string;
  isLast: boolean;
}

const StepCard = ({ step, icon: Icon, title, description, iconColor, isLast }: StepCardProps) => {
  return (
    <div className="relative h-full">
      <GlassCard className="h-full flex flex-col items-center text-center relative z-10">
        <div className={cn(
          "flex items-center justify-center w-12 h-12 rounded-full mb-4",
          iconColor
        )}>
          <Icon className="w-6 h-6 text-gray-800" />
        </div>
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient font-semibold text-white flex items-center justify-center text-sm">
          {step}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </GlassCard>
      
      {!isLast && (
        <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-0">
          <div className="w-8 h-0.5 bg-gradient"></div>
        </div>
      )}
    </div>
  );
};

export default HowItWorks;
