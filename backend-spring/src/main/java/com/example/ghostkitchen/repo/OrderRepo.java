package com.example.ghostkitchen.repo;

import com.example.ghostkitchen.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepo extends JpaRepository<Order, Long> {
    List<Order> findByRestaurantId(Long id);
}
