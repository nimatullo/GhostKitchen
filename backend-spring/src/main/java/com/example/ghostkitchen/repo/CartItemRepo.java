package com.example.ghostkitchen.repo;

import com.example.ghostkitchen.model.CartItem;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CartItemRepo extends CrudRepository<CartItem, Long> {
    Optional<CartItem> findByName(String name);
}
