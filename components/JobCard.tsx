import React from 'react';
import { Job } from '../types';
import { ExternalLinkIcon, FavoriteIcon, FavoriteSolidIcon, LinkedInIcon, NaukriIcon } from './Icons';

interface JobCardProps {
  job: Job;
  isFavorite: boolean;
  toggleFavorite: (jobId: string) => void;
  isApplied: boolean;
  onApply: (job: Job) => void;
}

const SourceIndicator: React.FC<{ source: string }> = ({ source }) => {
  let icon = null;
  if (source === 'LinkedIn') {
    icon = <LinkedInIcon className="w-4 h-4" />;
  } else if (source === 'Naukri') {
    icon = <NaukriIcon className="w-4 h-4" />;
  }

  return (
    <div className="flex items-center gap-1.5 text-xs text-blue-100 dark:text-blue-200">
      {icon}
      <span>{source}</span>
    </div>
  );
};

export const JobCard: React.FC<JobCardProps> = ({ job, isFavorite, toggleFavorite, isApplied, onApply }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border-4 border-black dark:border-gray-400 h-full flex flex-col transform transition-transform duration-300 hover:-rotate-2 hover:scale-105">
      <div className="p-4 bg-blue-500 dark:bg-blue-800 border-b-4 border-black dark:border-gray-400 rounded-t-sm">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-xl text-white truncate" title={job.title}>{job.title}</h3>
            <p className="text-blue-200 dark:text-blue-300">{job.company}</p>
          </div>
          <SourceIndicator source={job.source} />
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3"><strong>Location:</strong> {job.location}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {job.skills.map(skill => (
            <span key={skill} className="bg-yellow-300 dark:bg-yellow-600 text-gray-800 dark:text-white text-xs font-semibold px-2.5 py-0.5 rounded-full border-2 border-black dark:border-yellow-400">
              {skill}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">Posted: {job.postedDate}</p>
      </div>

      <div className="p-4 bg-gray-100 dark:bg-gray-700 border-t-4 border-black dark:border-gray-400 flex justify-between items-center rounded-b-sm">
        <button
          onClick={() => onApply(job)}
          disabled={isApplied}
          className={`flex items-center gap-2 font-bold py-2 px-4 rounded-md transform transition-transform duration-200 border-b-4 active:scale-95 ${
            isApplied 
              ? 'bg-gray-400 dark:bg-gray-600 border-gray-500 cursor-not-allowed text-gray-800 dark:text-gray-300' 
              : 'bg-green-500 hover:bg-green-600 border-green-700 hover:scale-105 text-white'
          }`}
        >
          {isApplied ? 'APPLIED' : 'Instant Apply'}
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
  );
};