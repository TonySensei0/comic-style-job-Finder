import React from 'react';
import { Job } from '../types';
import { JobCard } from './JobCard';
import { BossModeCard } from './BossModeCard';

interface JobListProps {
  jobs: Job[];
  favorites: Set<string>;
  toggleFavorite: (jobId: string) => void;
  isBossMode: boolean;
  appliedJobs: Set<string>;
  onApply: (job: Job) => void;
}

export const JobList: React.FC<JobListProps> = ({ jobs, favorites, toggleFavorite, isBossMode, appliedJobs, onApply }) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-16 border-4 border-dashed border-gray-400 dark:border-gray-600 rounded-lg">
        <p className="font-bangers text-5xl text-gray-500">ZAP!</p>
        <p className="text-xl mt-2">No jobs found matching your heroic criteria.</p>
      </div>
    );
  }

  const hotJobs = jobs.filter(j => j.isHot);
  const otherJobs = jobs.filter(j => !j.isHot);

  return (
    <div>
      {isBossMode && hotJobs.length > 0 && (
        <div className="mb-8">
          <h2 className="font-bangers text-4xl text-center mb-4 text-red-500 dark:text-red-400" style={{ textShadow: '2px 2px #000' }}>
            !!! JOB BOSS MODE !!!
          </h2>
          <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-3">
            {hotJobs.map(job => (
              <BossModeCard
                key={job.id}
                job={job}
                isFavorite={favorites.has(job.id)}
                toggleFavorite={toggleFavorite}
                isApplied={appliedJobs.has(job.id)}
                onApply={onApply}
              />
            ))}
          </div>
          <hr className="my-8 border-t-4 border-dashed border-black dark:border-gray-500" />
        </div>
      )}

      <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {(isBossMode ? otherJobs : jobs).map((job, index) => (
          <div key={job.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-pop-in">
             <JobCard
              job={job}
              isFavorite={favorites.has(job.id)}
              toggleFavorite={toggleFavorite}
              isApplied={appliedJobs.has(job.id)}
              onApply={onApply}
            />
          </div>
        ))}
      </div>
    </div>
  );
};