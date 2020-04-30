package com.example.ghostkitchen.controller;

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

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/owner/")
public class OwnerController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepo roleRepo;

    @Autowired
    RestaurantRepo restaurantRepo;

    @Autowired
    MenuItemRepo menuItemRepo;

    @Autowired
    BCryptPasswordEncoder encoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/register")
    public ResponseEntity<?> authenticateUser(@RequestBody RegisterRequest request) {
        if (userRepository.existsAccountByEmail(request.getEmail())) {
            return new ResponseEntity<>(new ApiResponse(false,"Username is already taken!"),HttpStatus.BAD_REQUEST);
        }

        User user = new User(request.getName(),request.getEmail(),request.getPassword());

        user.setPassword(encoder.encode(user.getPassword()));

        Role userRole = roleRepo.findByName(RoleName.ROLE_OWNER).orElseThrow(() -> new RuntimeException("Role not set"));
        user.setRoles(Collections.singleton(userRole));

        userRepository.save(user);

        return new ResponseEntity<>(new ApiResponse(true,"Owner created"),HttpStatus.CREATED);
    }

    @PutMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        UserPrincipal currentUser = (UserPrincipal) authentication.getPrincipal();

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthResponse(jwt, currentUser.getName().getFirstName()));
    }


    /*
        Not implemented in the frontend.
     */
    @PutMapping("/update")
    public ResponseEntity<ApiResponse> updateInformation(@CurrentUser UserPrincipal currentUser,
                                                         @RequestBody UpdateUserRequest updateUser) {
        Optional<User> foundUser = userRepository.findById(currentUser.getId());

        if (foundUser.isPresent()) {
            User user = foundUser.get();
            user.setEmail(updateUser.getEmail());
            user.getName().setFirstName(updateUser.getFirstName());
            user.getName().setLastName(updateUser.getLastName());
            user.setPassword(encoder.encode(updateUser.getPassword()));

            userRepository.save(user);
            return new ResponseEntity<>(new ApiResponse(true,"Information has been updated."),HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false,"Please log in"),HttpStatus.NOT_FOUND);
        }
    }
}
