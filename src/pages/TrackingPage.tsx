import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Package, 
  MapPin, 
  User, 
  Boxes, 
  AlertCircle, 
  ShieldAlert,
  Calendar,
  ArrowRight,
  Info
} from 'lucide-react';
import { apiService } from '../services/api';
import type { ShipmentDetails } from '../mock/mockData';
import { Timeline } from '../components/Timeline';
import { StatusBadge } from '../components/StatusBadge';

interface TrackingPageProps {
  initialTrackingId?: string;
  onClearInitialId?: () => void;
}

export const TrackingPage: React.FC<TrackingPageProps> = ({ initialTrackingId = '', onClearInitialId }) => {
  const [searchId, setSearchId] = useState(initialTrackingId);
  const [shipment, setShipment] = useState<ShipmentDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleTrack = async (idToTrack: string) => {
    if (!idToTrack.trim()) return;
    setLoading(true);
    setError('');
    setSearched(true);
    try {
      const data = await apiService.getShipment(idToTrack.trim().toUpperCase());
      setShipment(data);
    } catch (err: any) {
      setError(err.message || 'Invalid Tracking ID. Please try another code.');
      setShipment(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialTrackingId) {
      setSearchId(initialTrackingId);
      handleTrack(initialTrackingId);
      if (onClearInitialId) onClearInitialId();
    }
  }, [initialTrackingId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrack(searchId);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 pb-24">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Shipment Tracking & Live Checkpoints
        </h1>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
          Trace active logistics parcels, see routes, and inspect AI delay risk alerts.
        </p>
      </div>

      {/* Search Container */}
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm max-w-3xl">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Enter Tracking ID (e.g. ORD101, ORD102, ORD103)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1329] text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue-900 dark:focus:ring-brand-orange-500 transition-all placeholder-slate-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-blue-900 dark:bg-brand-orange-500 hover:opacity-90 disabled:opacity-50 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Searching...' : 'Search'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* SKELETON LOADER STATE */}
      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-44 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
              <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            </div>
            <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          </div>
          <div className="h-[550px] bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        </div>
      )}

      {/* ERROR / NOT FOUND STATE */}
      {error && !loading && (
        <div className="text-center py-16 max-w-lg mx-auto bg-white dark:bg-[#1E293B] border border-slate-200/50 dark:border-slate-800/40 p-8 rounded-2xl shadow-sm">
          <AlertCircle className="w-14 h-14 text-rose-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Shipment Not Found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{error}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">
            Ensure the code starts with 'ORD' followed by numbers, e.g. <span className="underline font-bold text-brand-orange-500 cursor-pointer" onClick={() => { setSearchId('ORD101'); handleTrack('ORD101'); }}>ORD101</span>.
          </p>
        </div>
      )}

      {/* EMPTY / INITIAL STATE */}
      {!searched && !loading && (
        <div className="text-center py-20 max-w-xl mx-auto">
          <Package className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4 stroke-[1.5]" />
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-1">Awaiting Shipment ID</h3>
          <p className="text-sm text-slate-500 dark:text-slate-500 max-w-sm mx-auto">
            Input a corporate order serial number in the panel above to retrieve telemetry tracking checkpoints.
          </p>
        </div>
      )}

      {/* SHIPMENT DETAIL FOUND VIEW */}
      {shipment && !loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Details Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Summary Card */}
            <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-6">
              <div className="space-y-1">
                <span className="text-xs font-extrabold uppercase text-slate-400 dark:text-slate-500 tracking-wider">Tracking Code</span>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
                  {shipment.orderId}
                  <StatusBadge status={shipment.status} />
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Route: <span className="font-bold text-slate-800 dark:text-white">{shipment.origin}</span> → <span className="font-bold text-slate-800 dark:text-white">{shipment.destination}</span>
                </p>
              </div>

              <div className="flex gap-4 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
                <div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Expected Delivery
                  </div>
                  <span className="text-sm font-extrabold text-slate-800 dark:text-white">
                    {shipment.expectedDelivery}
                  </span>
                </div>
              </div>
            </div>

            {/* AI Delay Risk Indicator Card */}
            <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row gap-5 items-start ${
              shipment.delayCategory === 'High' 
                ? 'bg-rose-50/50 border-rose-200/60 dark:bg-rose-950/10 dark:border-rose-900/30 text-rose-800 dark:text-rose-300'
                : shipment.delayCategory === 'Medium'
                  ? 'bg-amber-50/50 border-amber-200/60 dark:bg-amber-950/10 dark:border-amber-900/30 text-amber-800 dark:text-amber-300'
                  : 'bg-emerald-50/50 border-emerald-200/60 dark:bg-emerald-950/10 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300'
            }`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                shipment.delayCategory === 'High' 
                  ? 'bg-rose-100 dark:bg-rose-950/50 text-rose-600'
                  : shipment.delayCategory === 'Medium'
                    ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-600'
                    : 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600'
              }`}>
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-extrabold text-sm tracking-wide uppercase">
                  AI Delay Risk Rating: {shipment.delayCategory} ({Math.round(shipment.delayProbability * 100)}%)
                </h3>
                <p className="text-xs font-semibold leading-relaxed opacity-90">
                  <span className="font-bold underline uppercase">Factors:</span> {shipment.reason}
                </p>
                {shipment.delayCategory !== 'Low' && (
                  <p className="text-xs font-bold leading-relaxed border-t border-current/10 pt-2 mt-2 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 flex-shrink-0" />
                    Recommendation: Route adjustment is suggested to avoid bottleneck stations.
                  </p>
                )}
              </div>
            </div>

            {/* Sender / Receiver Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sender */}
              <div className="bg-white dark:bg-[#1E293B] p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Sender Info</h3>
                </div>
                <div className="space-y-2 text-xs font-semibold">
                  <p className="text-slate-400">Company Name</p>
                  <p className="text-slate-800 dark:text-white text-sm">{shipment.senderDetails.name}</p>
                  
                  <p className="text-slate-400 mt-2">Dispatch Address</p>
                  <p className="text-slate-800 dark:text-white leading-relaxed">{shipment.senderDetails.address}, {shipment.senderDetails.city}</p>
                  
                  <p className="text-slate-400 mt-2">Contact Desk</p>
                  <p className="text-slate-800 dark:text-white">{shipment.senderDetails.phone}</p>
                </div>
              </div>

              {/* Receiver */}
              <div className="bg-white dark:bg-[#1E293B] p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Recipient Details</h3>
                </div>
                <div className="space-y-2 text-xs font-semibold">
                  <p className="text-slate-400">Consignee Name</p>
                  <p className="text-slate-800 dark:text-white text-sm">{shipment.receiverDetails.name}</p>
                  
                  <p className="text-slate-400 mt-2">Delivery Address</p>
                  <p className="text-slate-800 dark:text-white leading-relaxed">{shipment.receiverDetails.address}, {shipment.receiverDetails.city}</p>
                  
                  <p className="text-slate-400 mt-2">Contact Desk</p>
                  <p className="text-slate-800 dark:text-white">{shipment.receiverDetails.phone}</p>
                </div>
              </div>
            </div>

            {/* Warehouse Diagnostic Info */}
            <div className="bg-white dark:bg-[#1E293B] p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                  <Boxes className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Active Warehouse Hub Diagnostic</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-semibold">
                <div>
                  <p className="text-slate-400 mb-1">Current Sorting Station</p>
                  <p className="text-sm text-slate-800 dark:text-white">{shipment.warehouseInfo.name}</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-1">Facility Queue Manager</p>
                  <p className="text-sm text-slate-800 dark:text-white">{shipment.warehouseInfo.manager}</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-1">Live Warehouse Queue Capacity</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          parseInt(shipment.warehouseInfo.loadCapacity) > 80 
                            ? 'bg-rose-500' 
                            : parseInt(shipment.warehouseInfo.loadCapacity) > 50 
                              ? 'bg-amber-500' 
                              : 'bg-emerald-500'
                        }`}
                        style={{ width: shipment.warehouseInfo.loadCapacity }}
                      />
                    </div>
                    <span className="font-extrabold text-slate-800 dark:text-white">
                      {shipment.warehouseInfo.loadCapacity}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Package Info Specifications */}
            <div className="bg-white dark:bg-[#1E293B] p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                  <Package className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Cargo Package Specifications</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-semibold">
                <div>
                  <p className="text-slate-400 mb-1">Dead Weight</p>
                  <p className="text-sm text-slate-800 dark:text-white">{shipment.packageInfo.weight}</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-1">Cargo Volume Dimensions</p>
                  <p className="text-sm text-slate-800 dark:text-white">{shipment.packageInfo.dimensions}</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-1">Carrier Network</p>
                  <p className="text-sm text-slate-800 dark:text-white">{shipment.packageInfo.courier}</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-1">Declared Item Description</p>
                  <p className="text-sm text-slate-800 dark:text-white truncate">{shipment.packageInfo.contents}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline Checklist */}
          <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-6 uppercase tracking-wider pb-3 border-b border-slate-100 dark:border-slate-800">
              Vertical Shipping Timeline
            </h3>
            
            <Timeline timeline={shipment.timeline} currentStatus={shipment.status} />
          </div>
        </div>
      )}
    </div>
  );
};
export default TrackingPage;
