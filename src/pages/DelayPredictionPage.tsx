import React, { useState } from 'react';
import { 
  Cpu, 
  TrafficCone, 
  Boxes, 
  Navigation, 
  ShieldCheck, 
  ShieldAlert, 
  ArrowRight, 
  RefreshCw, 
  Gauge 
} from 'lucide-react';
import { apiService } from '../services/api';

export const DelayPredictionPage: React.FC = () => {
  // Input fields
  const [distance, setDistance] = useState<number>(650);
  const [traffic, setTraffic] = useState<number>(55); // 0 - 100 slider
  const [warehouse, setWarehouse] = useState<number>(45); // 0 - 100 slider

  // Output status
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // Calls the service (calculates based on Spring Boot parameters)
      const data = await apiService.predictDelay({
        distance,
        trafficLevel: traffic,
        warehouseLoad: warehouse
      });
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getTrafficLabel = (val: number) => {
    if (val < 35) return { text: 'Low Congestion', color: 'text-emerald-500' };
    if (val < 75) return { text: 'Moderate Congestion', color: 'text-amber-500' };
    return { text: 'High Jam Gridlock', color: 'text-rose-500' };
  };

  const getWarehouseLabel = (val: number) => {
    if (val < 35) return { text: 'Smooth Capacity', color: 'text-emerald-500' };
    if (val < 75) return { text: 'Moderate Queue Queue', color: 'text-amber-500' };
    return { text: 'Overloaded Terminal', color: 'text-rose-500' };
  };

  // SVGs for the radial gauge
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = result 
    ? circumference - (result.probabilityPercent / 100) * circumference 
    : circumference;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pb-24">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          AI Delay Prediction Simulator
        </h1>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
          Simulate logistics delay probability based on distance telemetry, traffic density, and warehouse queue capacity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-brand-blue-50 dark:bg-brand-blue-950/40 flex items-center justify-center text-brand-blue-900 dark:text-brand-orange-500">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Telemetry Variables</h3>
              <p className="text-xs font-semibold text-slate-400">Configure shipment environment states</p>
            </div>
          </div>

          <form onSubmit={handlePredict} className="space-y-8">
            {/* Distance Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                <label className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-slate-400" />
                  Shipment Route Distance
                </label>
                <span className="text-brand-blue-900 dark:text-brand-orange-500 font-extrabold text-sm">
                  {distance} km
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="2500"
                step="25"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-blue-900 dark:accent-brand-orange-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
                <span>Local Transit (50 km)</span>
                <span>Cross Country (2,500 km)</span>
              </div>
            </div>

            {/* Traffic Congestion Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                <label className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <TrafficCone className="w-4 h-4 text-slate-400" />
                  Traffic Congestion Density
                </label>
                <span className={`font-extrabold text-sm ${getTrafficLabel(traffic).color}`}>
                  {traffic}% - {getTrafficLabel(traffic).text}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={traffic}
                onChange={(e) => setTraffic(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-blue-900 dark:accent-brand-orange-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
                <span>Free Flow (0%)</span>
                <span>Total Bottleneck (100%)</span>
              </div>
            </div>

            {/* Warehouse Load Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                <label className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Boxes className="w-4 h-4 text-slate-400" />
                  Warehouse Sorting Load Capacity
                </label>
                <span className={`font-extrabold text-sm ${getWarehouseLabel(warehouse).color}`}>
                  {warehouse}% - {getWarehouseLabel(warehouse).text}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={warehouse}
                onChange={(e) => setWarehouse(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-blue-900 dark:accent-brand-orange-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
                <span>Unloaded (0%)</span>
                <span>Maximum Capacity (100%)</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-blue-900 dark:bg-brand-orange-500 hover:opacity-90 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Analyzing Route Conditions...
                </>
              ) : (
                <>
                  Compute Delay Probability Profile
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: AI Analysis Result Display */}
        <div className="space-y-6">
          {/* Result Card */}
          <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm min-h-[380px] flex flex-col items-center justify-between relative overflow-hidden">
            {/* Decorative BG element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-slate-50 dark:bg-slate-800/20 rounded-full" />

            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider pb-3 border-b border-slate-100 dark:border-slate-800 w-full text-center relative z-10">
              Risk Profile Report
            </h3>

            {/* SKELETON PLACEHOLDER */}
            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4 animate-pulse py-12 w-full">
                <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800" />
                <div className="h-6 w-32 bg-slate-100 dark:bg-slate-800 rounded" />
                <div className="h-12 w-full bg-slate-100 dark:bg-slate-800 rounded" />
              </div>
            )}

            {/* DEFAULT STATE */}
            {!result && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-12 px-6">
                <Gauge className="w-16 h-16 text-slate-300 dark:text-slate-700 stroke-[1.5]" />
                <h4 className="text-slate-600 dark:text-slate-400 font-bold text-sm">Simulator Awaiting Trigger</h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold max-w-[200px]">
                  Submit the telemetry form to run the AI delay forecasting algorithm.
                </p>
              </div>
            )}

            {/* ANALYSIS RESULT DISPLAY */}
            {result && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center w-full py-6 space-y-6 relative z-10">
                {/* SVG Gauge */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full risk-meter">
                    <circle
                      className="text-slate-100 dark:text-slate-800"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r={radius}
                      cx="72"
                      cy="72"
                    />
                    <circle
                      className={`transition-all duration-1000 ${
                        result.riskLevel === 'Red' 
                          ? 'text-rose-500' 
                          : result.riskLevel === 'Yellow' 
                            ? 'text-amber-500' 
                            : 'text-emerald-500'
                      }`}
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r={radius}
                      cx="72"
                      cy="72"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      {result.probabilityPercent}%
                    </span>
                    <span className="block text-[9px] uppercase font-bold tracking-wider text-slate-400">
                      Delay Prob.
                    </span>
                  </div>
                </div>

                {/* Risk Level Badge */}
                <div className="text-center">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${
                    result.riskLevel === 'Red' 
                      ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/30 text-rose-700 dark:text-rose-400' 
                      : result.riskLevel === 'Yellow' 
                        ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/30 text-amber-700 dark:text-amber-400' 
                        : 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      result.riskLevel === 'Red' 
                        ? 'bg-rose-500 animate-ping' 
                        : result.riskLevel === 'Yellow' 
                          ? 'bg-amber-500 animate-ping' 
                          : 'bg-emerald-500'
                    }`} />
                    {result.delayCategory} Risk Profile
                  </span>
                </div>

                {/* Explanation Snippet */}
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 text-center leading-relaxed max-w-[280px]">
                  <span className="font-extrabold text-slate-700 dark:text-slate-200 uppercase">Analysis: </span>
                  {result.reason}
                </p>
              </div>
            )}
          </div>

          {/* Actionable Recommendations Card */}
          {result && !loading && (
            <div className={`p-5 rounded-2xl border flex gap-4 ${
              result.riskLevel === 'Red' 
                ? 'bg-rose-50/50 border-rose-200/60 dark:bg-rose-950/10 dark:border-rose-900/30 text-rose-800 dark:text-rose-300' 
                : result.riskLevel === 'Yellow' 
                  ? 'bg-amber-50/50 border-amber-200/60 dark:bg-amber-950/10 dark:border-amber-900/30 text-amber-800 dark:text-amber-300' 
                  : 'bg-emerald-50/50 border-emerald-200/60 dark:bg-emerald-950/10 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300'
            }`}>
              <div className="flex-shrink-0 mt-0.5">
                {result.riskLevel === 'Green' ? (
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                )}
              </div>
              <div className="space-y-1 text-xs font-semibold">
                <h4 className="font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                  Mitigation Strategy
                </h4>
                <p className="leading-relaxed opacity-95 mt-1">
                  {result.recommendation}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DelayPredictionPage;
