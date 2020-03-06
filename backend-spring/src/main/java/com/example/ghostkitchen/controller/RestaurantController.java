package com.example.ghostkitchen.controller;

import com.example.ghostkitchen.details.UserPrincipal;
import com.example.ghostkitchen.model.CurrentUser;
import com.example.ghostkitchen.model.MenuItem;
import com.example.ghostkitchen.model.Restaurant;
import com.example.ghostkitchen.payload.*;
import com.example.ghostkitchen.repo.MenuItemRepo;
import com.example.ghostkitchen.repo.OrderRepo;
import com.example.ghostkitchen.repo.RestaurantRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST endpoints for Restaurants
 *
 * @author sherzodnimatullo
 */
@RestController
public class RestaurantController {

    @Autowired
    RestaurantRepo restaurantRepo;

    @Autowired
    MenuItemRepo menuItemRepo;

    @Autowired
    OrderRepo orderRepo;

    @GetMapping("/restaurants/{id}")
    public ResponseEntity<?> getRestaurantInfo(@PathVariable Long id) {
        Optional<Restaurant> findRestaurant = restaurantRepo.findById(id);
        Restaurant restaurant = null;
        if (findRestaurant.isPresent()) {
           restaurant = findRestaurant.get();
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false, "Cannot find restaurant"),
                    HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(restaurant);
    }

    /**
     * Add restaurant into the database and RestaurantRepo.
     *
     * @param request RestaurantRequest object which is the JSON request converted into a Java object.
     * @param owner   Currently logged in user.
     * @return Success Http Status Code ResponseEntity
     */
    @PostMapping("/restaurants/add")
    public ResponseEntity<?> addRestaurant(@RequestBody RestaurantRequest request,
                                           @CurrentUser UserPrincipal owner) {
        Restaurant restaurant = new Restaurant(request.getRestaurantName(),request.getAddress(),request.getOwner(),
                request.getRating(),request.getNumberOfReviews());
        request.getMenuItems().forEach(item -> {
            MenuItem createdItem = new MenuItem(item.getName(),item.getPrice(),item.getDescription());
            createdItem.setRestaurant(restaurant);
            menuItemRepo.save(createdItem);
        });
        restaurantRepo.save(restaurant);
        return ResponseEntity.ok(new ApiResponse(true,"Restaurant has been added to the database."));
    }

    /**
     * Get the details of the Restaurant with the matching String name.
     *
     * @param id Path Variable for the restaurant id to be fetched.
     * @return RestaurantResponse encapsulated in ResponseEntity.
     */
    @GetMapping("/restaurants/{id}/menu")
    public ResponseEntity<?> getRestaurants(@PathVariable Long id) {
        Optional<Restaurant> restaurantFind = restaurantRepo.findById(id);
        Restaurant foundRestaurant = null;
        if (restaurantFind.isPresent()) {
            foundRestaurant = restaurantFind.get();
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false,"Restaurant doesn't exist"),HttpStatus.NOT_FOUND);
        }

        List<MenuItem> menu = menuItemRepo.findByRestaurantId(foundRestaurant.getId());
        RestaurantResponse response = new RestaurantResponse(foundRestaurant.getName(),foundRestaurant.getOwner(),
                foundRestaurant.getAddress(),menu,foundRestaurant.getRating(),
                foundRestaurant.getNumberOfReviews());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/restaurants/{id}/menu/add")
    public ResponseEntity<?> addMenuItem(@PathVariable Long id,@RequestBody AddItemRequest item) {
        Optional<Restaurant> restaurantOptional = restaurantRepo.findById(id);
        Restaurant foundRestaurant = null;
        if (restaurantOptional.isPresent()) {
            foundRestaurant = restaurantOptional.get();
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false,"Restaurant doesn't exist"),HttpStatus.NOT_FOUND);
        }
        MenuItem menuItem = new MenuItem(item.getName(),item.getPrice(),item.getDescription());
        menuItem.setRestaurant(foundRestaurant);
        menuItemRepo.save(menuItem);
        return ResponseEntity.ok(new ApiResponse(true,"Created"));
    }

    @GetMapping("/restaurants/all")
    public ResponseEntity<?> allRestaurants() {
        Iterable<Restaurant> allRestaurants = restaurantRepo.findAll();
        return ResponseEntity.ok(allRestaurants);
    }
}
