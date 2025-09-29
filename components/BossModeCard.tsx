import React from 'react';
import { Job } from '../types';
import { ExternalLinkIcon, FavoriteIcon, FavoriteSolidIcon, LinkedInIcon, NaukriIcon } from './Icons';

interface BossModeCardProps {
  job: Job;
  isFavorite: boolean;
  toggleFavorite: (jobId: string) => void;
  isApplied: boolean;
  onApply: (job: Job) => void;
}

const SourceIndicator: React.FC<{ source: string }> = ({ source }) => {
  let icon = null;
  if (source === 'LinkedIn') {
    icon = <LinkedInIcon className="w-5 h-5" />;
  } else if (source === 'Naukri') {
    icon = <NaukriIcon className="w-5 h-5" />;
  }

  return (
    <div className="flex items-center gap-1.5 text-xs font-bold text-white bg-black bg-opacity-50 px-2 py-1 rounded-full">
      {icon}
      <span>{source}</span>
    </div>
  );
};

export const BossModeCard: React.FC<BossModeCardProps> = ({ job, isFavorite, toggleFavorite, isApplied, onApply }) => {
  return (
    <div className="relative border-4 border-black dark:border-yellow-400 rounded-lg animate-pulse-strong">
      {/* Starburst background */}
      <div className="absolute inset-0 bg-yellow-300 dark:bg-yellow-600 overflow-hidden rounded-lg">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(252,211,77,1) 0%, rgba(239,68,68,1) 100%)',
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
          }}
        ></div>
      </div>
      
      <div className="relative bg-white dark:bg-gray-800 rounded-md m-1 h-full flex flex-col">
        <div className="p-4 bg-red-600 dark:bg-red-800 border-b-4 border-black dark:border-yellow-400 rounded-t-sm">
          <div className="flex justify-center items-center gap-4">
              <div className="font-bangers text-3xl text-white text-center" style={{ textShadow: '2px 2px #000' }}>
                HOT JOB!
              </div>
              <SourceIndicator source={job.source} />
          </div>
          <h3 className="font-bold text-xl text-white truncate text-center mt-1" title={job.title}>{job.title}</h3>
          <p className="text-red-200 dark:text-red-300 text-center">{job.company}</p>
        </div>
        
        <div className="p-4 flex-grow">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 text-center"><strong>Location:</strong> {job.location}</p>
          <div className="flex flex-wrap gap-2 mb-3 justify-center">
            {job.skills.map(skill => (
              <span key={skill} className="bg-gray-800 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full border-2 border-yellow-400">
                {skill}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Posted: {job.postedDate}</p>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-700 border-t-4 border-black dark:border-yellow-400 flex justify-between items-center rounded-b-sm">
          <button
            onClick={() => onApply(job)}
            disabled={isApplied}
            className={`flex items-center gap-2 font-bangers text-lg py-2 px-4 rounded-md transform transition-transform duration-200 border-b-4 active:scale-95 ${
              isApplied
                ? 'bg-gray-400 dark:bg-gray-600 border-gray-500 cursor-not-allowed text-gray-800 dark:text-gray-300'
                : 'bg-blue-500 hover:bg-blue-600 border-blue-700 hover:scale-105 text-white'
            }`}
          >
            {isApplied ? 'APPLIED' : 'PUNCH IN!'}
            {!isApplied && <ExternalLinkIcon className="w-4 h-4" />}
          </button>
          <button 
            onClick={() => toggleFavorite(job.id)} 
            className="p-2 rounded-full transform transition-transform hover:scale-125"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? <FavoriteSolidIcon className="w-8 h-8 text-red-500" /> : <FavoriteIcon className="w-8 h-8 text-gray-500 dark:text-gray-300" />}
          </button>
        </div>
      </div>
    </div>
  );
};