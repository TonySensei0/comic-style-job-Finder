import React from 'react';
import { BossModeIcon, CheckboxCheckedIcon, CheckboxIcon, RefreshIcon } from './Icons';

interface FilterControlsProps {
  locations: string[];
  skills: string[];
  sources: string[];
  locationFilter: string;
  setLocationFilter: (location: string) => void;
  skillFilter: string;
  setSkillFilter: (skill: string) => void;
  sourceFilter: string;
  setSourceFilter: (source: string) => void;
  isBossMode: boolean;
  setIsBossMode: (mode: boolean) => void;
  isAutoRefresh: boolean;
  setIsAutoRefresh: (mode: boolean) => void;
  hideApplied: boolean;
  setHideApplied: (mode: boolean) => void;
}

const CustomCheckbox: React.FC<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: React.ReactNode;
}> = ({ label, checked, onChange, icon }) => (
  <button
    onClick={() => onChange(!checked)}
    role="checkbox"
    aria-checked={checked}
    className="flex items-center gap-2 cursor-pointer group"
  >
    <div className="w-6 h-6 border-2 border-black dark:border-gray-400 rounded-md flex items-center justify-center bg-gray-100 dark:bg-gray-700 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800">
      {checked ? <CheckboxCheckedIcon className="w-5 h-5 text-green-500" /> : <CheckboxIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />}
    </div>
    <span className="font-bold select-none">{label}</span>
  </button>
);


export const FilterControls: React.FC<FilterControlsProps> = ({
  locations,
  skills,
  sources,
  locationFilter,
  setLocationFilter,
  skillFilter,
  setSkillFilter,
  sourceFilter,
  setSourceFilter,
  isBossMode,
  setIsBossMode,
  isAutoRefresh,
  setIsAutoRefresh,
  hideApplied,
  setHideApplied
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-2 border-black dark:border-gray-600 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="source-filter" className="block text-sm font-bold mb-2">
            Filter by Source
          </label>
          <select
            id="source-filter"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="w-full p-2 border-2 border-black dark:border-gray-500 rounded-md bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          >
            {sources.map(src => <option key={src} value={src}>{src === 'all' ? 'All Sources' : src}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="location-filter" className="block text-sm font-bold mb-2">
            Filter by Location
          </label>
          <select
            id="location-filter"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full p-2 border-2 border-black dark:border-gray-500 rounded-md bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          >
            {locations.map(loc => <option key={loc} value={loc}>{loc === 'all' ? 'All Locations' : loc}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="skill-filter" className="block text-sm font-bold mb-2">
            Filter by Skill
          </label>
          <select
            id="skill-filter"
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="w-full p-2 border-2 border-black dark:border-gray-500 rounded-md bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          >
            {skills.map(skill => <option key={skill} value={skill}>{skill === 'all' ? 'All Skills' : skill}</option>)}
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={() => setIsBossMode(!isBossMode)}
            className={`w-full flex justify-center items-center gap-2 font-bangers text-xl tracking-wider py-2 px-4 rounded-lg transform hover:scale-105 transition-transform duration-200 border-b-4 active:scale-95 ${
              isBossMode
                ? 'bg-red-500 hover:bg-red-600 border-red-700 text-white animate-shake'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 border-gray-500 dark:border-gray-800'
            }`}
          >
            <BossModeIcon className="w-6 h-6" />
            {isBossMode ? 'BOSS MODE: ON!' : 'Activate Boss Mode'}
          </button>
        </div>
      </div>
       <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-start">
          <CustomCheckbox 
            label="Auto-Refresh Feed" 
            checked={isAutoRefresh} 
            onChange={setIsAutoRefresh} 
          />
          <CustomCheckbox 
            label="Hide Applied Jobs" 
            checked={hideApplied} 
            onChange={setHideApplied} 
          />
        </div>
    </div>
  );
};