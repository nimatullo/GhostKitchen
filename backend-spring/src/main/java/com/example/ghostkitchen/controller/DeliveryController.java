package com.example.ghostkitchen.controller;

import com.example.ghostkitchen.details.UserPrincipal;
import com.example.ghostkitchen.jwt.JwtTokenProvider;
import com.example.ghostkitchen.model.*;
import com.example.ghostkitchen.payload.*;
import com.example.ghostkitchen.repo.DeliveryRepo;
import com.example.ghostkitchen.repo.OrderRepo;
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
import java.util.stream.Collectors;

/**
 * The endpoints for the User's with role of delivery.
 */
@RestController
public class DeliveryController {

    @Autowired
    DeliveryRepo deliveryRepo;

    @Autowired
    OrderRepo orderRepo;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepo roleRepo;

    @Autowired
    BCryptPasswordEncoder encoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider tokenProvider;


    /**
     * This method logs in a delivery user. After a successful login, the security context is set.
     * @param request LoginRequest object with the credentials of the user.
     * @return JWT Authorization Token.
     */
    @PutMapping("/delivery/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        UserPrincipal currentUser = (UserPrincipal)authentication.getPrincipal();

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthResponse(jwt,currentUser.getName().getFirstName()));
    }

    /**
     * This method registers a delivery user. This is different from the other role register methods because
     * it sets the new user's role as 'ROLE_DELIVERY'.
     * @param request User credentials of the user who wishes to register.
     * @return A "CREATED" status code on successful account creation.
     */
    @PostMapping("/delivery/register")
    public ResponseEntity<?> registerDelivery(@RequestBody RegisterRequest request) {

        if (userRepository.existsAccountByEmail(request.getEmail())) {
            return new ResponseEntity<>(new ApiResponse(false,"Username is already taken!"),HttpStatus.BAD_REQUEST);
        }

        User user = new User(request.getName(),request.getEmail(),request.getPassword());

        user.setPassword(encoder.encode(user.getPassword()));

        Role userRole = roleRepo.findByName(RoleName.ROLE_DELIVERY).orElseThrow(() -> new RuntimeException("Role not set"));
        user.setRoles(Collections.singleton(userRole));

        userRepository.save(user);

        return new ResponseEntity<>(new ApiResponse(true,"Delivery Person created"),HttpStatus.CREATED);
    }

    /**
     * This method gathers all the deliveries which have not yet been delivered. Using Spring JPA, it gathers a list of
     * delivery objects that don't have a Delivery person associated with it.
     * @return A 200 status code with the list of available deliveries.
     */
    @GetMapping("/delivery/availableDeliveries")
    public ResponseEntity<?> getDeliveries() {
        List<DeliveryResponse> availableDeliveries =
                deliveryRepo
                        .findByDeliveredFalseAndDeliveryPersonIsNull()
                        .stream()
                        .map(delivery -> new DeliveryResponse(delivery.getId(), delivery.getDeliveryPerson(),
                                delivery.getOrder(), delivery.isDelivered()))
                        .collect(Collectors.toList());
        return ResponseEntity.ok(availableDeliveries);
    }

    /**
     * This method returns a list of deliveries that the current user has accepted/completed. The delivery objects are converted to
     * a DeliveryResponse object so only the needed data is passed to the client.
     * @param principal Current user
     * @return A 200 status code with a list of user deliveries.
     */
    @GetMapping("/delivery/myDeliveries")
    public ResponseEntity<?> myDeliveries(@CurrentUser UserPrincipal principal) {
        List<DeliveryResponse> myDeliveries =
                deliveryRepo
                        .findByDeliveryPerson_Id(principal.getId())
                        .stream()
                        .map(delivery -> new DeliveryResponse(delivery.getId(), delivery.getDeliveryPerson(),
                                delivery.getOrder(), delivery.isDelivered()))
                        .collect(Collectors.toList());
        return ResponseEntity.ok(myDeliveries);
    }

    /**
     * This method allows for the current user to accept a delivery. We first fetch the delivery object corresponding to the ID
     * that's in the url. Afterwards, we assign the current user as the delivery person for that delivery.
     * @param id ID of the delivery
     * @param principal Current user
     * @return A ResponseEntity object that's either a 404 status code or 200 status code.
     */
    @PutMapping("/delivery/{id}/acceptDelivery")
    public ResponseEntity<?> acceptDelivery(@PathVariable Long id,@CurrentUser UserPrincipal principal) {
        Optional<Delivery> delivery = deliveryRepo.findById(id);
        Optional<User> currentUser = userRepository.findById(principal.getId());
        Delivery foundDelivery = null;
        User foundUser = null;
        if (delivery.isPresent() && currentUser.isPresent()) {
            foundDelivery = delivery.get();
            foundUser = currentUser.get();
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false,"Cannot find properties."),HttpStatus.NOT_FOUND);
        }
        foundDelivery.setDeliveryPerson(foundUser);
        deliveryRepo.save(foundDelivery);
        return ResponseEntity.ok(new ApiResponse(true,"Accepted delivery."));
    }

    /**
     * This method allows for a delivery to be marked as delivered. We first find the delivery associated with the ID that's
     * been passed in the URL. We then set the delivered boolean in the Order object that corresponds to the Delivery object as true.
     * @param id ID of the delivery
     * @return A ResponseEntity object that's either a 404 status code or 200 status code.
     */
    @PutMapping("/delivery/{id}/delivered")
    public ResponseEntity<?> deliveredOrder(@PathVariable Long id) {
        Optional<Delivery> delivery = deliveryRepo.findById(id);
        Delivery foundDelivery = null;
        User foundUser = null;
        if (delivery.isPresent()) {
            foundDelivery = delivery.get();
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false,"Cannot find properties."),HttpStatus.NOT_FOUND);
        }
        foundDelivery.setDelivered(true);
        Order order = foundDelivery.getOrder().setDelivered(true);
        orderRepo.save(order);
        deliveryRepo.save(foundDelivery);
        return ResponseEntity.ok(new ApiResponse(true,"Accepted delivery."));
    }

}
