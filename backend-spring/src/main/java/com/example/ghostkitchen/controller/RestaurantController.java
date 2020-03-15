package com.example.ghostkitchen.controller;

import com.example.ghostkitchen.details.UserPrincipal;
import com.example.ghostkitchen.model.CurrentUser;
import com.example.ghostkitchen.model.MenuItem;
import com.example.ghostkitchen.model.Restaurant;
import com.example.ghostkitchen.model.User;
import com.example.ghostkitchen.payload.ApiResponse;
import com.example.ghostkitchen.payload.RestaurantRequest;
import com.example.ghostkitchen.payload.RestaurantResponse;
import com.example.ghostkitchen.repo.MenuItemRepo;
import com.example.ghostkitchen.repo.OrderRepo;
import com.example.ghostkitchen.repo.RestaurantRepo;
import com.example.ghostkitchen.repo.UserRepository;
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

    @Autowired
    UserRepository userRepo;

    @Autowired
    FileStorageService fileStorageService;

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
     * Add restaurant into the database and RestaurantRepo.
     *
     * @param request RestaurantRequest object which is the JSON request converted into a Java object.
     * @param owner   Currently logged in user.
     * @return Success Http Status Code ResponseEntity
     */
    @PostMapping("/owner/restaurants/add")
    public ResponseEntity<?> addRestaurant(@RequestBody RestaurantRequest request,
                                           @CurrentUser UserPrincipal owner) {
        User restaurantOwner = userRepo.findById(owner.getId()).get();
        Restaurant restaurant = new Restaurant(request.getRestaurantName(),request.getAddress(),restaurantOwner,
                request.getRating(),request.getNumberOfReviews());
        request.getMenuItems().forEach(item -> {
            MenuItem createdItem = new MenuItem(item.getName(),item.getPrice(),item.getDescription());
            createdItem.setRestaurant(restaurant);
            menuItemRepo.save(createdItem);
        });
        restaurantOwner.setRestaurant(restaurant);
        Restaurant newRestaurant = restaurantRepo.save(restaurant);
        return ResponseEntity.ok(newRestaurant);
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
        RestaurantResponse response = new RestaurantResponse(foundRestaurant.getName(),foundRestaurant.getAddress(),
                menu,foundRestaurant.getRating(),foundRestaurant.getNumberOfReviews());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/owner/restaurants/{id}/menu/add")
    public ResponseEntity<?> addMenuItem(@PathVariable Long id,
                                         @RequestParam MultipartFile picture,
                                         @RequestParam String name,
                                         @RequestParam String description,
                                         @RequestParam BigDecimal price) {
        Optional<Restaurant> restaurantOptional = restaurantRepo.findById(id);
        Restaurant foundRestaurant = null;
        if (restaurantOptional.isPresent()) {
            foundRestaurant = restaurantOptional.get();
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false,"Restaurant doesn't exist"),HttpStatus.NOT_FOUND);
        }
        MenuItem menuItem = new MenuItem(name,price,description); // Initialize the MenuItem
        menuItem.setRestaurant(foundRestaurant);                  // Set the Restaurant that the menu item belongs to
        Long menuId = menuItemRepo.save(menuItem).getId();        // Save the current instance of MenuItem and
        // extract Id to be used for file name
        String fileName = fileStorageService.storeFile(picture,foundRestaurant.getId(),menuId); // Store file
        menuItem.setUrlPath(                                                                    // Set url of menu item
                ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/downloadFile/")
                        .path(fileName)
                        .toUriString()
        );
        menuItemRepo.save(menuItem);                                                           // save the new instance
        return ResponseEntity.ok(new ApiResponse(true,"Created"));
    }

    @GetMapping("/restaurants/all")
    public ResponseEntity<?> allRestaurants() {
        Iterable<Restaurant> allRestaurants = restaurantRepo.findAll();
        return ResponseEntity.ok(allRestaurants);
    }

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

    @GetMapping("/MyRestaurant")
    public ResponseEntity<?> getMenuItems(@CurrentUser UserPrincipal principal) {
        User currentUser = userRepo.findById(principal.getId()).get();
        Restaurant ownerRestaurant = currentUser.getRestaurant();
        RestaurantResponse response = new RestaurantResponse(ownerRestaurant.getName(), ownerRestaurant.getAddress(),
                menuItemRepo.findByRestaurantId(ownerRestaurant.getId()), ownerRestaurant.getRating(),
                ownerRestaurant.getNumberOfReviews(), orderRepo.findByRestaurantId(ownerRestaurant.getId()));
        return ResponseEntity.ok(response);
    }
}
