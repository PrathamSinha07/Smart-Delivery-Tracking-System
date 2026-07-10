import React from 'react';
import { Check, ClipboardList, Package, Truck, Compass, MapPin, CheckCircle } from 'lucide-react';

interface TimelineStep {
  status: string;
  location: string;
  time: string;
  completed: boolean;
}

interface TimelineProps {
  timeline: TimelineStep[];
  currentStatus: string;
}

export const Timeline: React.FC<TimelineProps> = ({ timeline, currentStatus }) => {
  // Map step names to Lucide icons
  const getIcon = (statusName: string, isCompleted: boolean, isActive: boolean) => {
    const iconClass = `w-5 h-5 ${
      isCompleted 
        ? 'text-white' 
        : isActive 
          ? 'text-brand-orange-500 animate-pulse' 
          : 'text-slate-400 dark:text-slate-500'
    }`;

    switch (statusName.toLowerCase()) {
      case 'order placed':
        return <ClipboardList className={iconClass} />;
      case 'packed':
        return <Package className={iconClass} />;
      case 'dispatched':
        return <Truck className={iconClass} />;
      case 'in transit':
        return <Compass className={iconClass} />;
      case 'out for delivery':
        return <MapPin className={iconClass} />;
      case 'delivered':
        return <CheckCircle className={iconClass} />;
      default:
        return <Package className={iconClass} />;
    }
  };

  // Determine if a step is the "active/current" step
  // The active step is the last completed step (or the first incomplete step depending on context)
  // Let's identify it by checking which step matches the currentStatus, or is the last completed step.
  const activeIndex = timeline.reduce((acc, step, index) => {
    if (step.status.toLowerCase() === currentStatus.toLowerCase()) {
      return index;
    }
    return acc;
  }, -1);

  return (
    <div className="relative pl-6 sm:pl-8 space-y-8 py-2">
      {/* Vertical timeline connector line */}
      <div className="absolute left-[29px] sm:left-[37px] top-4 bottom-4 w-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
      
      {/* Active progress connector line (overlay) */}
      {activeIndex >= 0 && (
        <div 
          className="absolute left-[29px] sm:left-[37px] top-4 w-1 bg-brand-blue-900 dark:bg-brand-orange-500 rounded-full transition-all duration-1000"
          style={{ 
            height: `${(activeIndex / (timeline.length - 1)) * 92}%` 
          }}
        />
      )}

      {timeline.map((step, index) => {
        const isCompleted = step.completed;
        const isActive = step.status.toLowerCase() === currentStatus.toLowerCase();
        
        return (
          <div key={index} className="relative flex gap-6 md:gap-8 items-start group">
            {/* Step Icon Container */}
            <div 
              className={`absolute -left-7 sm:-left-9 w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 z-10 ${
                isCompleted
                  ? 'bg-brand-blue-900 border-white dark:border-[#1E293B] shadow-md dark:bg-brand-orange-500'
                  : isActive
                    ? 'bg-orange-50 dark:bg-orange-950/20 border-brand-orange-500 shadow-lg shadow-orange-500/20'
                    : 'bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800'
              }`}
            >
              {isCompleted && !isActive ? (
                <Check className="w-5 h-5 text-white stroke-[3px]" />
              ) : (
                getIcon(step.status, isCompleted, isActive)
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 min-w-0 bg-white/40 dark:bg-[#1E293B]/20 rounded-xl p-4 border border-slate-100 dark:border-slate-800/30 backdrop-blur-sm group-hover:border-slate-200 dark:group-hover:border-slate-700/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h4 className={`font-bold text-sm tracking-wide uppercase ${
                  isActive 
                    ? 'text-brand-orange-500' 
                    : isCompleted 
                      ? 'text-brand-blue-900 dark:text-brand-orange-300' 
                      : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {step.status}
                </h4>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                  {step.time}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {step.location}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Timeline;
