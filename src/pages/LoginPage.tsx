import React, { useState } from 'react';
import { PackageCheck, ShieldCheck, Mail, Lock, RefreshCw, KeyRound } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onNavigateHome: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigateHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      // Allow any entry for demo login
      if (email.trim() && password.trim()) {
        onLoginSuccess();
      } else {
        setError('Please enter a username/email and password.');
        setLoading(false);
      }
    }, 700);
  };

  const handleDemoBypass = () => {
    setLoading(true);
    setTimeout(() => {
      setEmail('admin@smarttrack.com');
      setPassword('••••••••');
      onLoginSuccess();
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      {/* Decorative layout bubbles */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-brand-blue-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-brand-orange-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-xl p-8 relative z-10 space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div 
            onClick={onNavigateHome}
            className="w-12 h-12 rounded-2xl bg-brand-blue-900 flex items-center justify-center mx-auto shadow-md cursor-pointer"
          >
            <PackageCheck className="w-7 h-7 text-brand-orange-500" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
            Logistics Portal Login
          </h2>
          <p className="text-xs font-semibold text-slate-400">
            Sign in to access admin analytics, queue tables, and predictive ML models.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <label className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              Corporate Email Address
            </label>
            <input
              type="text"
              placeholder="e.g. operator@smarttrack.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1329] text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue-900 dark:focus:ring-brand-orange-500 transition-all placeholder-slate-400"
            />
          </div>

          <div className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <label className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              Portal Access Code
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1329] text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue-900 dark:focus:ring-brand-orange-500 transition-all placeholder-slate-400"
            />
          </div>

          {error && <p className="text-rose-500 text-xs font-bold text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-blue-900 dark:bg-brand-orange-500 hover:opacity-90 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            Authorize Access
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-100 dark:border-slate-800" />
          <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-400 uppercase">OR</span>
          <div className="flex-grow border-t border-slate-100 dark:border-slate-800" />
        </div>

        {/* Demo Fast Bypass */}
        <button
          onClick={handleDemoBypass}
          disabled={loading}
          className="w-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-sm"
        >
          <KeyRound className="w-4 h-4 text-brand-orange-500" />
          Demo Quick Bypass
        </button>
      </div>
    </div>
  );
};
export default LoginPage;
