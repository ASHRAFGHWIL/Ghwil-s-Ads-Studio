
import React from 'react';
import { SparklesIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6">
      <div className="flex items-center justify-center text-center">
        <SparklesIcon className="w-8 h-8 text-purple-400 mr-3" />
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Ghwil’s Ads Studio
        </h1>
      </div>
        <p className="text-center text-gray-400 mt-2 text-sm sm:text-base">Transform your product photos into professional ads with AI</p>
    </header>
  );
};

export default Header;
