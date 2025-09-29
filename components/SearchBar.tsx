
import React from 'react';
import { SearchIcon } from './Icons';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative my-6 group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-lg p-1 border-2 border-black dark:border-gray-400">
        <div className="pl-4 pr-2">
          <SearchIcon className="w-8 h-8 text-gray-500 dark:text-gray-300" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Scan for jobs or companies..."
          className="w-full bg-transparent text-xl md:text-2xl p-3 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
        />
      </div>
    </div>
  );
};
