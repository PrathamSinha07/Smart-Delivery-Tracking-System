import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStyles = () => {
    switch (status.trim().toLowerCase()) {
      case 'delivered':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/30',
          text: 'text-emerald-700 dark:text-emerald-400',
          dot: 'bg-emerald-500',
          pulse: false
        };
      case 'in transit':
        return {
          bg: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/30',
          text: 'text-blue-700 dark:text-blue-400',
          dot: 'bg-blue-500',
          pulse: true
        };
      case 'out for delivery':
        return {
          bg: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800/30',
          text: 'text-purple-700 dark:text-purple-400',
          dot: 'bg-purple-500',
          pulse: true
        };
      case 'delayed':
        return {
          bg: 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/30',
          text: 'text-rose-700 dark:text-rose-400',
          dot: 'bg-rose-500',
          pulse: true
        };
      case 'packed':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/30',
          text: 'text-amber-700 dark:text-amber-400',
          dot: 'bg-amber-500',
          pulse: false
        };
      case 'order placed':
      default:
        return {
          bg: 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/30',
          text: 'text-slate-600 dark:text-slate-400',
          dot: 'bg-slate-400',
          pulse: false
        };
    }
  };

  const styles = getStyles();

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${styles.bg} ${styles.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot} ${styles.pulse ? 'animate-pulse' : ''}`} />
      {status}
    </span>
  );
};
export default StatusBadge;
