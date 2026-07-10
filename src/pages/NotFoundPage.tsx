import React from 'react';
import { PackageOpen, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onNavigateHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 animate-bounce">
        <PackageOpen className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
          Destination Lost (404)
        </h2>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          The dashboard package you are looking for has been routed to an unregistered route or does not exist.
        </p>
      </div>

      <button
        onClick={onNavigateHome}
        className="inline-flex items-center gap-2 bg-brand-blue-900 dark:bg-brand-orange-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Home Station
      </button>
    </div>
  );
};
export default NotFoundPage;
