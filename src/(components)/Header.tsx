'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded transform rotate-12"></div>
              <span className="text-xl font-semibold text-gray-900">Trovia.ng</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-900 font-medium hover:text-gray-700 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/pricing" 
              className="text-gray-500 font-medium hover:text-gray-700 transition-colors"
            >
              Pricing
            </Link>
            <Link 
              href="/features" 
              className="text-gray-500 font-medium hover:text-gray-700 transition-colors"
            >
              Features
            </Link>
            <div className="relative group">
              <button className="flex items-center text-gray-500 font-medium hover:text-gray-700 transition-colors">
                Use Case
                <svg 
                  className="ml-1 w-4 h-4 transform group-hover:rotate-180 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-gray-700 font-medium hover:text-gray-900 transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-100"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-gray-900 font-medium hover:text-gray-700 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
                <Link
                  href="/pricing"
                  className="text-gray-500 font-medium hover:text-gray-700 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Pricing
                </Link>
                <Link
                  href="/features"
                  className="text-gray-500 font-medium hover:text-gray-700 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Features
                </Link>
                <button
                  className="flex items-center text-gray-500 font-medium hover:text-gray-700 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Use Case
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200">
                  <Link
                    href="/login"
                    className="text-gray-700 font-medium hover:text-gray-900 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-medium px-6 py-2 rounded-lg transition-colors text-center"
                    onClick={toggleMobileMenu}
                  >
                    Sign up
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;