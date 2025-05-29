import React from 'react';
import Link from 'next/link';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, external = false }) => {
  const linkClass = "text-gray-300 hover:text-yellow-300 transition-all duration-300 font-medium relative group";
  
  const linkContent = (
    <>
      {children}
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </>
  );

  if (external) {
    return (
      <a 
        href={href} 
        className={linkClass}
        target="_blank" 
        rel="noopener noreferrer"
      >
        {linkContent}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClass}>
      {linkContent}
    </Link>
  );
};

const SocialIcon: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ 
  href, 
  icon, 
  label 
}) => {
  return (
    <a
      href={href}
      className="w-12 h-12 bg-teal-700 hover:bg-teal-600 rounded-xl flex items-center justify-center text-white hover:text-yellow-300 transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <div className="transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
    </a>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-800 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg transform rotate-12 mr-3"></div>
              <span className="text-2xl font-bold">Hirings</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Connecting the best talent with amazing opportunities. Find your perfect match in our thriving community of professionals and innovative companies.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <SocialIcon
                href="https://twitter.com"
                label="Follow us on Twitter"
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                }
              />
              <SocialIcon
                href="https://linkedin.com"
                label="Connect on LinkedIn"
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                }
              />
              <SocialIcon
                href="https://facebook.com"
                label="Like us on Facebook"
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                }
              />
              <SocialIcon
                href="https://instagram.com"
                label="Follow us on Instagram"
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988c6.62 0 11.987-5.367 11.987-11.988C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348S9.746 16.988 8.449 16.988z"/>
                  </svg>
                }
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-yellow-300">Quick Links</h3>
            <ul className="space-y-4">
              <li><FooterLink href="/">Home</FooterLink></li>
              <li><FooterLink href="/features">Features</FooterLink></li>
              <li><FooterLink href="/pricing">Pricing</FooterLink></li>
              <li><FooterLink href="/about">About Us</FooterLink></li>
              <li><FooterLink href="/careers">Careers</FooterLink></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-yellow-300">Support</h3>
            <ul className="space-y-4">
              <li><FooterLink href="/help">Help Center</FooterLink></li>
              <li><FooterLink href="/contact">Contact Us</FooterLink></li>
              <li><FooterLink href="/privacy">Privacy Policy</FooterLink></li>
              <li><FooterLink href="/terms">Terms of Service</FooterLink></li>
              <li><FooterLink href="/cookies">Cookie Policy</FooterLink></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-8 border-t border-teal-700">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">Get the latest updates on new features and opportunities.</p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-teal-700 border border-teal-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
              />
              <button className="bg-yellow-300 hover:bg-yellow-400 text-teal-800 font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-teal-700 bg-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              © 2025 Hirings. All rights reserved. Made with ❤️ for the community.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-gray-300">🌍 Available worldwide</span>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-gray-300">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;