
import React from 'react';
import { Link } from 'react-router-dom';
import GradientText from '../ui/GradientText';

const Footer = () => {
  return (
    <footer className="py-12 px-6 lg:px-12 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <GradientText as="h1" className="text-2xl font-bold">Promptly</GradientText>
            </Link>
            <p className="text-muted-foreground mb-4">
              Streamline your AI prompting workflow with Promptly's powerful management tools.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/#features" className="text-muted-foreground hover:text-promptly-blue transition-colors">Features</Link></li>
              <li><Link to="/#how-it-works" className="text-muted-foreground hover:text-promptly-blue transition-colors">How it works</Link></li>
              <li><Link to="/#pricing" className="text-muted-foreground hover:text-promptly-blue transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/docs" className="text-muted-foreground hover:text-promptly-blue transition-colors">Documentation</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-promptly-blue transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-promptly-blue transition-colors">Contact us</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/terms" className="text-muted-foreground hover:text-promptly-blue transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-promptly-blue transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-2 md:mb-0">
              © {new Date().getFullYear()} Promptly. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-promptly-blue transition-colors">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-promptly-blue transition-colors">
                GitHub
              </a>
              <a href="#" className="text-muted-foreground hover:text-promptly-blue transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
