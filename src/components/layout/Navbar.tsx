
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import GradientText from '../ui/GradientText';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 py-4 px-6 lg:px-12",
        isScrolled ? "glass shadow-sm backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <GradientText as="h1" className="text-2xl font-bold">Promptly</GradientText>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="font-medium hover:text-promptly-blue transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="bg-gradient font-medium text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Sign up
            </Link>
          </div>
        </div>
        
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden glass mt-2 p-4 rounded-lg mx-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <MobileNavLinks closeMenu={() => setIsMenuOpen(false)} />
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Link
                to="/login"
                className="font-medium hover:text-promptly-blue transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="bg-gradient font-medium text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLinks = () => {
  return (
    <>
      <Link to="/#features" className="font-medium hover:text-promptly-blue transition-colors">
        Features
      </Link>
      <Link to="/#how-it-works" className="font-medium hover:text-promptly-blue transition-colors">
        How it works
      </Link>
      <Link to="/#pricing" className="font-medium hover:text-promptly-blue transition-colors">
        Pricing
      </Link>
    </>
  );
};

const MobileNavLinks = ({ closeMenu }: { closeMenu: () => void }) => {
  return (
    <>
      <Link 
        to="/#features" 
        className="font-medium hover:text-promptly-blue transition-colors py-2"
        onClick={closeMenu}
      >
        Features
      </Link>
      <Link 
        to="/#how-it-works" 
        className="font-medium hover:text-promptly-blue transition-colors py-2"
        onClick={closeMenu}
      >
        How it works
      </Link>
      <Link 
        to="/#pricing" 
        className="font-medium hover:text-promptly-blue transition-colors py-2"
        onClick={closeMenu}
      >
        Pricing
      </Link>
    </>
  );
};

export default Navbar;
