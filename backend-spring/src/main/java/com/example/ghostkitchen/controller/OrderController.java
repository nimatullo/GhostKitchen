package com.example.ghostkitchen.controller;

import com.example.ghostkitchen.details.UserPrincipal;
import com.example.ghostkitchen.model.CurrentUser;
import com.example.ghostkitchen.model.MenuItem;
import com.example.ghostkitchen.model.Order;
import com.example.ghostkitchen.model.Restaurant;
import com.example.ghostkitchen.payload.ApiResponse;
import com.example.ghostkitchen.payload.OrderRequest;
import com.example.ghostkitchen.payload.OrderResponse;
import com.example.ghostkitchen.repo.MenuItemRepo;
import com.example.ghostkitchen.repo.OrderRepo;
import com.example.ghostkitchen.repo.RestaurantRepo;
import com.example.ghostkitchen.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class OrderController {
    @Autowired
    RestaurantRepo restaurantRepo;

    @Autowired
    OrderRepo orderRepo;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MenuItemRepo menuItemRepo;

    @PostMapping("/restaurants/{id}/submitOrder")
    public ResponseEntity<?> submitOrder(@CurrentUser UserPrincipal principal,@PathVariable Long id,
                                         @RequestBody OrderRequest request) {
        Optional<Restaurant> foundRestaurant = restaurantRepo.findById(id);
        Restaurant restaurant = null;
        if (foundRestaurant.isPresent()) {
            restaurant = foundRestaurant.get();
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false,"Restaurant doesn't exist"),HttpStatus.NOT_FOUND);
        }
        Order order = new Order();
        order.setNumberOfItems(request.getNumberOfItems());
        order.setTotal(request.getTotal());
        order.setUser(userRepository.findById(principal.getId()).get());
        order.setRestaurant(restaurant);
        order.setOrderNumber(UUID.randomUUID());
        request.getMenuItems().forEach(item -> {
            MenuItem newItem = menuItemRepo.findById(item.getId()).get();
            newItem.setOrder(order);
            menuItemRepo.save(newItem);
        });
        orderRepo.save(order);
        return ResponseEntity.ok(new ApiResponse(true,"Order has been placed"));
    }

    @GetMapping("/restaurants/{id}/pastOrders")
    public ResponseEntity<?> getPastOrders(@PathVariable Long id) {
        Optional<Restaurant> foundRestaurant = restaurantRepo.findById(id);
        Restaurant restaurant = null;
        if (foundRestaurant.isPresent()) {
            restaurant = foundRestaurant.get();
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false,"Restaurant doesn't exist"),HttpStatus.NOT_FOUND);
        }
        List<Order> orders = orderRepo.findByRestaurantId(restaurant.getId());
        OrderResponse response = new OrderResponse();
        orders.forEach(order -> {
            response.setNumberOfItems(order.getNumberOfItems());
            response.setTotal(order.getTotal());
            List<MenuItem> items = menuItemRepo.findByOrder_OrderNumber(order.getOrderNumber());
            response.setMenuItems(items);
        });
        return ResponseEntity.ok(response);
    }
}
