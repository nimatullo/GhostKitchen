package com.example.ghostkitchen.repo;

import com.example.ghostkitchen.model.Restaurant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RestaurantRepo extends CrudRepository<Restaurant, Long> {
    Optional<Restaurant> findByRestaurantName(String name);

    Iterable<Restaurant> findAll();

    Restaurant findByOwner_Id(Long id);

}
