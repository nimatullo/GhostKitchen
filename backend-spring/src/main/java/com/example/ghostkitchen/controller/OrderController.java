package com.example.ghostkitchen.controller;

import com.example.ghostkitchen.details.UserPrincipal;
import com.example.ghostkitchen.model.CurrentUser;
import com.example.ghostkitchen.model.Order;
import com.example.ghostkitchen.model.Restaurant;
import com.example.ghostkitchen.model.User;
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
import java.util.stream.Collectors;

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
        Optional<User> foundUser = userRepository.findById(principal.getId());
        Restaurant restaurant = null;
        User currentUser = null;
        if (foundRestaurant.isPresent() && foundUser.isPresent()) {
            restaurant = foundRestaurant.get();
            currentUser = foundUser.get();
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false,"Restaurant doesn't exist"),HttpStatus.NOT_FOUND);
        }
        Order order = new Order(currentUser,currentUser.getPayment(),UUID.randomUUID(),request.getTotal(),
                request.getNumberOfItems(),restaurant);
        order.setItems(request
                .getMenuItems()
                .stream()
                .map(item -> menuItemRepo.findById(item.getId()).get())
                .collect(Collectors.toList())
        );
        orderRepo.save(order);
        currentUser.getCart().emptyCart();
        return ResponseEntity.ok(new ApiResponse(true,"Order has been placed"));
    }

    @GetMapping("/orderConfirmation/{orderNumber}")
    public ResponseEntity<?> getOrderConfirmation(@PathVariable UUID orderNumber) {
        Optional<Order> foundOrder = orderRepo.findByOrderNumber(orderNumber);
        Order order = null;
        if (foundOrder.isPresent()) {
            order = foundOrder.get();
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false,"Order cannot be found"),HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new OrderResponse(order.getOrderNumber(),order.getNumberOfItems(),order.getTotal()
                ,order.getItems()));
    }

    /*
     * TODO: Change this method so it grabs the restaurant ID by using the owner's restaurant ID.
     */
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
            response.setMenuItems(order.getItems());
        });
        return ResponseEntity.ok(response);
    }
}
