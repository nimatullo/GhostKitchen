package com.example.ghostkitchen.repo;

import com.example.ghostkitchen.model.RestaurantCustomer;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RestaurantCustomerRepo extends CrudRepository<RestaurantCustomer, Long> {
    RestaurantCustomer findByUser_IdAndRestaurantId(Long userId, Long restaurantId);
    List<RestaurantCustomer> findAllByRestaurantIdOrderByNumberOfPreviousOrdersDesc(Long id);
    List<RestaurantCustomer> findAllByRestaurantId(Long id);
}
