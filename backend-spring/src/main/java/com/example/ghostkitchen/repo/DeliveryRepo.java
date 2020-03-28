package com.example.ghostkitchen.repo;

import com.example.ghostkitchen.model.Delivery;
import com.example.ghostkitchen.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DeliveryRepo extends CrudRepository<Delivery, Long> {
    List<Delivery> findByDeliveryPerson_Id(Long id);

    List<Delivery> findByDeliveredFalseAndDeliveryPersonIsNull();
}
