import React from 'react';
import { Job } from '../types';
import { CloseIcon, RocketIcon } from './Icons';

interface ApplicationModalProps {
  isOpen: boolean;
  job: Job | null;
  onConfirm: () => void;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, job, onConfirm, onClose }) => {
  if (!isOpen || !job) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border-4 border-black dark:border-yellow-400 w-full max-w-md transform transition-all animate-pop-in">
        <div className="p-4 bg-red-500 dark:bg-red-800 border-b-4 border-black dark:border-yellow-400 rounded-t-sm flex justify-between items-center">
          <h2 className="font-bangers text-3xl text-white" style={{ textShadow: '2px 2px #000' }}>Confirm Application!</h2>
          <button onClick={onClose} className="p-1 rounded-full text-white hover:bg-red-600 dark:hover:bg-red-700" aria-label="Close modal">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 text-center">
          <p className="text-lg mb-2">You're about to apply for:</p>
          <p className="font-bold text-2xl text-blue-600 dark:text-blue-400">{job.title}</p>
          <p className="text-md text-gray-600 dark:text-gray-300">at</p>
          <p className="font-bold text-xl mb-4">{job.company}</p>
          <p className="text-sm text-gray-500">This will open the application page in a new tab.</p>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-700 border-t-4 border-black dark:border-yellow-400 flex justify-center gap-4 rounded-b-sm">
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-6 rounded-md transform hover:scale-105 transition-transform duration-200 border-b-4 border-gray-600 active:scale-95"
          >
            Maybe Later...
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bangers text-xl py-2 px-6 rounded-md transform hover:scale-105 transition-transform duration-200 border-b-4 border-green-700 active:scale-95"
          >
            <RocketIcon className="w-6 h-6" />
            Launch!
          </button>
        </div>
      </div>
    </div>
  );
};