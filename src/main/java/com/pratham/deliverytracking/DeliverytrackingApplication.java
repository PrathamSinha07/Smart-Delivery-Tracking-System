package com.pratham.deliverytracking;

import com.pratham.deliverytracking.model.Shipment;
import com.pratham.deliverytracking.repository.ShipmentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DeliverytrackingApplication {

	public static void main(String[] args) {
		SpringApplication.run(DeliverytrackingApplication.class, args);
	}

	@Bean
	public CommandLineRunner seedData(ShipmentRepository repository) {
		return args -> {
			if (repository.count() == 0) {
				System.out.println("Seeding database with default shipments...");

				Shipment s1 = new Shipment();
				s1.setOrderId("ORD101");
				s1.setOrigin("Mumbai Hub");
				s1.setDestination("Delhi Gateway");
				s1.setCurrentLocation("Jaipur Intermediate Sorting Hub");
				s1.setStatus("In Transit");
				s1.setDistance(1450);
				s1.setWarehouseLoad(65);
				s1.setTrafficLevel(75);
				repository.save(s1);

				Shipment s2 = new Shipment();
				s2.setOrderId("ORD102");
				s2.setOrigin("Bangalore Logistics Center");
				s2.setDestination("Pune Warehouse");
				s2.setCurrentLocation("Pune Warehouse");
				s2.setStatus("Delivered");
				s2.setDistance(840);
				s2.setWarehouseLoad(25);
				s2.setTrafficLevel(15);
				repository.save(s2);

				Shipment s3 = new Shipment();
				s3.setOrderId("ORD103");
				s3.setOrigin("Chennai Seaport Hub");
				s3.setDestination("Kolkata Depot");
				s3.setCurrentLocation("Visakhapatnam Warehouse");
				s3.setStatus("Delayed");
				s3.setDistance(1660);
				s3.setWarehouseLoad(92);
				s3.setTrafficLevel(85);
				repository.save(s3);

				Shipment s4 = new Shipment();
				s4.setOrderId("ORD104");
				s4.setOrigin("Delhi Gateway");
				s4.setDestination("Gurugram office");
				s4.setCurrentLocation("Gurugram Hub");
				s4.setStatus("Out for Delivery");
				s4.setDistance(45);
				s4.setWarehouseLoad(40);
				s4.setTrafficLevel(60);
				repository.save(s4);

				Shipment s5 = new Shipment();
				s5.setOrderId("ORD105");
				s5.setOrigin("Pune Logistics Hub");
				s5.setDestination("Mumbai Office");
				s5.setCurrentLocation("Pune Logistics Hub");
				s5.setStatus("Packed");
				s5.setDistance(150);
				s5.setWarehouseLoad(80);
				s5.setTrafficLevel(20);
				repository.save(s5);

				System.out.println("Seeding complete. Added 5 shipments.");
			}
		};
	}
}
