# Smart Delivery Tracking System

[![Live Deployment](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://deliverytracking.vercel.app/)
[![Vercel Status](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://deliverytracking.vercel.app/)
[![Spring Boot](https://img.shields.io/badge/Spring--Boot-v4.0.3-6DB33F?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)

A modern, reactive logistics management dashboard built to optimize and simulate global supply chain flows. The system features real-time telemetry, advanced order management filtering, and predictive, machine-learning-driven delivery delay risk monitoring.

🔗 **Live Deployment:** [https://deliverytracking.vercel.app/](https://deliverytracking.vercel.app/)

---

## ✨ Key Features Implemented

*   📊 **Interactive Analytics Dashboard:** Real-time telemetry monitoring scaled precisely for high-fidelity portfolio tracking (5 active high-complexity test nodes), integrating reactive analytics visualizations via Recharts.
*   📍 **Live Shipment & Status Tracking:** A responsive, node-based progress timeline tracing package states dynamically from "Order Placed" to final "Delivered" milestones.
*   🧠 **Predictive Delay Risk Meter:** A simulated client-side machine learning interface evaluating route latency indicators (Distance, Traffic Level, and Warehouse Congestion) to flag systemic delivery risks (Low, Medium, High).
*   📋 **Enterprise Data Table:** A full-scale order management matrix handling server-ready pagination, multi-column sorting, search filters, and status category tokens.

---

## 🛠️ Tech Stack Architecture

### Frontend Matrix
-   **Framework:** React 19 (TypeScript)
-   **Build Tooling:** Vite 8
-   **Styling:** Tailwind CSS (Dual Dark/Light Palette Adaptability) + PostCSS
-   **Visualizations:** Recharts
-   **Icons:** Lucide React

### Backend API Matrix
-   **Framework:** Spring Boot (Java 17)
-   **Database & ORM:** PostgreSQL + Spring Data JPA
-   **REST Endpoints:** Designed for high-speed Spring Boot integration:
    -   `GET /api/track/{orderId}`: Query individual shipment status and prediction data.
    -   `GET /api/all`: Retrieve list of all registered shipment nodes.
    -   `GET /api/dashboard`: Fetch aggregated portfolio analytics.

---

## ⚙️ Development Environment Variables Configuration

The application utilizes Vite-native environment variables to handle dual-mode runtime behavior (Mock Data Mode vs Live API Mode).

Configure the environment settings at the root directory level:

### 1. Local Development (`.env.development`)
```env
# Point to local proxy URL or relative endpoints
VITE_API_BASE_URL=
# Run locally with live Spring Boot API enabled
VITE_USE_MOCK=false
```

### 2. Production Deployment (`.env.production`)
```env
# Point to your production Spring Boot backend API domain
VITE_API_BASE_URL=https://your-production-backend-url.com
# Switch to mock data mode if the live backend is not publicly exposed
VITE_USE_MOCK=true
```

---

## 🚀 How to Run Locally

### Frontend Setup
1.  Navigate to the directory:
    ```bash
    npm install
    ```
2.  Launch the development server:
    ```bash
    npm run dev
    ```
3.  Access the UI at [http://localhost:3000](http://localhost:3000).

### Backend Setup (Spring Boot)
1.  Ensure a local PostgreSQL instance is running on port `5432` with database `delivery_tracking_system`.
2.  Start the Spring Boot server:
    ```bash
    mvnw.cmd spring-boot:run
    ```
3.  The backend runs on port `8081` and automatically seeds the database with 5 baseline tracking nodes (`ORD101` - `ORD105`).