import React from 'react';
import { 
  LayoutDashboard, 
  TableProperties, 
  TrendingUp, 
  UserSquare2, 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Moon, 
  LogOut,
  PackageCheck
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentPath, 
  onNavigate, 
  collapsed, 
  setCollapsed,
  onLogout
}) => {
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { name: 'Dashboard', path: 'dashboard', icon: LayoutDashboard },
    { name: 'Orders Management', path: 'orders', icon: TableProperties },
    { name: 'Delay Prediction', path: 'predict', icon: TrendingUp },
    { name: 'System Info & Profile', path: 'profile', icon: UserSquare2 },
  ];

  return (
    <aside 
      className={`h-screen fixed top-0 left-0 bg-white dark:bg-[#0F172A] border-r border-slate-200 dark:border-slate-800 transition-all duration-300 z-30 flex flex-col justify-between ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-10 h-10 rounded-xl bg-brand-blue-900 flex items-center justify-center flex-shrink-0 shadow-md">
              <PackageCheck className="w-6 h-6 text-brand-orange-500" />
            </div>
            {!collapsed && (
              <span className="font-extrabold text-sm tracking-tight text-brand-blue-900 dark:text-white uppercase transition-opacity duration-300">
                Smart<span className="text-brand-orange-500">Track</span>
              </span>
            )}
          </div>
          
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="mt-6 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'bg-brand-blue-900 text-white shadow-md shadow-brand-blue-900/10 dark:bg-brand-orange-500 dark:shadow-brand-orange-500/10' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                {!collapsed && (
                  <span className="truncate transition-opacity duration-300">
                    {item.name}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer (Theme switch and Logout) */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-5 h-5 text-amber-500 flex-shrink-0 animate-spin-slow" />
              {!collapsed && <span>Light Mode</span>}
            </>
          ) : (
            <>
              <Moon className="w-5 h-5 text-brand-blue-900 flex-shrink-0" />
              {!collapsed && <span>Dark Mode</span>}
            </>
          )}
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-5 h-5 text-rose-500 flex-shrink-0" />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;
