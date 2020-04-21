package com.example.ghostkitchen.repo;

import com.example.ghostkitchen.model.RestaurantCustomer;
import org.springframework.data.repository.CrudRepository;

public interface RestaurantCustomerRepo extends CrudRepository<RestaurantCustomer, Long> {
    RestaurantCustomer findByUser_Id(Long id);
}
