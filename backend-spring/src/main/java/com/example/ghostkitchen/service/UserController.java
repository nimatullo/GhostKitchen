package com.example.ghostkitchen.service;

import com.example.ghostkitchen.details.UserPrincipal;
import com.example.ghostkitchen.jwt.JwtTokenProvider;
import com.example.ghostkitchen.model.*;
import com.example.ghostkitchen.payload.*;
import com.example.ghostkitchen.repo.MenuItemRepo;
import com.example.ghostkitchen.repo.RestaurantRepo;
import com.example.ghostkitchen.repo.RoleRepo;
import com.example.ghostkitchen.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.websocket.server.PathParam;
import java.net.URI;
import java.security.Principal;
import java.sql.SQLException;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@RestController
public class UserController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    MenuItemRepo menuItemRepo;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RestaurantRepo restaurantRepo;

    @Autowired
    RoleRepo roleRepo;

    @Autowired
    BCryptPasswordEncoder encoder;

    @Autowired
    JwtTokenProvider tokenProvider;


    @PostMapping("/restaurants/add")
    public ResponseEntity<?> addRestaurant(@RequestBody RestaurantRequest request,
                                           @CurrentUser UserPrincipal owner) {
        Restaurant restaurant = new Restaurant(request.getRestaurantName(), request.getAddress(), request.getOwner());
        request.getMenuItems().forEach(item -> {
            restaurant.addMenuItem(new MenuItem(item.getItemName(), item.getItemPrice(), item.getItemDesc()));
        });
        restaurantRepo.save(restaurant);
        return ResponseEntity.ok(new ApiResponse(true, "Restaurant has been added to the database."));
    }

    @GetMapping("/restaurants/{name}")
    public ResponseEntity<?> getRestaurants(@PathVariable String name) {
        Restaurant foundRestaurant = restaurantRepo.findByRestaurantName(name).get();

        RestaurantResponse response = new RestaurantResponse(foundRestaurant.getName(), foundRestaurant.getOwner(),
                foundRestaurant.getAddress(), foundRestaurant.getMenuItems());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/restaurants/{name}/menu/add")
    public ResponseEntity<?> addMenuItem(@PathParam String name, @RequestBody MenuItemRequest menuItem) {

    }

    @PostMapping("/register")
    public ResponseEntity<?> authenticateUser(@RequestBody RegisterRequest request) {
        if (userRepository.existsAccountByEmail(request.getEmail())) {
            return new ResponseEntity<>(new ApiResponse(false, "Username is already taken!"), HttpStatus.BAD_REQUEST);
        }

        User user = new User(request.getName(), request.getEmail(), request.getPassword());

        user.setPassword(encoder.encode(user.getPassword()));

        Role userRole = roleRepo.findByName(RoleName.ROLE_USER).orElseThrow(() -> new RuntimeException("Role not set"));
        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "User created"), HttpStatus.CREATED);
    }

    @PutMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthResponse(jwt));
    }

    @GetMapping("/currentUser")
    @ResponseBody
    public UserPrincipal currentUserEmail(@CurrentUser UserPrincipal userPrincipal) {
        return userPrincipal;
    }

}
