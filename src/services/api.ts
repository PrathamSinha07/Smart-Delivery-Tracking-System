import { 
  mockShipments, 
  mockDashboardStats, 
  mockDashboardCharts 
} from '../mock/mockData';
import type { 
  ShipmentDetails, 
  DashboardStats, 
  DashboardCharts 
} from '../mock/mockData';

// 🔥 TOGGLE SWITCH TO CONNECT TO LIVE SPRING BOOT BACKEND
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Base API URL (proxied via Vite when running locally)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Helper to simulate network latency for realistic feel in mock mode
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Delay Calculator Formula (matching Spring Boot ShipmentService.java)
export const calculateDelayScore = (distance: number, traffic: number, warehouseLoad: number) => {
  const distanceScore = distance / 1000.0;
  const trafficScore = traffic / 100.0;
  const warehouseScore = warehouseLoad / 100.0;

  let score = (distanceScore * 0.3) + (trafficScore * 0.4) + (warehouseScore * 0.3);
  if (score > 1) score = 1;
  
  const probability = Math.round(score * 100);
  
  let category: 'Low' | 'Medium' | 'High' = 'Low';
  let riskLevel: 'Green' | 'Yellow' | 'Red' = 'Green';
  let recommendation = '';

  if (probability < 30) {
    category = 'Low';
    riskLevel = 'Green';
    recommendation = "Optimal routing. Keep standard dispatch schedule. Operations running smoothly.";
  } else if (probability < 70) {
    category = 'Medium';
    riskLevel = 'Yellow';
    recommendation = "Moderate risk. Consider alternative routes or dispatching during off-peak hours. Alert receiving warehouse.";
  } else {
    category = 'High';
    riskLevel = 'Red';
    recommendation = "High risk of delay! Recommend re-routing through secondary hubs or rescheduling delivery. Reduce warehouse load queue.";
  }

  // Generate explanation
  let reason = "";
  if (traffic > 70) reason += "High traffic congestion";
  else if (traffic > 40) reason += "Moderate traffic";
  else reason += "Low traffic";

  if (warehouseLoad > 80) reason += " and heavy warehouse load";
  else if (warehouseLoad > 50) reason += " and moderate warehouse load";
  else reason += " and smooth warehouse operations";

  if (distance > 500) reason += ", long distance shipment";
  reason += " affecting delivery time";

  return {
    delayProbability: score, // raw
    probabilityPercent: probability, // 0 - 100
    delayCategory: category,
    riskLevel,
    reason,
    recommendation
  };
};

export const apiService = {
  // 1. GET SHIPMENT BY ID
  async getShipment(trackingId: string): Promise<ShipmentDetails> {
    if (USE_MOCK) {
      await delay(600);
      const shipment = mockShipments[trackingId];
      if (!shipment) throw new Error("Shipment not found");
      return shipment;
    }

    // Call Spring Boot GET /api/track/{orderId}
    const response = await fetch(`${BASE_URL}/api/track/${trackingId}`);
    if (!response.ok) {
      throw new Error(`Shipment ${trackingId} not found`);
    }
    const data = await response.json();
    
    // Spring Boot response contains: orderId, status, currentLocation, delayProbability, delayCategory, reason
    // We map it to our detailed frontend UI structure, fetching local details if we already know about it,
    // or generating realistic values if it's a new database entry.
    const knownShipment = mockShipments[data.orderId];
    
    const mappedTimeline = knownShipment?.timeline || [
      { status: "Order Placed", location: "Origin Hub", time: "Just now", completed: true },
      { status: "Packed", location: "Origin Hub", time: "Just now", completed: data.status !== 'Order Placed' },
      { status: "Dispatched", location: "Origin Hub", time: "Just now", completed: !['Order Placed', 'Packed'].includes(data.status) },
      { status: "In Transit", location: data.currentLocation, time: "Active", completed: ['In Transit', 'Out for Delivery', 'Delivered'].includes(data.status) },
      { status: "Out for Delivery", location: "Local Station", time: "Pending", completed: ['Out for Delivery', 'Delivered'].includes(data.status) },
      { status: "Delivered", location: "Destination", time: "Pending", completed: data.status === 'Delivered' }
    ];

    return {
      orderId: data.orderId,
      status: data.status,
      currentLocation: data.currentLocation,
      origin: knownShipment?.origin || "Mumbai Hub",
      destination: knownShipment?.destination || "Delhi Gateway",
      distance: knownShipment?.distance || 800,
      warehouseLoad: knownShipment?.warehouseLoad || 45,
      trafficLevel: knownShipment?.trafficLevel || 50,
      delayProbability: data.delayProbability,
      delayCategory: data.delayCategory as 'Low' | 'Medium' | 'High',
      reason: data.reason,
      expectedDelivery: knownShipment?.expectedDelivery || "TBD",
      priority: knownShipment?.priority || "Medium",
      packageInfo: knownShipment?.packageInfo || {
        weight: "2.5 kg",
        dimensions: "20x20x10 cm",
        contents: "Logistics Items",
        courier: "DHL Express"
      },
      senderDetails: knownShipment?.senderDetails || {
        name: "Standard Vendor Co",
        address: "Industrial Lane",
        city: "Mumbai",
        phone: "+91 99999 88888"
      },
      receiverDetails: knownShipment?.receiverDetails || {
        name: "Corporate Client Ltd",
        address: "Tech Tech Tower",
        city: "Delhi",
        phone: "+91 77777 66666"
      },
      warehouseInfo: knownShipment?.warehouseInfo || {
        name: "Regional Sorting Center",
        manager: "Karan Johar",
        phone: "+91 91919 28282",
        loadCapacity: "45%"
      },
      timeline: mappedTimeline
    };
  },

  // 2. GET DASHBOARD STATS
  async getDashboardStats(): Promise<DashboardStats> {
    if (USE_MOCK) {
      await delay(500);
      return mockDashboardStats;
    }

    // Call Spring Boot GET /api/dashboard
    const response = await fetch(`${BASE_URL}/api/dashboard`);
    if (!response.ok) throw new Error("Failed to load dashboard statistics");
    const data = await response.json();
    
    // Backend returns: totalOrders, averageDelay, highRiskOrders
    // We extrapolate the other fields so that the dashboard visuals remain cohesive
    return {
      totalOrders: data.totalOrders,
      activeDeliveries: Math.round(data.totalOrders * 0.24), // Extrapolate active (24%)
      delivered: Math.round(data.totalOrders * 0.72),        // Extrapolate delivered (72%)
      delayed: data.highRiskOrders,                         // Map high-risk to delayed count
      avgDeliveryTime: `${Math.round(data.averageDelay * 100)} hrs`,
      successRate: 95.8,
      highRiskOrders: data.highRiskOrders
    };
  },

  // 3. GET DASHBOARD CHARTS
  async getDashboardCharts(): Promise<DashboardCharts> {
    if (USE_MOCK) {
      await delay(500);
      return mockDashboardCharts;
    }

    // Connect to Spring Boot GET /api/all and calculate aggregates dynamically based on database entries
    try {
      const response = await fetch(`${BASE_URL}/api/all`);
      if (!response.ok) return mockDashboardCharts;
      
      const shipments = await response.json();
      if (!shipments || shipments.length === 0) return mockDashboardCharts;
      
      // Calculate city distributions
      const cityCount: Record<string, number> = {};
      let lowRisk = 0, medRisk = 0, highRisk = 0;
      
      shipments.forEach((s: any) => {
        // Increment city counter
        const city = s.currentLocation.split(' ')[0] || "Other";
        cityCount[city] = (cityCount[city] || 0) + 1;
        
        // Probability calculations
        if (s.delayProbability < 0.3) lowRisk++;
        else if (s.delayProbability < 0.7) medRisk++;
        else highRisk++;
      });
      
      const ordersByCity = Object.entries(cityCount).map(([city, count]) => ({
        city,
        count
      })).sort((a, b) => b.count - a.count).slice(0, 6);
      
      const delayDistribution = [
        { name: "Low Risk (<30%)", value: lowRisk, color: "#10B981" },
        { name: "Medium Risk (30-70%)", value: medRisk, color: "#F59E0B" },
        { name: "High Risk (>70%)", value: highRisk, color: "#EF4444" }
      ];
      
      return {
        deliveriesPerDay: mockDashboardCharts.deliveriesPerDay, // Keep historic timeline
        ordersByCity: ordersByCity.length > 0 ? ordersByCity : mockDashboardCharts.ordersByCity,
        delayDistribution
      };
    } catch (e) {
      console.warn("Error deriving chart metrics from live backend, falling back to mock charts", e);
      return mockDashboardCharts;
    }
  },

  // 4. PREDICT DELAY (POST)
  async predictDelay(payload: { distance: number; trafficLevel: number; warehouseLoad: number }) {
    await delay(700);
    // Calculated client-side to ensure identical formula outputs instantly
    const result = calculateDelayScore(payload.distance, payload.trafficLevel, payload.warehouseLoad);
    return result;
  },

  // 5. GET ORDERS (PAGINATED, SORTED & FILTERED)
  async getOrders(params: { 
    page: number; 
    size: number; 
    status?: string; 
    search?: string;
  }): Promise<{ content: ShipmentDetails[]; totalElements: number; totalPages: number }> {
    await delay(600);
    let allItems = Object.values(mockShipments);
    
    // In live backend mode, we first pull from GET /api/all
    if (!USE_MOCK) {
      try {
        const response = await fetch(`${BASE_URL}/api/all`);
        if (response.ok) {
          const liveList = await response.json();
          // Map backend items to ShipmentDetails structures
          allItems = await Promise.all(liveList.map((liveItem: any) => 
            this.getShipment(liveItem.orderId).catch(() => mockShipments[liveItem.orderId] || {
              orderId: liveItem.orderId,
              status: liveItem.status,
              currentLocation: liveItem.currentLocation,
              origin: "Mumbai Hub",
              destination: "Delhi Gateway",
              distance: 500,
              warehouseLoad: 40,
              trafficLevel: 40,
              delayProbability: liveItem.delayProbability,
              delayCategory: liveItem.delayCategory,
              reason: "Pending analysis",
              expectedDelivery: "2026-07-10",
              priority: "Medium",
              packageInfo: { weight: "2.0 kg", dimensions: "10x10x10 cm", contents: "Standard Box", courier: "Default Courier" },
              senderDetails: { name: "Live Vendor", address: "Warehouse Lane", city: "Mumbai", phone: "+91 99999 99999" },
              receiverDetails: { name: "Live Client", address: "Office park", city: "Delhi", phone: "+91 88888 88888" },
              warehouseInfo: { name: liveItem.currentLocation, manager: "Admin", phone: "N/A", loadCapacity: "50%" },
              timeline: []
            })
          ));
        }
      } catch (err) {
        console.error("Failed to load live orders for table, falling back to mock", err);
      }
    }

    // Filter by Status
    if (params.status && params.status !== 'All') {
      allItems = allItems.filter(item => item.status.toLowerCase() === params.status?.toLowerCase());
    }

    // Filter by Search (orderId or recipient)
    if (params.search) {
      const q = params.search.toLowerCase();
      allItems = allItems.filter(item => 
        item.orderId.toLowerCase().includes(q) || 
        item.receiverDetails.name.toLowerCase().includes(q) ||
        item.destination.toLowerCase().includes(q)
      );
    }

    // Paginate
    const start = (params.page - 1) * params.size;
    const end = start + params.size;
    const paginatedItems = allItems.slice(start, end);

    return {
      content: paginatedItems,
      totalElements: allItems.length,
      totalPages: Math.ceil(allItems.length / params.size)
    };
  },

  // 6. HEALTH CHECK (Checks Spring Boot server status)
  async getHealthCheck() {
    try {
      const start = Date.now();
      const response = await fetch(`${BASE_URL}/api/dashboard`);
      const latency = Date.now() - start;
      
      if (response.ok) {
        return {
          status: 'UP',
          dbStatus: 'CONNECTED',
          latency: `${latency}ms`
        };
      }
    } catch (e) {}

    return {
      status: 'DOWN',
      dbStatus: 'DISCONNECTED',
      latency: 'N/A'
    };
  }
};
