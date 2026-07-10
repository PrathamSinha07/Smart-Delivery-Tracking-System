import React, { useState } from 'react';
import { 
  ArrowRight, 
  Search, 
  Map, 
  Cpu, 
  Boxes, 
  ChevronRight, 
  ShieldCheck, 
  Globe, 
  Clock 
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (path: string, trackingId?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [trackingId, setTrackingId] = useState('');
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      setError('Please enter a valid tracking ID');
      return;
    }
    setError('');
    onNavigate('tracking', trackingId.trim().toUpperCase());
  };

  const features = [
    {
      icon: Search,
      title: "Real-time Tracking",
      desc: "Get instant status updates, active locations, and comprehensive timelines of your packages."
    },
    {
      icon: Cpu,
      title: "AI Delay Prediction",
      desc: "Our machine learning models forecast potential delays by examining traffic, warehouse capacity, and transit history."
    },
    {
      icon: Map,
      title: "Route Optimization",
      desc: "Automatic route recalculation to divert shipments away from congested hubs and traffic bottlenecks."
    },
    {
      icon: Boxes,
      title: "Warehouse Load Balancing",
      desc: "Live capacity monitoring prevents overload, ensuring packages are processed quickly without queue blockage."
    }
  ];

  const stats = [
    { label: "On-Time Delivery", value: "99.4%", icon: Clock, color: "text-emerald-500" },
    { label: "Shipments Delivered", value: "1.8M+", icon: Globe, color: "text-brand-blue-500" },
    { label: "Active Warehouses", value: "45+", icon: Boxes, color: "text-brand-orange-500" },
    { label: "Security & Safety", value: "100%", icon: ShieldCheck, color: "text-indigo-500" }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 flex items-center bg-gradient-to-b from-brand-blue-50/40 via-white to-transparent dark:from-[#0F172A]/30 dark:via-[#0B1329] dark:to-transparent">
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand-blue-200/10 dark:bg-brand-blue-900/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-orange-200/10 dark:bg-brand-orange-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange-50 border border-brand-orange-100 dark:bg-brand-orange-950/20 dark:border-brand-orange-900/30 text-brand-orange-600 dark:text-brand-orange-400 text-xs font-bold uppercase tracking-wider mb-6 animate-bounce">
            🚀 NEXT-GEN SUPPLY CHAIN DASHBOARD
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Smart Logistics Tracking & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-900 to-brand-orange-500 dark:from-brand-blue-400 dark:to-brand-orange-500">AI Delay Prediction</span>
          </h1>
          
          <p className="mt-6 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Optimize your supply chain with real-time package monitoring, dynamic transit checkpoints, and predictive AI analytics.
          </p>

          {/* Quick Track Search */}
          <div className="mt-10 max-w-lg mx-auto">
            <form onSubmit={handleSearch} className="relative flex items-center p-1.5 bg-white dark:bg-[#1E293B] rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800/80">
              <div className="flex-1 flex items-center pl-3">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter Tracking ID (e.g., ORD101, ORD103)"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="w-full pl-3 pr-2 py-3 bg-transparent text-sm font-semibold focus:outline-none text-slate-800 dark:text-white placeholder-slate-400"
                />
              </div>
              <button
                type="submit"
                className="bg-brand-blue-900 dark:bg-brand-orange-500 hover:opacity-90 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all flex items-center gap-2 group shadow-md"
              >
                Track
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
            {error && <p className="text-rose-500 text-xs font-semibold mt-2.5 text-left pl-4">{error}</p>}
            <p className="text-slate-400 dark:text-slate-500 text-xs font-semibold mt-3">
              Try tracking demo orders like <span className="text-brand-orange-500 dark:text-brand-orange-400 font-bold underline cursor-pointer" onClick={() => onNavigate('tracking', 'ORD101')}>ORD101</span> or <span className="text-brand-orange-500 dark:text-brand-orange-400 font-bold underline cursor-pointer" onClick={() => onNavigate('tracking', 'ORD103')}>ORD103</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-12 bg-white dark:bg-[#0F172A]/50 border-y border-slate-100 dark:border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center md:text-left flex flex-col md:flex-row items-center gap-4 px-4 py-2">
                  <div className={`w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Enterprise Features for Modern Logistics
            </h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium">
              We leverage machine learning and live telemetry data to eliminate delivery bottlenecks and optimize warehousing pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-200/40 dark:border-slate-800/30 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-brand-blue-50 dark:bg-brand-blue-950/40 flex items-center justify-center text-brand-blue-900 dark:text-brand-orange-500 mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                  <button 
                    onClick={() => onNavigate('login')}
                    className="flex items-center gap-1 text-xs font-bold text-brand-orange-500 hover:text-brand-orange-600 mt-6 group"
                  >
                    Learn More 
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-blue-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.15),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto">
            Ready to Optimize Your Delivery Operations?
          </h2>
          <p className="mt-4 text-brand-blue-100 dark:text-slate-300 max-w-xl mx-auto font-medium">
            Access our delay prediction analytics models, manage fleet workflows, and run predictive scenarios.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => onNavigate('tracking')}
              className="bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all"
            >
              Track a Package
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-3.5 rounded-xl transition-all"
            >
              Go to Employee Portal
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-center text-xs font-semibold">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 SmartTrack Delivery Tracking Systems. All rights reserved.</p>
          <p className="mt-1 text-slate-600">Enterprise grade supply chain logistics monitoring and AI probability analysis.</p>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;
