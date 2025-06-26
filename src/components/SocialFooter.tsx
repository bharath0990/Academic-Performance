import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';
import React from 'react';

const SocialFooter: React.FC = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/bharath0990',
      color: 'hover:text-gray-900'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://x.com/BharathReddy224',
      color: 'hover:text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/bharath0990',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/p.bharathreddyy_/',
      color: 'hover:text-pink-500'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:padakantibharath82@gmail.com',
      color: 'hover:text-red-500'
    }
  ];

  return (
    <footer className="mt-16 border-t border-gray-200 pt-8 pb-6">
      <div className="text-center">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect With Us</h3>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-600 ${social.color} transition-all duration-300 transform hover:scale-110`}
                  aria-label={social.name}
                >
                  <IconComponent className="w-6 h-6" />
                </a>
              );
            })}
          </div>
        </div>
        
        <div className="text-sm text-gray-500 space-y-2">
          <p>© 2025 Academic Calculator. Made with ❤️ for students.</p>
          <p className="text-xs">
            Calculate your CGPA and track attendance with ease
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SocialFooter;