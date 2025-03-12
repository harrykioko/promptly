
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import GradientText from '../ui/GradientText';
import AnimatedBackground from '../ui/AnimatedBackground';

const Hero = () => {
  return (
    <section className="min-h-screen pt-32 pb-16 px-6 lg:px-12 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-promptly-blue/10 border border-promptly-blue/20">
              <span className="text-sm font-medium text-promptly-blue">
                AI-Native Prompt Management
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Organize & optimize your <GradientText>AI prompts</GradientText> with ease
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
              The central hub for AI developers to manage, version, and optimize prompts for LLMs and AI platforms.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                to="/signup"
                className="bg-gradient font-medium text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center"
              >
                Get started for free
              </Link>
              <Link
                to="/#features"
                className="font-medium border border-input bg-white/50 hover:bg-white transition-colors px-6 py-3 rounded-lg flex items-center justify-center"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <AnimatedBackground className="rounded-2xl aspect-[4/3] overflow-hidden shadow-2xl">
              <div className="p-8 h-full flex flex-col">
                <div className="glass rounded-xl p-4 mb-4 shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-white text-sm font-mono">
                    <div className="mb-1">// GPT-4 prompt template</div>
                    <div className="bg-white/10 p-2 rounded-md">
                      <div className="text-promptly-light-blue">You are a fullstack developer helping with React code.</div>
                      <div className="text-promptly-light-purple mt-1">Please review this component and suggest improvements:</div>
                    </div>
                  </div>
                </div>
                
                <div className="glass-dark rounded-xl p-4 mt-2 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-white text-xs font-medium">Version History</div>
                    <div className="text-white/60 text-xs">Latest: 2 hours ago</div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white/10 p-2 rounded-md flex justify-between">
                      <span className="text-white/90 text-xs">v1.3</span>
                      <span className="text-white/60 text-xs">Current</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-md flex justify-between">
                      <span className="text-white/70 text-xs">v1.2</span>
                      <span className="text-white/40 text-xs">Yesterday</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto flex justify-end">
                  <div className="glass rounded-lg px-3 py-1.5 text-sm text-white/90 font-medium shadow-sm">
                    Copy prompt
                  </div>
                </div>
              </div>
            </AnimatedBackground>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
