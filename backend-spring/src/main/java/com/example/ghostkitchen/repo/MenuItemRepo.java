package com.example.ghostkitchen.repo;

import com.example.ghostkitchen.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MenuItemRepo extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByRestaurantId(Long restaurantId);

    List<MenuItem> findByOrder_OrderNumber(UUID orderNumber);
}
