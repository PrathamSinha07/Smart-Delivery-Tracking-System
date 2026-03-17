package com.pratham.deliverytracking.controller;

import com.pratham.deliverytracking.service.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ShipmentController {

    @Autowired
    private ShipmentService service;

    @GetMapping("/track/{orderId}")
    public Map<String, Object> trackOrder(@PathVariable String orderId) {
        return service.getShipmentWithPrediction(orderId);
    }
    @GetMapping("/all")
public List<Map<String, Object>> getAllShipments() {
    return service.getAllShipments();
}
@GetMapping("/dashboard")
public Map<String, Object> getDashboard() {
    return service.getDashboardStats();
}
}