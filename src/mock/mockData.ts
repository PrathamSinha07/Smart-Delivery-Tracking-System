export interface TimelineStep {
  status: string;
  location: string;
  time: string;
  completed: boolean;
}

export interface ShipmentDetails {
  orderId: string;
  status: string;
  origin: string;
  destination: string;
  currentLocation: string;
  distance: number;
  warehouseLoad: number;
  trafficLevel: number;
  delayProbability: number;
  delayCategory: 'Low' | 'Medium' | 'High';
  reason: string;
  expectedDelivery: string;
  priority: 'Low' | 'Medium' | 'High';
  packageInfo: {
    weight: string;
    dimensions: string;
    contents: string;
    courier: string;
  };
  senderDetails: {
    name: string;
    address: string;
    city: string;
    phone: string;
  };
  receiverDetails: {
    name: string;
    address: string;
    city: string;
    phone: string;
  };
  warehouseInfo: {
    name: string;
    manager: string;
    phone: string;
    loadCapacity: string;
  };
  timeline: TimelineStep[];
}

export interface DashboardStats {
  totalOrders: number;
  activeDeliveries: number;
  delivered: number;
  delayed: number;
  avgDeliveryTime: string;
  successRate: number;
  highRiskOrders: number;
}

export interface DeliveriesPerDay {
  date: string;
  count: number;
  delayed: number;
}

export interface OrdersByCity {
  city: string;
  count: number;
}

export interface DelayDistribution {
  name: string;
  value: number;
  color: string;
}

export interface DashboardCharts {
  deliveriesPerDay: DeliveriesPerDay[];
  ordersByCity: OrdersByCity[];
  delayDistribution: DelayDistribution[];
}

export const mockShipments: Record<string, ShipmentDetails> = {
  "ORD101": {
    orderId: "ORD101",
    status: "In Transit",
    origin: "Mumbai Hub",
    destination: "Delhi Gateway",
    currentLocation: "Jaipur Intermediate Sorting Hub",
    distance: 1450,
    warehouseLoad: 65,
    trafficLevel: 75,
    delayProbability: 0.58,
    delayCategory: "Medium",
    reason: "Moderate traffic and heavy warehouse load, long distance shipment affecting delivery time",
    expectedDelivery: "2026-07-09",
    priority: "Medium",
    packageInfo: {
      weight: "4.5 kg",
      dimensions: "30x20x15 cm",
      contents: "High-density server components",
      courier: "FedEx Express"
    },
    senderDetails: {
      name: "Quantum Tech Labs",
      address: "Bldg 4, Sector 7, MIDC",
      city: "Mumbai",
      phone: "+91 98765 43210"
    },
    receiverDetails: {
      name: "Apex Data Solutions",
      address: "Plot 12, Phase 3, Okhla Ind Area",
      city: "New Delhi",
      phone: "+91 87654 32109"
    },
    warehouseInfo: {
      name: "Jaipur Intermediate Sorting Hub",
      manager: "Aarav Sharma",
      phone: "+91 99112 23344",
      loadCapacity: "65%"
    },
    timeline: [
      { status: "Order Placed", location: "Mumbai Hub", time: "2026-07-05 09:30 AM", completed: true },
      { status: "Packed", location: "Mumbai Hub", time: "2026-07-05 01:15 PM", completed: true },
      { status: "Dispatched", location: "Mumbai Hub", time: "2026-07-05 06:45 PM", completed: true },
      { status: "In Transit", location: "Jaipur Intermediate Sorting Hub", time: "2026-07-06 11:30 AM", completed: true },
      { status: "Out for Delivery", location: "Delhi Gateway", time: "Pending", completed: false },
      { status: "Delivered", location: "Apex Data Solutions", time: "Pending", completed: false }
    ]
  },
  "ORD102": {
    orderId: "ORD102",
    status: "Delivered",
    origin: "Bangalore Logistics Center",
    destination: "Pune Warehouse",
    currentLocation: "Pune Warehouse",
    distance: 840,
    warehouseLoad: 25,
    trafficLevel: 15,
    delayProbability: 0.12,
    delayCategory: "Low",
    reason: "Low traffic and smooth warehouse operations, short distance shipment affecting delivery time",
    expectedDelivery: "2026-07-06",
    priority: "High",
    packageInfo: {
      weight: "1.2 kg",
      dimensions: "15x15x10 cm",
      contents: "Medical Grade Sensors",
      courier: "Amazon Logistics"
    },
    senderDetails: {
      name: "BioHealth Diagnostics",
      address: "12A, Electronic City Phase 1",
      city: "Bangalore",
      phone: "+91 99887 76655"
    },
    receiverDetails: {
      name: "Red Cross Hospital",
      address: "M.G. Road, Camp",
      city: "Pune",
      phone: "+91 88776 65544"
    },
    warehouseInfo: {
      name: "Pune Delivery Hub",
      manager: "Sunita Deshmukh",
      phone: "+91 99881 12233",
      loadCapacity: "25%"
    },
    timeline: [
      { status: "Order Placed", location: "Bangalore Logistics Center", time: "2026-07-04 08:00 AM", completed: true },
      { status: "Packed", location: "Bangalore Logistics Center", time: "2026-07-04 11:00 AM", completed: true },
      { status: "Dispatched", location: "Bangalore Logistics Center", time: "2026-07-04 04:00 PM", completed: true },
      { status: "In Transit", location: "Pune Hub", time: "2026-07-05 09:00 AM", completed: true },
      { status: "Out for Delivery", location: "Pune Hub", time: "2026-07-06 09:30 AM", completed: true },
      { status: "Delivered", location: "Red Cross Hospital", time: "2026-07-06 01:10 PM", completed: true }
    ]
  },
  "ORD103": {
    orderId: "ORD103",
    status: "Delayed",
    origin: "Chennai Seaport Hub",
    destination: "Kolkata Depot",
    currentLocation: "Visakhapatnam Warehouse",
    distance: 1660,
    warehouseLoad: 92,
    trafficLevel: 85,
    delayProbability: 0.89,
    delayCategory: "High",
    reason: "High traffic congestion and heavy warehouse load, long distance shipment affecting delivery time",
    expectedDelivery: "2026-07-07",
    priority: "Low",
    packageInfo: {
      weight: "25.0 kg",
      dimensions: "100x80x60 cm",
      contents: "Heavy Industrial Valve",
      courier: "Delhivery Heavy"
    },
    senderDetails: {
      name: "Aditya Heavy Industries",
      address: "Seaport Industrial Zone",
      city: "Chennai",
      phone: "+91 76543 21098"
    },
    receiverDetails: {
      name: "Kolkata Steel Works",
      address: "Howrah Industrial Area",
      city: "Kolkata",
      phone: "+91 65432 10987"
    },
    warehouseInfo: {
      name: "Visakhapatnam Transit Hub",
      manager: "K. R. Rao",
      phone: "+91 99008 87766",
      loadCapacity: "92%"
    },
    timeline: [
      { status: "Order Placed", location: "Chennai Seaport Hub", time: "2026-07-03 10:00 AM", completed: true },
      { status: "Packed", location: "Chennai Seaport Hub", time: "2026-07-03 04:00 PM", completed: true },
      { status: "Dispatched", location: "Chennai Seaport Hub", time: "2026-07-04 09:00 AM", completed: true },
      { status: "In Transit", location: "Visakhapatnam Warehouse", time: "2026-07-05 02:00 PM", completed: true },
      { status: "Out for Delivery", location: "Kolkata Depot", time: "Pending", completed: false },
      { status: "Delivered", location: "Kolkata Steel Works", time: "Pending", completed: false }
    ]
  },
  "ORD104": {
    orderId: "ORD104",
    status: "Out for Delivery",
    origin: "Delhi Gateway",
    destination: "Gurugram office",
    currentLocation: "Gurugram Hub",
    distance: 45,
    warehouseLoad: 40,
    trafficLevel: 60,
    delayProbability: 0.35,
    delayCategory: "Medium",
    reason: "Moderate traffic and smooth warehouse operations, short distance shipment affecting delivery time",
    expectedDelivery: "2026-07-08",
    priority: "High",
    packageInfo: {
      weight: "0.8 kg",
      dimensions: "20x15x5 cm",
      contents: "Corporate Laptops",
      courier: "BlueDart Express"
    },
    senderDetails: {
      name: "Global IT Asset Hub",
      address: "Okhla Phase 1",
      city: "Delhi",
      phone: "+91 91122 33445"
    },
    receiverDetails: {
      name: "Initech India",
      address: "Cyber City, Phase 2",
      city: "Gurugram",
      phone: "+91 82233 44556"
    },
    warehouseInfo: {
      name: "Gurugram Local Hub",
      manager: "Rohit Verma",
      phone: "+91 98877 66554",
      loadCapacity: "40%"
    },
    timeline: [
      { status: "Order Placed", location: "Delhi Gateway", time: "2026-07-07 09:00 AM", completed: true },
      { status: "Packed", location: "Delhi Gateway", time: "2026-07-07 11:30 AM", completed: true },
      { status: "Dispatched", location: "Delhi Gateway", time: "2026-07-07 02:00 PM", completed: true },
      { status: "In Transit", location: "Gurugram Hub", time: "2026-07-08 05:00 AM", completed: true },
      { status: "Out for Delivery", location: "Gurugram Hub", time: "2026-07-08 09:00 AM", completed: true },
      { status: "Delivered", location: "Initech India", time: "Pending", completed: false }
    ]
  },
  "ORD105": {
    orderId: "ORD105",
    status: "Packed",
    origin: "Pune Logistics Hub",
    destination: "Mumbai Office",
    currentLocation: "Pune Logistics Hub",
    distance: 150,
    warehouseLoad: 80,
    trafficLevel: 20,
    delayProbability: 0.28,
    delayCategory: "Low",
    reason: "Low traffic and heavy warehouse load, short distance shipment affecting delivery time",
    expectedDelivery: "2026-07-09",
    priority: "Medium",
    packageInfo: {
      weight: "2.4 kg",
      dimensions: "25x20x10 cm",
      contents: "Office stationary supplies",
      courier: "Delhivery"
    },
    senderDetails: {
      name: "Standard Stationery Corp",
      address: "Chinchwad Industrial Belt",
      city: "Pune",
      phone: "+91 94455 66778"
    },
    receiverDetails: {
      name: "General FinTech Corp",
      address: "Nariman Point",
      city: "Mumbai",
      phone: "+91 85566 77889"
    },
    warehouseInfo: {
      name: "Pune Logistics Hub",
      manager: "Vikas Patil",
      phone: "+91 97788 99001",
      loadCapacity: "80%"
    },
    timeline: [
      { status: "Order Placed", location: "Pune Logistics Hub", time: "2026-07-07 04:00 PM", completed: true },
      { status: "Packed", location: "Pune Logistics Hub", time: "2026-07-08 08:30 AM", completed: true },
      { status: "Dispatched", location: "Pending", time: "Pending", completed: false },
      { status: "In Transit", location: "Pending", time: "Pending", completed: false },
      { status: "Out for Delivery", location: "Pending", time: "Pending", completed: false },
      { status: "Delivered", location: "Pending", time: "Pending", completed: false }
    ]
  }
};

export const mockDashboardStats: DashboardStats = {
  totalOrders: 1450,
  activeDeliveries: 345,
  delivered: 1045,
  delayed: 60,
  avgDeliveryTime: "24.8 hrs",
  successRate: 95.8,
  highRiskOrders: 18
};

export const mockDashboardCharts: DashboardCharts = {
  deliveriesPerDay: [
    { date: "Jul 01", count: 120, delayed: 4 },
    { date: "Jul 02", count: 135, delayed: 3 },
    { date: "Jul 03", count: 142, delayed: 8 },
    { date: "Jul 04", count: 110, delayed: 2 },
    { date: "Jul 05", count: 155, delayed: 10 },
    { date: "Jul 06", count: 160, delayed: 5 },
    { date: "Jul 07", count: 175, delayed: 3 }
  ],
  ordersByCity: [
    { city: "Mumbai", count: 420 },
    { city: "Delhi", count: 360 },
    { city: "Bangalore", count: 310 },
    { city: "Pune", count: 180 },
    { city: "Chennai", count: 140 },
    { city: "Kolkata", count: 120 }
  ],
  delayDistribution: [
    { name: "Low Risk (<30%)", value: 1120, color: "#10B981" },
    { name: "Medium Risk (30-70%)", value: 270, color: "#F59E0B" },
    { name: "High Risk (>70%)", value: 60, color: "#EF4444" }
  ]
};
