# 📦 Smart Delivery Tracking System

A full-stack logistics tracking system with delay prediction and real-time dashboard insights.

---

## 🚀 Features

- 📍 Track shipment using Order ID
- 📊 Dashboard with analytics:
  - Total Orders
  - Average Delay
  - High Risk Shipments
- 🤖 Delay Prediction System using:
  - Distance
  - Traffic Level
  - Warehouse Load
- 💡 AI-style explanation for delay reasons
- ⚠️ Error handling for invalid Order IDs
- 📦 Multiple shipment tracking

---

## 🛠 Tech Stack

- Backend: Spring Boot (Java)
- Database: PostgreSQL
- Frontend: HTML, CSS, JavaScript
- ORM: Spring Data JPA

---

## 📸 How to Use

1. Run backend (Spring Boot)
2. Open `index.html`
3. Enter Order ID:
   - ORD101
   - ORD102
   - ORD103

---

## 🧠 System Design

The system calculates delay probability based on:

- Distance (normalized)
- Traffic Level
- Warehouse Load

Then classifies delay into:
- Low
- Medium
- High

---

## 📊 Dashboard

- Displays real-time shipment analytics
- Helps identify high-risk deliveries
- Provides operational insights

---

## 🔮 Future Enhancements

- Live tracking with GPS APIs
- Google Maps integration
- Authentication system
- Deployment on cloud (AWS/Render)

---

## 👨‍💻 Author

**Pratham Sinha**