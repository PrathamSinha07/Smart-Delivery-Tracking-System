import React, { useEffect, useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  ArrowLeftRight,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { apiService } from '../services/api';
import type { ShipmentDetails } from '../mock/mockData';
import { StatusBadge } from '../components/StatusBadge';

interface OrderManagementPageProps {
  onNavigateToTracking: (trackingId: string) => void;
}

export const OrderManagementPage: React.FC<OrderManagementPageProps> = ({ onNavigateToTracking }) => {
  // Query params
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState<keyof ShipmentDetails>('orderId');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Response items
  const [orders, setOrders] = useState<ShipmentDetails[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);

    try {
      const data = await apiService.getOrders({
        page,
        size: pageSize,
        status: statusFilter,
        search: search
      });

      // Sort client-side for fine-grained control
      let sortedContent = [...data.content];
      sortedContent.sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortOrder === 'asc' ? valA - valB : valB - valA;
        }

        const strA = String(valA).toLowerCase();
        const strB = String(valB).toLowerCase();

        if (strA < strB) return sortOrder === 'asc' ? -1 : 1;
        if (strA > strB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

      setOrders(sortedContent);
      setTotalElements(data.totalElements);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error loading order list", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, pageSize, statusFilter, search, sortBy, sortOrder]);

  const handleSort = (field: keyof ShipmentDetails) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setPage(1); // Reset page on sort
  };

  const getSortIcon = (field: keyof ShipmentDetails) => {
    if (sortBy !== field) return <ArrowLeftRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />;
    return sortOrder === 'asc' 
      ? <ChevronUp className="w-3.5 h-3.5 text-brand-orange-500" /> 
      : <ChevronDown className="w-3.5 h-3.5 text-brand-orange-500" />;
  };

  const priorityColors = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20';
      case 'medium':
        return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20';
      case 'low':
      default:
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Order & Dispatch Management
          </h1>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
            Browse corporate accounts, filter status lines, sort queue paths, and audit tracking timelines.
          </p>
        </div>
        <button
          onClick={() => fetchOrders(true)}
          disabled={refreshing}
          className="self-start sm:self-auto inline-flex items-center gap-2 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh Table
        </button>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white dark:bg-[#1E293B] p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search tracking, recipient..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1329] text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue-900 dark:focus:ring-brand-orange-500 transition-all placeholder-slate-400"
          />
        </div>

        {/* Filter Selection Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
            <Filter className="w-4 h-4" />
            Filter By Status:
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1329] text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Order Placed">Order Placed</option>
            <option value="Packed">Packed</option>
            <option value="Dispatched">Dispatched</option>
            <option value="In Transit">In Transit</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Delayed">Delayed</option>
          </select>

          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1329] text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value={5}>5 Rows</option>
            <option value={10}>10 Rows</option>
            <option value={20}>20 Rows</option>
          </select>
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#1E293B]/55 text-slate-400 uppercase text-[10px] font-extrabold tracking-wider">
                <th className="py-4 px-6 cursor-pointer group" onClick={() => handleSort('orderId')}>
                  <div className="flex items-center gap-1.5">
                    Tracking ID
                    {getSortIcon('orderId')}
                  </div>
                </th>
                <th className="py-4 px-6 cursor-pointer group" onClick={() => handleSort('receiverDetails')}>
                  <div className="flex items-center gap-1.5">
                    Customer
                    {getSortIcon('receiverDetails')}
                  </div>
                </th>
                <th className="py-4 px-6 cursor-pointer group" onClick={() => handleSort('destination')}>
                  <div className="flex items-center gap-1.5">
                    Destination
                    {getSortIcon('destination')}
                  </div>
                </th>
                <th className="py-4 px-6 cursor-pointer group" onClick={() => handleSort('status')}>
                  <div className="flex items-center gap-1.5">
                    Status
                    {getSortIcon('status')}
                  </div>
                </th>
                <th className="py-4 px-6 cursor-pointer group" onClick={() => handleSort('expectedDelivery')}>
                  <div className="flex items-center gap-1.5">
                    Expected Delivery
                    {getSortIcon('expectedDelivery')}
                  </div>
                </th>
                <th className="py-4 px-6 cursor-pointer group" onClick={() => handleSort('priority')}>
                  <div className="flex items-center gap-1.5">
                    Priority
                    {getSortIcon('priority')}
                  </div>
                </th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-xs font-semibold text-slate-700 dark:text-slate-300">
              {loading ? (
                // SKELETON ROWS
                [...Array(pageSize)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {[...Array(7)].map((_, c) => (
                      <td key={c} className="py-5 px-6">
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 dark:text-slate-500">
                    No order entries match search conditions.
                  </td>
                </tr>
              ) : (
                orders.map((item) => (
                  <tr 
                    key={item.orderId} 
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer"
                    onClick={() => onNavigateToTracking(item.orderId)}
                  >
                    <td className="py-4.5 px-6 font-extrabold text-slate-900 dark:text-white">
                      {item.orderId}
                    </td>
                    <td className="py-4.5 px-6">
                      <div className="font-bold text-slate-900 dark:text-white">{item.receiverDetails.name}</div>
                      <div className="text-[10px] text-slate-400">{item.receiverDetails.phone}</div>
                    </td>
                    <td className="py-4.5 px-6 text-slate-500 dark:text-slate-400">
                      {item.destination}
                    </td>
                    <td className="py-4.5 px-6">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-4.5 px-6 font-semibold">
                      {item.expectedDelivery}
                    </td>
                    <td className="py-4.5 px-6">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${priorityColors(item.priority)}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="py-4.5 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => onNavigateToTracking(item.orderId)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 font-bold transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Audit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls Footer */}
        {!loading && orders.length > 0 && (
          <div className="p-5 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400 font-semibold">
              Showing <span className="font-bold text-slate-800 dark:text-white">
                {Math.min(totalElements, (page - 1) * pageSize + 1)}-{Math.min(totalElements, page * pageSize)}
              </span> of <span className="font-bold text-slate-800 dark:text-white">{totalElements}</span> entries
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40 text-slate-600 dark:text-slate-400"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                    page === i + 1
                      ? 'bg-brand-blue-900 text-white shadow-md dark:bg-brand-orange-500'
                      : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40 text-slate-600 dark:text-slate-400"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default OrderManagementPage;
