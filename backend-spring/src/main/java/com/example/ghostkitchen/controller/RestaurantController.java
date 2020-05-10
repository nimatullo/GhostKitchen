package com.example.ghostkitchen.controller;

import com.example.ghostkitchen.details.UserPrincipal;
import com.example.ghostkitchen.model.*;
import com.example.ghostkitchen.payload.ApiResponse;
import com.example.ghostkitchen.payload.OrderResponse;
import com.example.ghostkitchen.payload.RestaurantRequest;
import com.example.ghostkitchen.payload.RestaurantResponse;
import com.example.ghostkitchen.repo.*;
import com.example.ghostkitchen.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

/**
 * REST endpoints for Restaurants
 *
 * @author <a href="https://nimatullo.com">Sherzod Nimatullo</a>
 */
@RestController
public class RestaurantController {

    @Autowired
    RestaurantRepo restaurantRepo;

    @Autowired
    MenuItemRepo menuItemRepo;

    @Autowired
    OrderRepo orderRepo;

    @Autowired
    UserRepository userRepo;

    @Autowired
    FileStorageService fileStorageService;

    @Autowired
    RestaurantCustomerRepo restaurantCustomerRepo;

    /**
     * This method returns a restaurant using the ID that was passed.
     * @param id Restaurant ID
     * @return A 200 status code with restaurant information.
     */
    @GetMapping("/restaurants/{id}")
    public ResponseEntity<?> getRestaurantInfo(@PathVariable Long id) {
        Optional<Restaurant> findRestaurant = restaurantRepo.findById(id);
        Restaurant restaurant = null;
        if (findRestaurant.isPresent()) {
            restaurant = findRestaurant.get();
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false,"Cannot find restaurant"),
                    HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(restaurant);
    }

    /**
     * This method adds a restaurant into the database and RestaurantRepo. We get the current user using the ID from
     * UserPrincipal. A restaurant object is created using the information from the RestaurantRequest.
     *
     * @param request RestaurantRequest object which is the JSON request converted into a Java object.
     * @param owner   Currently logged in user.
     * @return Success Http Status Code ResponseEntity
     */
    @PostMapping("/owner/restaurants/add")
    public ResponseEntity<?> addRestaurant(@RequestBody RestaurantRequest request,
                                           @CurrentUser UserPrincipal owner) {
        User restaurantOwner = userRepo.findById(owner.getId()).get();
        Restaurant restaurant = new Restaurant(request.getRestaurantName(),request.getAddress(),restaurantOwner);
        restaurantOwner.setRestaurant(restaurant);
        Restaurant newRestaurant = restaurantRepo.save(restaurant);
        return ResponseEntity.ok(newRestaurant);
    }

    /**
     * This method returns the menu for a specified restaurant. We first fetch the restaurant using the ID provided
     * from the URL. We get the list of menu items and return a RestaurantResponse.
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
        RestaurantResponse response = new RestaurantResponse(foundRestaurant.getName(),foundRestaurant.getAddress(),
                menu,foundRestaurant.getAverageRating(),foundRestaurant.getNumberOfReviews());
        return ResponseEntity.ok(response);
    }

    /**
     * This method returns the list of categories for a specified restaurant offers. Each menu item has a category.
     * @param id Restaurant ID
     * @return A 200 status code
     */
    @GetMapping("/restaurants/{id}/categories")
    public ResponseEntity<?> menuCategories(@PathVariable Long id) {
        Restaurant restaurant = restaurantRepo.findById(id).orElseThrow();
        Set<String> categories = restaurant.getCategories();
        return ResponseEntity.ok(categories);
    }

    /**
     * This method returns the list of categories for the current logged in owner's restaurant.
     * @param principal User principal
     * @return A 200 status code
     */
    @GetMapping("/restaurants/categories")
    public ResponseEntity<?> getListOfCategories(@CurrentUser UserPrincipal principal) {
        Restaurant myRestaurant = restaurantRepo.findByOwner_Id(principal.getId());
        Set<String> categories = myRestaurant.getCategories();
        return ResponseEntity.ok(categories);
    }

    /**
     * This method add a new Menu Item to the logged in user's restaurant. We first create a new MenuItem object with the information
     * from the JSON. We assign the owner's restaurant to the Menu Item. If a picture is present, then we save the picture as a file
     * using a UUID as the name in our file system and generate a URL for it using the ServletUriComponentsBuilder.
     * @param id Restaurant ID
     * @param picture Image of the item.
     * @param name Name of the item.
     * @param description Description for the item.
     * @param price Price for the item.
     * @param category Category assigned to the item.
     * @return A 200 status code
     */
    @PostMapping("/owner/restaurants/{id}/menu/add")
    public ResponseEntity<?> addMenuItem(@PathVariable Long id,
                                         @RequestParam Optional<MultipartFile> picture,
                                         @RequestParam String name,
                                         @RequestParam String description,
                                         @RequestParam BigDecimal price,
                                         @RequestParam String category) {
        Optional<Restaurant> restaurantOptional = restaurantRepo.findById(id);
        Restaurant foundRestaurant = null;
        if (restaurantOptional.isPresent()) {
            foundRestaurant = restaurantOptional.get();
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false,"Restaurant doesn't exist"),HttpStatus.NOT_FOUND);
        }
        MenuItem menuItem = new MenuItem(name,price,description, foundRestaurant, category);    // Initialize the MenuItem
        menuItemRepo.save(menuItem);                                                           // Save the current instance of MenuItem
        if (picture.isPresent()) {
            String fileName = fileStorageService.storeFile(picture.get(),UUID.randomUUID());    // Store file
            menuItem.setUrlPath(                                                                // Set url of menu item
                    ServletUriComponentsBuilder.fromCurrentContextPath()
                            .path("/downloadFile/")
                            .path(fileName)
                            .toUriString()
            );
            menuItemRepo.save(menuItem);                                                           // save the new instance
        }
        restaurantRepo.save(foundRestaurant);
        return ResponseEntity.ok(new ApiResponse(true,"Created"));
    }

    /**
     * This method allows us to update an existing item. We first find the item using the ID and make the appropriate changes.
     * After, we save the object.
     * @param id MenuItem id
     * @param picture New item picture
     * @param name New item name
     * @param description New item description
     * @param price New item price.
     * @return A 200 status code
     */
    @PutMapping("/menu/edit/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Long id,
                                         @RequestParam Optional<MultipartFile> picture,
                                         @RequestParam String name,
                                         @RequestParam String description,
                                         @RequestParam BigDecimal price) {
        MenuItem findItem = menuItemRepo.findById(id).get();
        findItem.setName(name);
        findItem.setDescription(description);
        findItem.setPrice(price);

        if(picture.isPresent()) {
            String fileName = fileStorageService.storeFile(picture.get(), UUID.randomUUID());
            findItem.setUrlPath(                                                                    // Set url of menu item
                    ServletUriComponentsBuilder.fromCurrentContextPath()
                            .path("/downloadFile/")
                            .path(fileName)
                            .toUriString()
            );
        }

        menuItemRepo.save(findItem);                                                           // save the new instance
        return ResponseEntity.ok(new ApiResponse(true,findItem.getUrlPath()));
    }

    /**
     * This method returns a list of all the restaurants available on Ghost Kitchens.
     * @return List of restaurant objects.
     */
    @GetMapping("/restaurants/all")
    public ResponseEntity<?> allRestaurants() {
        Iterable<Restaurant> allRestaurants = restaurantRepo.findAll();
        return ResponseEntity.ok(allRestaurants);
    }

    @Deprecated
    @GetMapping("/downloadFile/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName,
                                                 HttpServletRequest request) {
        Resource resource = fileStorageService.loadFile(fileName);

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException e) {
            throw new RuntimeException("Cannot determine content type");
        }

        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    /**
     * This method returns the restaurant information for the current logged in owner.
     * @param principal User principal
     * @return A 200 status code with restaurant info.
     */
    @GetMapping("/MyRestaurant")
    public ResponseEntity<?> getMenuItems(@CurrentUser UserPrincipal principal) {
        User currentUser = userRepo.findById(principal.getId()).get();
        Restaurant ownerRestaurant = currentUser.getRestaurant();
        if (ownerRestaurant == null) {
            return new ResponseEntity<>(new ApiResponse(false, "Restaurant not yet created"), HttpStatus.NOT_FOUND);
        }
        List<OrderResponse> restaurantOrders = orderRepo.findByRestaurantId(ownerRestaurant.getId())
                .stream()
                .map(OrderResponse::new)
                .collect(Collectors.toList());
        RestaurantResponse response = new RestaurantResponse(ownerRestaurant.getId(), ownerRestaurant.getName(),
                ownerRestaurant.getAddress(),
                menuItemRepo.findByRestaurantId(ownerRestaurant.getId()), ownerRestaurant.getAverageRating(),
                ownerRestaurant.getNumberOfReviews(), restaurantOrders);
        return ResponseEntity.ok(response);
    }

    /**
     * This method returns a list of ratings for the current logged in owner's restaurant.
     * @param principal User principal
     * @return A 200 status code with list of ratings.
     */
    @GetMapping("/MyRestaurant/ratings")
    public ResponseEntity<?> getRatings(@CurrentUser UserPrincipal principal) {
        User currentUser = userRepo.findById(principal.getId()).get();
        Restaurant ownerRestaurant = currentUser.getRestaurant();

        return ResponseEntity.ok(ownerRestaurant.getListOfRatings());
    }


    /**
     * This method allows a customer to leave a rating for a restaurant. We find the restaurant using the id passed from the url.
     * Then we add the rating into the restaurant. The addRating method also calculates the average rating for a restaurant.
     * @param principal User principal
     * @param rating Rating for the restaurant
     * @param id Restaurant id.
     * @return A 200 status code.
     */
    @PutMapping("/restaurants/{id}/addRating")
    public ResponseEntity<?> addRating(@CurrentUser UserPrincipal principal, @RequestBody Rating rating,
                                       @PathVariable Long id) {
        Optional<Restaurant> findRestaurant = restaurantRepo.findById(id);
        Restaurant currentRestaurant = null;
        User currentUser = null;
        if (findRestaurant.isPresent()) {
            currentRestaurant = findRestaurant.get();
            currentUser = userRepo.findById(principal.getId()).get();
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false, "Can't find the source"), HttpStatus.NOT_FOUND);
        }
        rating.setUser(currentUser);
        currentRestaurant.addRating(rating);
        restaurantRepo.save(currentRestaurant);
        return ResponseEntity.ok(new ApiResponse(true, "Rating added"));
    }

    /**
     * This method checks whether or not the current logged in customer has rated a restaurant.
     * @param principal User principal
     * @param id Restaurant ID
     * @return A 200 status code
     */
    @GetMapping("/restaurants/{id}/rated")
    public ResponseEntity<?> hasRating(@CurrentUser UserPrincipal principal, @PathVariable Long id) {
        Optional<Restaurant> findRestaurant = restaurantRepo.findById(id);
        Restaurant currentRestaurant = null;
        User currentUser = null;
        if (findRestaurant.isPresent()) {
            currentRestaurant = findRestaurant.get();
            currentUser = userRepo.findById(principal.getId()).get();
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false, "Can't find the source"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ApiResponse(currentRestaurant.checkForRating(currentUser), "Rating"), HttpStatus.OK);
    }

    /**
     * This method finds the most frequent customer for the current logged in owner's restaurant.
     * @param principal User principal.
     * @return A 200 status code with the most frequent customer.
     */
    @GetMapping("/restaurants/bestCustomer")
    public ResponseEntity<?> bestCustomer(@CurrentUser UserPrincipal principal) {
        final Long MY_RESTAURANT_ID = restaurantRepo.findByOwner_Id(principal.getId()).getId();
        List<RestaurantCustomer> listOfRestaurantCustomers = restaurantCustomerRepo.findAllByRestaurantIdOrderByNumberOfPreviousOrdersDesc(MY_RESTAURANT_ID);
        if (listOfRestaurantCustomers.isEmpty())
            return new ResponseEntity<>(new ApiResponse(false, "Not enough purchase data."), HttpStatus.NO_CONTENT);
        return ResponseEntity.ok(listOfRestaurantCustomers.get(0));
    }

    /**
     * This method returns a list of customers for the current logged in owner's restaurant.
     * @param principal User principal.
     * @return A 200 status code with the list of customers.
     */
    @GetMapping("/restaurants/getListOfCustomers")
    public ResponseEntity<?> getOrdersByDate(@CurrentUser UserPrincipal principal) {
        final Long MY_RESTAURANT_ID = restaurantRepo.findByOwner_Id(principal.getId()).getId();
        List<RestaurantCustomer> listOfRestaurantCustomers = restaurantCustomerRepo.findAllByRestaurantId(MY_RESTAURANT_ID);

        if (listOfRestaurantCustomers.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(false, "Not enough purchase data."), HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(listOfRestaurantCustomers);
    }
}
