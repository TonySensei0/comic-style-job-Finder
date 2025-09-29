import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Job } from './types';
import { fetchJobs } from './services/jobService';
import { Header } from './components/Header';
import { FilterControls } from './components/FilterControls';
import { JobList } from './components/JobList';
import { SearchBar } from './components/SearchBar';
import { useTheme } from './hooks/useTheme';
import { ApplicationModal } from './components/ApplicationModal';
import { DownloadIcon, LoaderIcon, RefreshIcon } from './components/Icons';

const REFRESH_INTERVAL = 30000; // 30 seconds

const App: React.FC = () => {
  const [theme, toggleTheme] = useTheme();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [skillFilter, setSkillFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [isBossMode, setIsBossMode] = useState<boolean>(false);
  const [isAutoRefresh, setIsAutoRefresh] = useState<boolean>(true);
  const [hideApplied, setHideApplied] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalJob, setModalJob] = useState<Job | null>(null);
  const [timeToNextRefresh, setTimeToNextRefresh] = useState(REFRESH_INTERVAL / 1000);

  const getJobs = useCallback(async () => {
    setIsLoading(true);
    const fetchedJobs = await fetchJobs();
    setJobs(fetchedJobs);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isAutoRefresh) {
      timer = setInterval(() => {
        getJobs();
        setTimeToNextRefresh(REFRESH_INTERVAL / 1000);
      }, REFRESH_INTERVAL);
    }
    return () => clearInterval(timer);
  }, [isAutoRefresh, getJobs]);

  useEffect(() => {
     let countdown: ReturnType<typeof setInterval>;
     if(isAutoRefresh) {
       countdown = setInterval(() => {
         setTimeToNextRefresh(prev => (prev > 0 ? prev - 1 : 0));
       }, 1000);
     }
     return () => clearInterval(countdown);
  }, [isAutoRefresh]);

  const toggleFavorite = (jobId: string) => {
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(jobId)) {
        newFavs.delete(jobId);
      } else {
        newFavs.add(jobId);
      }
      return newFavs;
    });
  };
  
  const handleApplyClick = (job: Job) => {
    setModalJob(job);
    setIsModalOpen(true);
  };

  const confirmApplication = () => {
    if (modalJob) {
      setAppliedJobs(prev => new Set(prev).add(modalJob.id));
      window.open(modalJob.url, '_blank', 'noopener,noreferrer');
    }
    setIsModalOpen(false);
    setModalJob(null);
  };

  const filteredJobs = useMemo(() => {
    return jobs
      .filter(job => !hideApplied || !appliedJobs.has(job.id))
      .filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(job => locationFilter === 'all' || job.location === locationFilter)
      .filter(job => skillFilter === 'all' || job.skills.includes(skillFilter))
      .filter(job => sourceFilter === 'all' || job.source === sourceFilter);
  }, [jobs, searchTerm, locationFilter, skillFilter, sourceFilter, hideApplied, appliedJobs]);

  const uniqueLocations = useMemo(() => ['all', ...Array.from(new Set(jobs.map(j => j.location)))], [jobs]);
  const uniqueSkills = useMemo(() => ['all', ...Array.from(new Set(jobs.flatMap(j => j.skills)))], [jobs]);
  const uniqueSources = useMemo(() => ['all', ...Array.from(new Set(jobs.map(j => j.source)))], [jobs]);

  const downloadAsCSV = () => {
    const headers = "Title,Company,Location,Skills,Source,URL\n";
    const csvContent = filteredJobs.map(j => 
      `"${j.title}","${j.company}","${j.location}","${j.skills.join('; ')}","${j.source}","${j.url}"`
    ).join("\n");
    
    const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "job_listings.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="container mx-auto p-4 md:p-8">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterControls
            locations={uniqueLocations}
            skills={uniqueSkills}
            sources={uniqueSources}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            skillFilter={skillFilter}
            setSkillFilter={setSkillFilter}
            sourceFilter={sourceFilter}
            setSourceFilter={setSourceFilter}
            isBossMode={isBossMode}
            setIsBossMode={setIsBossMode}
            isAutoRefresh={isAutoRefresh}
            setIsAutoRefresh={setIsAutoRefresh}
            hideApplied={hideApplied}
            setHideApplied={setHideApplied}
          />
          
          <div className="flex flex-wrap justify-end items-center gap-4 my-4">
             <div className="text-sm font-bold bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 rounded-lg p-2 shadow-sm">
                Auto-Refresh: {isAutoRefresh ? `ON (Next in ${timeToNextRefresh}s)` : 'OFF'}
             </div>
             <button
              onClick={getJobs}
              disabled={isLoading}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transform hover:scale-105 transition-transform duration-200 border-b-4 border-blue-700 hover:border-blue-800 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`}/>
              {isLoading ? 'Refreshing...' : 'Refresh Now'}
            </button>
            <button
              onClick={downloadAsCSV}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transform hover:scale-105 transition-transform duration-200 border-b-4 border-green-700 hover:border-green-800 active:scale-95"
            >
              <DownloadIcon className="w-5 h-5" />
              Download as CSV
            </button>
          </div>

          {isLoading && jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <LoaderIcon className="w-16 h-16 animate-spin text-yellow-400" />
              <p className="font-bangers text-4xl mt-4 tracking-wider">Loading Jobs...</p>
            </div>
          ) : (
            <JobList 
              jobs={filteredJobs} 
              favorites={favorites} 
              toggleFavorite={toggleFavorite} 
              isBossMode={isBossMode}
              appliedJobs={appliedJobs}
              onApply={handleApplyClick}
            />
          )}
        </main>
        <ApplicationModal 
          isOpen={isModalOpen}
          job={modalJob}
          onConfirm={confirmApplication}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default App;