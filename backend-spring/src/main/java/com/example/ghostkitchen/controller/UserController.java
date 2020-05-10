package com.example.ghostkitchen.controller;

import com.example.ghostkitchen.details.UserPrincipal;
import com.example.ghostkitchen.jwt.JwtTokenProvider;
import com.example.ghostkitchen.model.*;
import com.example.ghostkitchen.payload.*;
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
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepo roleRepo;

    @Autowired
    BCryptPasswordEncoder encoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    /**
     * This method registers a User with the role of OWNER.
     * @param request Credentials for user.
     * @return A ResponseEntity that's either 200 or 400
     */
    @PostMapping("/register")
    public ResponseEntity<?> authenticateUser(@RequestBody RegisterRequest request) {
        if (userRepository.existsAccountByEmail(request.getEmail())) {
            return new ResponseEntity<>(new ApiResponse(false,"Username is already taken!"),HttpStatus.BAD_REQUEST);
        }

        User user = new User(request.getName(),request.getEmail(),request.getPassword());

        user.setPassword(encoder.encode(user.getPassword()));

        Role userRole = roleRepo.findByName(RoleName.ROLE_USER).orElseThrow(() -> new RuntimeException("Role not set"));
        user.setRoles(Collections.singleton(userRole));

        userRepository.save(user);

        return new ResponseEntity<>(new ApiResponse(true,"User created"),HttpStatus.CREATED);
    }

    /**
     * This method logs in a user and returns a JWT Token.
     * @param request Credentials for the user.
     * @return JWT Token
     */
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

    /**
     * This method returns the current logged in user using the ID from the User Principal
     * @param userPrincipal User principal
     * @return User object for current logged in user.
     */
    @GetMapping("/currentUser")
    public User currentUserEmail(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId()).get();
    }

    /**
     * This method adds payment and address information to the current logged in user.
     * @param principal User principal
     * @param request Object with the new information.
     * @return A 200 status code.
     */
    @PostMapping("user/addInfo")
    public ResponseEntity<?> addInfo(@CurrentUser UserPrincipal principal,
                                     @RequestBody AddPaymentAndAddressInfoRequest request) {
        Optional<User> foundUser = userRepository.findById(principal.getId());
        User currentUser = null;
        if (foundUser.isPresent()) {
            currentUser = foundUser.get();
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false, "User cannot be found"), HttpStatus.NOT_FOUND);
        }
        currentUser.setPayment(request.getDetails());
        currentUser.setAddress(request.getUserAddress());
        userRepository.save(currentUser);
        return ResponseEntity.ok(new ApiResponse(true, "Information added."));
    }

    /**
     * This method updates the payment method for the current logged in user.
     * @param principal User principal
     * @param newPayment New payment information
     * @return A 200 status code.
     */
    @PutMapping("user/updatePayment")
    public ResponseEntity<?> updatePayment (@CurrentUser UserPrincipal principal,
                                            @RequestBody PaymentDetails newPayment) {
        Optional<User> foundUser = userRepository.findById(principal.getId());
        User currentUser = null;
        if (foundUser.isPresent()) {
            currentUser = foundUser.get();
        }
        currentUser.setPayment(newPayment);
        userRepository.save(currentUser);
        return ResponseEntity.ok(new ApiResponse(true, "Payment updated"));
    }

    /**
     * This method updates the delivery address for the current logged in user.
     * @param principal User principal
     * @param newAddress New address information.
     * @return A 200 status code.
     */
    @PutMapping("user/updateAddress")
    public ResponseEntity<?> updateAddress (@CurrentUser UserPrincipal principal,
                                            @RequestBody Address newAddress) {
        Optional<User> foundUser = userRepository.findById(principal.getId());
        User currentUser = null;
        if (foundUser.isPresent()) {
            currentUser = foundUser.get();
        }
        currentUser.setAddress(newAddress);
        userRepository.save(currentUser);
        return ResponseEntity.ok(new ApiResponse(true, "Payment updated"));
    }

    /**
     * This method gets the current user's payment information.
     * @param principal User principal
     * @return A 200 status code with payment information.
     */
    @GetMapping("user/paymentInfo")
    public ResponseEntity<?> getPaymentInfo(@CurrentUser UserPrincipal principal) {
        Optional<User> foundUser = userRepository.findById(principal.getId());
        User currentUser = null;
        if (foundUser.isPresent()) {
            currentUser = foundUser.get();
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false, "User cannot be found"), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(currentUser);
    }
}
