import React, { useEffect, useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell, 
  PieChart, 
  Pie 
} from 'recharts';
import { apiService } from '../services/api';
import type { DashboardStats, DashboardCharts } from '../mock/mockData';

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [charts, setCharts] = useState<DashboardCharts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);
    
    try {
      const [statsData, chartsData] = await Promise.all([
        apiService.getDashboardStats(),
        apiService.getDashboardCharts()
      ]);
      setStats(statsData);
      setCharts(chartsData);
      setError('');
    } catch (err) {
      setError('Failed to fetch dashboard metrics. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6 animate-pulse">
        {/* Title skeleton */}
        <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        
        {/* KPI Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          ))}
        </div>

        {/* Charts skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-96 lg:col-span-2 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        </div>
        <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-center py-20">
        <AlertTriangle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Error Loading Dashboard Data</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-6">{error}</p>
        <button 
          onClick={() => fetchData()}
          className="bg-brand-blue-900 dark:bg-brand-orange-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-md"
        >
          Retry Load
        </button>
      </div>
    );
  }

  const kpis = [
    {
      title: "Total Shipments",
      value: stats?.totalOrders || 0,
      icon: Package,
      color: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400",
      description: "Aggregated packages"
    },
    {
      title: "Active Deliveries",
      value: stats?.activeDeliveries || 0,
      icon: Truck,
      color: "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400",
      description: "Currently in transit"
    },
    {
      title: "Completed",
      value: stats?.delivered || 0,
      icon: CheckCircle,
      color: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400",
      description: "Successfully delivered"
    },
    {
      title: "Delayed",
      value: stats?.delayed || 0,
      icon: AlertTriangle,
      color: "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400",
      description: "Action required"
    },
    {
      title: "Avg Delivery Time",
      value: stats?.avgDeliveryTime || "N/A",
      icon: Clock,
      color: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400",
      description: "Avg transit duration"
    },
    {
      title: "Success Rate",
      value: stats ? `${stats.successRate}%` : "0%",
      icon: TrendingUp,
      color: "bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400",
      description: "On-time probability"
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pb-20">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
            Real-time logistics statistics and route probability indexes.
          </p>
        </div>
        <button
          onClick={() => fetchData(true)}
          disabled={refreshing}
          className="self-start sm:self-auto inline-flex items-center gap-2 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh Stats
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white dark:bg-[#1E293B] p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${kpi.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {kpi.title}
                </h3>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {kpi.value}
                </p>
                <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                  {kpi.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Interactive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart: Deliveries Per Day */}
        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm lg:col-span-2">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Deliveries per Day</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Weekly volume flow and delay rates</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts?.deliveriesPerDay} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDelayed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    color: '#1e293b'
                  }}
                />
                <Area type="monotone" dataKey="count" name="Total Shipments" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
                <Area type="monotone" dataKey="delayed" name="Delayed" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorDelayed)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart: Delay Risk Level */}
        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Delay Risk Distribution</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Active cargo risk indexes</p>
          </div>
          <div className="h-80 w-full flex flex-col justify-between items-center">
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts?.delayDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {charts?.delayDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                      color: '#1e293b'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Custom Legend */}
            <div className="w-full grid grid-cols-3 gap-2 text-center text-xs font-semibold">
              {charts?.delayDistribution.map((entry, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase truncate max-w-[70px]">
                      {entry.name.split(' ')[0]}
                    </span>
                  </div>
                  <span className="font-extrabold text-slate-800 dark:text-white mt-1">
                    {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart: Orders by City */}
      <div className="bg-white dark:bg-[#1E293B] p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Cargo by City Hub</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Volume split across major sorting warehouse channels</p>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={charts?.ordersByCity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
              <XAxis dataKey="city" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  color: '#1e293b'
                }}
              />
              <Bar dataKey="count" name="Packages" radius={[8, 8, 0, 0]}>
                {charts?.ordersByCity.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index % 2 === 0 ? '#1e3a8a' : '#f97316'} 
                    className="dark:fill-brand-orange-500 dark:even:fill-brand-blue-500"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
