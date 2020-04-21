package com.example.ghostkitchen.repo;

import com.example.ghostkitchen.model.RestaurantCustomer;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RestaurantCustomerRepo extends CrudRepository<RestaurantCustomer, Long> {
    RestaurantCustomer findByUser_Id(Long id);
    List<RestaurantCustomer> findByRestaurantIdOrderByNumberOfPreviousOrdersDesc(Long id);
}
