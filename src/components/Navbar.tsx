import React, { useState } from 'react';
import { Menu, X, Sun, Moon, PackageCheck, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, isLoggedIn }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: 'landing' },
    { name: 'Track Shipment', path: 'tracking' },
  ];

  return (
    <nav className="sticky top-0 bg-white/80 dark:bg-[#0B1329]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/50 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-10 h-10 rounded-xl bg-brand-blue-900 flex items-center justify-center shadow-md">
              <PackageCheck className="w-6 h-6 text-brand-orange-500" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-brand-blue-900 dark:text-white uppercase">
              Smart<span className="text-brand-orange-500">Track</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navItems.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => onNavigate(item.path)}
                    className={`text-sm font-semibold transition-colors ${
                      isActive 
                        ? 'text-brand-orange-500' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-brand-blue-900 dark:hover:text-white'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-800 pl-6">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-all"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-amber-500 animate-spin-slow" />
                ) : (
                  <Moon className="w-5 h-5 text-brand-blue-900" />
                )}
              </button>

              {/* Portal CTA */}
              <button
                onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'login')}
                className="inline-flex items-center gap-2 bg-brand-blue-900 dark:bg-brand-orange-500 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-md transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              >
                <User className="w-4 h-4" />
                {isLoggedIn ? 'Dashboard' : 'Portal Login'}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-brand-blue-900" />}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800/50 bg-white dark:bg-[#0B1329] px-4 pt-2 pb-4 space-y-2 shadow-lg transition-all">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                onNavigate(item.path);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold ${
                currentPath === item.path 
                  ? 'bg-slate-100 dark:bg-slate-800 text-brand-orange-500' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              {item.name}
            </button>
          ))}
          <div className="border-t border-slate-200 dark:border-slate-800/50 pt-2">
            <button
              onClick={() => {
                onNavigate(isLoggedIn ? 'dashboard' : 'login');
                setMobileMenuOpen(false);
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-blue-900 dark:bg-brand-orange-500 text-white font-semibold text-base py-3 rounded-lg shadow-md"
            >
              <User className="w-5 h-5" />
              {isLoggedIn ? 'Dashboard' : 'Portal Login'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
