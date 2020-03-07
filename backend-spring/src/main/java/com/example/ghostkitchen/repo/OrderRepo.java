package com.example.ghostkitchen.repo;

import com.example.ghostkitchen.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderRepo extends JpaRepository<Order, Long> {
    List<Order> findByRestaurantId(Long id);

    Optional<Order> findByOrderNumber(UUID orderNumber);
}
