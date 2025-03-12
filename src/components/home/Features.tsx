
import React from 'react';
import { Database, History, Tag, Copy, Layers, Sparkles } from 'lucide-react';
import GradientText from '../ui/GradientText';
import FeatureCard from '../features/FeatureCard';

const Features = () => {
  const features = [
    {
      icon: Database,
      title: 'Centralized Storage',
      description: 'Store all your AI prompts in one secure, organized location with cloud synchronization.'
    },
    {
      icon: History,
      title: 'Version Control',
      description: 'Track changes to your prompts over time and easily revert to previous versions when needed.'
    },
    {
      icon: Tag,
      title: 'Smart Tagging',
      description: 'Organize prompts with flexible tagging system for quick access and efficient categorization.'
    },
    {
      icon: Copy,
      title: 'One-Click Copy',
      description: 'Copy any prompt with a single click for seamless integration into your workflow.'
    },
    {
      icon: Layers,
      title: 'Template Management',
      description: 'Group related prompts into templates for complex AI interactions and multi-step processes.'
    },
    {
      icon: Sparkles,
      title: 'AI Optimization',
      description: 'Get intelligent suggestions to improve your prompts powered by GPT-4o and Claude.'
    }
  ];

  return (
    <section id="features" className="py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-promptly-purple/10 border border-promptly-purple/20">
            <span className="text-sm font-medium text-promptly-purple">
              Powerful Features
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to <GradientText>master prompts</GradientText>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Promptly offers a complete toolkit for AI developers to create, organize, and optimize prompts for any language model.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
