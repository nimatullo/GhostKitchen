package com.example.ghostkitchen.controller;

import com.example.ghostkitchen.details.UserPrincipal;
import com.example.ghostkitchen.model.*;
import com.example.ghostkitchen.payload.ApiResponse;
import com.example.ghostkitchen.payload.OrderRequest;
import com.example.ghostkitchen.payload.OrderResponse;
import com.example.ghostkitchen.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
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

    @Autowired
    DeliveryRepo deliveryRepo;

    @Autowired
    DeliveryController deliveryController;

    @Autowired
    RestaurantCustomerRepo restaurantCustomerRepo;

    @PostMapping("/restaurants/{id}/submitOrder")
    public ResponseEntity<?> submitOrder(@CurrentUser UserPrincipal principal,@PathVariable Long id,
                                         @RequestBody OrderRequest request) {
        Restaurant RESTAURANT = restaurantRepo.findById(id).get();
        User CURRENT_USER = userRepository.findById(principal.getId()).get();
        Delivery DELIVERY = deliveryRepo.save(new Delivery());
        Order order = new Order(CURRENT_USER,CURRENT_USER.getPayment(),UUID.randomUUID(),request.getTotal(),
                request.getNumberOfItems(),RESTAURANT, DELIVERY);
        order.setItems(CURRENT_USER.getCart().getItems()
        .stream()
        .map(cartItem -> menuItemRepo.findById(cartItem.getMenuItemId()).get())
        .collect(Collectors.toList()));
        RestaurantCustomer customer = restaurantCustomerRepo.findByUser_IdAndRestaurantId(CURRENT_USER.getId(), RESTAURANT.getId());
        RESTAURANT.addCustomer(Objects.requireNonNullElseGet(customer, () -> new RestaurantCustomer(CURRENT_USER, RESTAURANT)));
        restaurantRepo.save(RESTAURANT);
        orderRepo.save(order);
        DELIVERY.setOrder(order);
        deliveryRepo.save(DELIVERY);
        CURRENT_USER.getCart().emptyCart();
        userRepository.save(CURRENT_USER);
        return ResponseEntity.ok(new OrderResponse(order));
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
        return ResponseEntity.ok(new OrderResponse(order));
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
            response.setMenuItems(order.getItems());
        });
        return ResponseEntity.ok(response);
    }

    @GetMapping("user/pastOrders")
    public ResponseEntity<?> getPastOrders(@CurrentUser UserPrincipal principal) {
        Optional<User> foundUser = userRepository.findById(principal.getId());
        User currentUser = null;
        if (foundUser.isPresent()) {
            currentUser = foundUser.get();
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false,"User cannot be found"),HttpStatus.NOT_FOUND);
        }
        List<OrderResponse> pastOrders =
                orderRepo.findByUser_Id(principal.getId())
                        .stream()
                        .map(OrderResponse::new).collect(Collectors.toList());
        return ResponseEntity.ok(pastOrders);
    }
}
