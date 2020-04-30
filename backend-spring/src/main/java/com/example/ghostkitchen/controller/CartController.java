package com.example.ghostkitchen.controller;

import com.example.ghostkitchen.details.UserPrincipal;
import com.example.ghostkitchen.model.CartItem;
import com.example.ghostkitchen.model.CurrentUser;
import com.example.ghostkitchen.model.MenuItem;
import com.example.ghostkitchen.model.User;
import com.example.ghostkitchen.payload.ApiResponse;
import com.example.ghostkitchen.repo.CartItemRepo;
import com.example.ghostkitchen.repo.MenuItemRepo;
import com.example.ghostkitchen.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

/**
 * All the endpoints for the Cart implementation.
 * @author <a href="https://nimatullo.com">sherzodnimatullo</a>
 */

@RequestMapping("/users/")
@RestController
public class CartController {
    @Autowired
    UserRepository userRepo;

    @Autowired
    MenuItemRepo menuItemRepo;

    @Autowired
    CartItemRepo cartItemRepo;

    /**
     * This method adds a menu item to the current user's cart. The method receives a item id that is used to fetch an
     * instance of the MenuItem object from the database. We check if this item is already in the user's cart and if so,
     * we increment the quantity of that item. If there is no item already, a CartItem is created and added to the user's
     * cart.
     * @param principal User credentials such as id for the current logged in user.
     * @param id ID of the menu item.
     * @return A 200 status code with a successful API call.
     */
    @PostMapping("/cart/add/{id}")
    public ResponseEntity<?> addItemToCart(@CurrentUser UserPrincipal principal,@PathVariable Long id) {
        User currentUser = userRepo.findById(principal.getId()).orElseThrow();
        MenuItem item = menuItemRepo.findById(id).orElseThrow();
        Optional<CartItem> itemInCart = currentUser.getCart().findItem(item.getName());
        if (itemInCart.isPresent()) {
            currentUser.getCart().addItem(itemInCart.get());
        }
        else {
            currentUser.getCart().addItem(new CartItem(item));
        }
        userRepo.save(currentUser);
        return ResponseEntity.ok(new ApiResponse(true,"Item added to cart"));
    }

    /**
     * This method provides the current user's cart.
     * @param currentUser User credentials such as id for the current logged in user.
     * @return A 200 status code with the instance of user's cart.
     */
    @GetMapping("/cart")
    public ResponseEntity<?> getCard(@CurrentUser UserPrincipal currentUser) {
        User user = userRepo.findById(currentUser.getId()).get();
        return ResponseEntity.ok(user.getCart());
    }

    /**
     * This method removes an item from the user's cart. Using the cart item id, we fetch the instance of that cart item.
     * Using this instance, we pass the CartItem to the removeItem method of the Cart class.
     * @param principal User credentials such as id for the current logged in user.
     * @param id ID of the cart item.
     * @return A 200 status code with a successful API call.
     */
    @PutMapping("/cart/remove/{id}")
    public ResponseEntity<?> removeItemFromCart(@CurrentUser UserPrincipal principal,@PathVariable Long id) {
        CartItem itemToBeDeleted = cartItemRepo.findById(id).orElseThrow();
        User currentUser = userRepo.findById(principal.getId()).orElseThrow();

        currentUser.getCart().removeItem(itemToBeDeleted);
        cartItemRepo.delete(itemToBeDeleted);
        userRepo.save(currentUser);

        return ResponseEntity.ok(new ApiResponse(true, "The item has been removed from the cart."));
    }

    // Development methods
    @GetMapping("/cart/empty")
    public boolean emptyCart(@CurrentUser UserPrincipal principal) {
        User currentUser = userRepo.findById(principal.getId()).get();
        currentUser.getCart().emptyCart();
        userRepo.save(currentUser);
        return true;
    }
}
