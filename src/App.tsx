import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { TrackingPage } from './pages/TrackingPage';
import { DashboardPage } from './pages/DashboardPage';
import { DelayPredictionPage } from './pages/DelayPredictionPage';
import { OrderManagementPage } from './pages/OrderManagementPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ThemeProvider } from './context/ThemeContext';

export const App: React.FC = () => {
  // Navigation & Auth state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return localStorage.getItem('currentPath') || 'landing';
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [trackingId, setTrackingId] = useState<string>('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Sync route path to localStorage to persist reload
  useEffect(() => {
    localStorage.setItem('currentPath', currentPath);
  }, [currentPath]);

  const handleNavigate = (path: string, searchId = '') => {
    if (searchId) {
      setTrackingId(searchId);
    }
    
    // Check Auth gate for admin paths
    const adminPaths = ['dashboard', 'orders', 'predict', 'profile'];
    if (adminPaths.includes(path) && !isLoggedIn) {
      setCurrentPath('login');
      return;
    }

    setCurrentPath(path);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setCurrentPath('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    setCurrentPath('landing');
  };

  // Render current page based on state router path
  const renderPage = () => {
    switch (currentPath) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'tracking':
        return (
          <TrackingPage 
            initialTrackingId={trackingId} 
            onClearInitialId={() => setTrackingId('')} 
          />
        );
      case 'login':
        return (
          <LoginPage 
            onLoginSuccess={handleLoginSuccess} 
            onNavigateHome={() => handleNavigate('landing')} 
          />
        );
      case 'dashboard':
        return <DashboardPage />;
      case 'predict':
        return <DelayPredictionPage />;
      case 'orders':
        return (
          <OrderManagementPage 
            onNavigateToTracking={(id) => handleNavigate('tracking', id)} 
          />
        );
      case 'profile':
        return <ProfilePage />;
      default:
        return <NotFoundPage onNavigateHome={() => handleNavigate('landing')} />;
    }
  };

  const isAdminView = ['dashboard', 'orders', 'predict', 'profile'].includes(currentPath);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B1329] text-slate-800 dark:text-slate-100 transition-colors duration-300">
        
        {/* PUBLIC WRAPPER: Show top Navbar */}
        {!isAdminView ? (
          <>
            <Navbar 
              currentPath={currentPath} 
              onNavigate={handleNavigate} 
              isLoggedIn={isLoggedIn} 
            />
            <main className="flex-1">
              {renderPage()}
            </main>
          </>
        ) : (
          /* ADMIN PORTAL WRAPPER: Show sidebar + main body layout */
          <div className="flex min-h-screen relative">
            <Sidebar 
              currentPath={currentPath} 
              onNavigate={handleNavigate} 
              collapsed={sidebarCollapsed} 
              setCollapsed={setSidebarCollapsed}
              onLogout={handleLogout}
            />
            
            <div 
              className={`flex-1 flex flex-col transition-all duration-300 ${
                sidebarCollapsed ? 'pl-20' : 'pl-20 md:pl-64'
              }`}
            >
              {/* Header spacer block to align items correctly */}
              <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-[#0F172A] z-20">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    OPERATOR PORTAL
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-extrabold text-slate-600 dark:text-slate-350">
                    System Connected
                  </span>
                </div>
              </header>

              <main className="flex-1">
                {renderPage()}
              </main>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
