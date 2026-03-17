package com.pratham.deliverytracking.service;

import com.pratham.deliverytracking.model.Shipment;
import com.pratham.deliverytracking.repository.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ShipmentService {

    @Autowired
    private ShipmentRepository repository;

    // 🔥 MAIN METHOD (called by controller)
    public Map<String, Object> getShipmentWithPrediction(String orderId) {

        Shipment shipment = repository.findByOrderId(orderId);
        if (shipment == null) {
    throw new RuntimeException("Order not found");
}

        double delayProbability = calculateDelay(
                shipment.getDistance(),
                shipment.getTrafficLevel(),
                shipment.getWarehouseLoad()
        );

        String reason = generateReason(shipment);

        Map<String, Object> response = new HashMap<>();

response.put("orderId", shipment.getOrderId());
response.put("status", shipment.getStatus());
response.put("currentLocation", shipment.getCurrentLocation());

response.put("delayProbability", delayProbability);
response.put("delayCategory", getDelayCategory(delayProbability));
response.put("reason", reason);

return response;

        
    }

    // 🔥 DELAY CALCULATION (normalized logic)
    private double calculateDelay(int distance, int traffic, int warehouseLoad) {

        double distanceScore = distance / 1000.0;
        double trafficScore = traffic / 100.0;
        double warehouseScore = warehouseLoad / 100.0;

        double score = (distanceScore * 0.3) +
                       (trafficScore * 0.4) +
                       (warehouseScore * 0.3);

        if (score > 1) score = 1;

        return Math.round(score * 100.0) / 100.0;
    }

    // 🔥 AI-STYLE EXPLANATION
    private String generateReason(Shipment shipment) {

        int traffic = shipment.getTrafficLevel();
        int warehouse = shipment.getWarehouseLoad();
        int distance = shipment.getDistance();

        StringBuilder reason = new StringBuilder();

        // Traffic logic
        if (traffic > 70) {
            reason.append("High traffic congestion");
        } else if (traffic > 40) {
            reason.append("Moderate traffic");
        } else {
            reason.append("Low traffic");
        }

        // Warehouse logic
        if (warehouse > 80) {
            reason.append(" and heavy warehouse load");
        } else if (warehouse > 50) {
            reason.append(" and moderate warehouse load");
        } else {
            reason.append(" and smooth warehouse operations");
        }

        // Distance logic
        if (distance > 500) {
            reason.append(", long distance shipment");
        }

        reason.append(" affecting delivery time");

        return reason.toString();
    }

    // 🔥 DELAY CATEGORY (Low / Medium / High)
    private String getDelayCategory(double probability) {

        if (probability < 0.3) {
            return "Low";
        } else if (probability < 0.7) {
            return "Medium";
        } else {
            return "High";
        }
    }
    public List<Map<String, Object>> getAllShipments() {

    List<Shipment> shipments = repository.findAll();
    List<Map<String, Object>> responseList = new ArrayList<>();

    for (Shipment shipment : shipments) {

        double delayProbability = calculateDelay(
                shipment.getDistance(),
                shipment.getTrafficLevel(),
                shipment.getWarehouseLoad()
        );

        Map<String, Object> response = new HashMap<>();

        response.put("orderId", shipment.getOrderId());
        response.put("status", shipment.getStatus());
        response.put("currentLocation", shipment.getCurrentLocation());
        response.put("delayProbability", delayProbability);
        response.put("delayCategory", getDelayCategory(delayProbability));

        responseList.add(response);
    }

    return responseList;
}
public Map<String, Object> getDashboardStats() {

    List<Shipment> shipments = repository.findAll();

    int total = shipments.size();
    int highRisk = 0;
    double totalDelay = 0;

    for (Shipment s : shipments) {

        double delay = calculateDelay(
                s.getDistance(),
                s.getTrafficLevel(),
                s.getWarehouseLoad()
        );

        totalDelay += delay;

        if (delay > 0.7) {
            highRisk++;
        }
    }

    double avgDelay = total == 0 ? 0 : totalDelay / total;

    Map<String, Object> stats = new HashMap<>();
    stats.put("totalOrders", total);
    stats.put("averageDelay", Math.round(avgDelay * 100.0) / 100.0);
    stats.put("highRiskOrders", highRisk);

    return stats;
}
}