import React, { useEffect, useState } from 'react';
import { 
  Server, 
  Database, 
  Cpu, 
  Code, 
  Activity, 
  Terminal, 
  RefreshCw, 
  BookOpen,
  Boxes,
  Globe
} from 'lucide-react';
import { apiService } from '../services/api';

export const ProfilePage: React.FC = () => {
  const [health, setHealth] = useState<{ status: string; dbStatus: string; latency: string }>({
    status: 'PENDING',
    dbStatus: 'PENDING',
    latency: 'N/A'
  });
  const [checking, setChecking] = useState(false);

  const runHealthCheck = async () => {
    setChecking(true);
    const result = await apiService.getHealthCheck();
    setHealth(result);
    setChecking(false);
  };

  useEffect(() => {
    runHealthCheck();
  }, []);

  const techStack = {
    frontend: [
      { name: "React 19 & TypeScript", desc: "Type-safe modular application shell" },
      { name: "Vite Bundler", desc: "Superfast HMR and compilation" },
      { name: "Tailwind CSS", desc: "Responsive utility styling & dark mode support" },
      { name: "Recharts", desc: "SVG interactive analytical visual charting" },
      { name: "Lucide Icons", desc: "Sleek SVG micro-symbols library" }
    ],
    backend: [
      { name: "Spring Boot 3.x", desc: "Enterprise-grade Java REST API runtime" },
      { name: "Spring Data JPA", desc: "ORM data abstraction mapping layer" },
      { name: "PostgreSQL Database", desc: "Relational persistence ledger" },
      { name: "Hibernate Engine", desc: "Database query translation controller" }
    ]
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 pb-24">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          System Info & Corporate Profile
        </h1>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
          Monitor system health, inspect backend architecture nodes, and check developer specifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Live Health Check & Specs */}
        <div className="space-y-6 lg:col-span-1">
          {/* Health Status Card */}
          <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-brand-orange-500" />
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Live System Health</h3>
              </div>
              <button
                onClick={runHealthCheck}
                disabled={checking}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              >
                <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="space-y-4 font-semibold text-xs">
              {/* REST API Status */}
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Spring Boot API</span>
                <span className={`px-2.5 py-1 rounded-lg font-bold text-[10px] tracking-wider uppercase ${
                  health.status === 'UP' 
                    ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30' 
                    : health.status === 'PENDING'
                      ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400'
                      : 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30'
                }`}>
                  {health.status === 'UP' ? 'Online' : health.status === 'PENDING' ? 'Testing...' : 'Offline'}
                </span>
              </div>

              {/* Database Status */}
              <div className="flex justify-between items-center">
                <span className="text-slate-400">PostgreSQL DB Node</span>
                <span className={`px-2.5 py-1 rounded-lg font-bold text-[10px] tracking-wider uppercase ${
                  health.dbStatus === 'CONNECTED' 
                    ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400' 
                    : health.dbStatus === 'PENDING'
                      ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400'
                      : 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400'
                }`}>
                  {health.dbStatus === 'CONNECTED' ? 'Connected' : health.dbStatus === 'PENDING' ? 'Checking...' : 'Disconnected'}
                </span>
              </div>

              {/* API Ping Latency */}
              <div className="flex justify-between items-center">
                <span className="text-slate-400">API Response Latency</span>
                <span className="text-slate-800 dark:text-white font-extrabold text-sm">{health.latency}</span>
              </div>
            </div>

            {/* Hint alert */}
            {health.status === 'DOWN' && (
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/15 border border-amber-200 dark:border-amber-900/30 text-amber-800 dark:text-amber-300 text-[10px] leading-relaxed font-semibold">
                ⚠️ Spring Boot API is currently offline or database is unseeded. Start your Spring Boot backend on port 8081, verify PostgreSQL settings in properties, and retry healthcheck.
              </div>
            )}
          </div>

          {/* Developer Credits Card */}
          <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider pb-3 border-b border-slate-100 dark:border-slate-800">
              Developer Credits
            </h3>
            <div className="space-y-4 font-semibold text-xs text-slate-500 dark:text-slate-400">
              <div>
                <p className="text-slate-400 mb-1">Lead Developer</p>
                <p className="text-sm text-slate-800 dark:text-white font-extrabold">Pratham Sinha</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Logistics & Supply Chain Systems Engineer</p>
              </div>

              <div>
                <p className="text-slate-400 mb-1">Project Registry</p>
                <p className="text-slate-800 dark:text-white">Smart Delivery Tracking System</p>
              </div>

              <div>
                <p className="text-slate-400 mb-1">Version Release</p>
                <p className="text-slate-800 dark:text-white flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-brand-orange-500" />
                  v1.2.0 (Stable-Production)
                </p>
              </div>

              <div className="pt-2">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-brand-blue-900 dark:text-brand-orange-500 hover:underline"
                >
                  <Globe className="w-4 h-4" />
                  Access Source Repository
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: System Architecture Map & Stack Specs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Architecture Layout Flow */}
          <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm space-y-6">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                Full-Stack System Architecture Map
              </h3>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">End-to-end data pathway telemetry diagram</p>
            </div>

            {/* Custom visual flowchart */}
            <div className="grid grid-cols-1 sm:grid-cols-5 items-center gap-4 text-center text-xs font-bold font-sans">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-[#0B1329]">
                <Cpu className="w-6 h-6 text-brand-orange-500 mx-auto mb-2" />
                <span className="block text-slate-900 dark:text-white">React Shell</span>
                <span className="block text-[9px] text-slate-400 mt-0.5">Vite Frontend</span>
              </div>
              <div className="text-slate-400 text-lg hidden sm:block">➜</div>
              <div className="p-4 rounded-xl border border-brand-blue-900/10 bg-brand-blue-50/20 dark:border-slate-800 dark:bg-[#0B1329]">
                <Server className="w-6 h-6 text-brand-blue-900 dark:text-brand-blue-400 mx-auto mb-2" />
                <span className="block text-slate-900 dark:text-white">Spring Boot</span>
                <span className="block text-[9px] text-slate-400 mt-0.5">REST Controller</span>
              </div>
              <div className="text-slate-400 text-lg hidden sm:block">➜</div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-[#0B1329]">
                <Database className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
                <span className="block text-slate-900 dark:text-white">PostgreSQL</span>
                <span className="block text-[9px] text-slate-400 mt-0.5">Database Ledger</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1329] border border-slate-200/50 dark:border-slate-800 text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-semibold space-y-2">
              <h4 className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-brand-orange-500" />
                API Contract Protocols
              </h4>
              <p>
                The frontend shell transmits request operations over client fetch instances. In production, local API calls prefix automatically maps to the Spring Boot REST Controllers, querying shipments via Hibernate entities in PostgreSQL.
              </p>
            </div>
          </div>

          {/* Technical Stack Breakdown */}
          <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm space-y-6">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider pb-3 border-b border-slate-100 dark:border-slate-800">
              Technical Stack Breakdown
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Frontend */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wide">
                  <Code className="w-4 h-4 text-brand-orange-500" />
                  Frontend Client Node
                </h4>
                <ul className="space-y-3">
                  {techStack.frontend.map((tech, i) => (
                    <li key={i} className="text-xs font-semibold">
                      <span className="block text-slate-800 dark:text-white">{tech.name}</span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">{tech.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Backend */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wide">
                  <Boxes className="w-4 h-4 text-brand-blue-900 dark:text-brand-blue-400" />
                  Backend REST Engine
                </h4>
                <ul className="space-y-3">
                  {techStack.backend.map((tech, i) => (
                    <li key={i} className="text-xs font-semibold">
                      <span className="block text-slate-800 dark:text-white">{tech.name}</span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">{tech.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
