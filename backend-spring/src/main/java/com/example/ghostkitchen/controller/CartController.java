package com.example.ghostkitchen.controller;

import com.example.ghostkitchen.details.UserPrincipal;
import com.example.ghostkitchen.model.CurrentUser;
import com.example.ghostkitchen.model.MenuItem;
import com.example.ghostkitchen.model.User;
import com.example.ghostkitchen.payload.ApiResponse;
import com.example.ghostkitchen.repo.MenuItemRepo;
import com.example.ghostkitchen.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class CartController {
    @Autowired
    UserRepository userRepo;

    @Autowired
    MenuItemRepo menuItemRepo;

    @PostMapping("cart/add/{id}")
    public ResponseEntity<?> addItemToCart(@CurrentUser UserPrincipal currentUser, @PathVariable Long id) {
        Optional<MenuItem> findItem = menuItemRepo.findById(id);
        Optional<User> findUser = userRepo.findById(currentUser.getId());
        MenuItem item = null;
        User user = null;
        if (findUser.isPresent() && findItem.isPresent()) {
            user = findUser.get();
            item = findItem.get();
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false, "Cart cannot be found"),HttpStatus.NOT_FOUND);
        }
        user.getCart().addItem(item);
        userRepo.save(user);
        return ResponseEntity.ok(new ApiResponse(true, "Item added to cart"));
    }

    @GetMapping("/cart")
    public ResponseEntity<?> getCard(@CurrentUser UserPrincipal currentUser) {
        User user = userRepo.findById(currentUser.getId()).get();
        return ResponseEntity.ok(user.getCart());
    }
}
