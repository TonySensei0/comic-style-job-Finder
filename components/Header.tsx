
import React from 'react';
import { MoonIcon, SunIcon } from './Icons';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="bg-yellow-400 dark:bg-indigo-800 shadow-lg border-b-4 border-black dark:border-yellow-400">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="font-bangers text-3xl md:text-5xl text-gray-900 dark:text-white tracking-widest" style={{ textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000' }}>
          Comic Job Finder
        </h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-900 text-yellow-400 dark:bg-yellow-400 dark:text-gray-900 transform transition-transform duration-300 hover:scale-125 focus:outline-none"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
};
