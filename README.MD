# Smart Delivery Tracking System

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