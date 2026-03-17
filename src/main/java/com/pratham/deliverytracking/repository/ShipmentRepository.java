package com.pratham.deliverytracking.repository;

import com.pratham.deliverytracking.model.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Long> {

    // Custom method for finding by orderId
    Shipment findByOrderId(String orderId);

    // ❌ NOT REQUIRED (already included)
    // List<Shipment> findAll();
}