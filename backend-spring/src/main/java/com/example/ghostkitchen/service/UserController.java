package com.example.ghostkitchen.service;

import com.example.ghostkitchen.model.Account;
import com.example.ghostkitchen.model.Credentials;
import com.example.ghostkitchen.model.Name;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

@RestController
public class UserController {
    static Account currentUser;

    @Autowired
    private AccountService service;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @GetMapping("/test")
    public ResponseEntity<String> test (HttpServletRequest request) {
        return new ResponseEntity<>(request.getAuthType(), HttpStatus.ACCEPTED);
    }

    @GetMapping("/currentUser")
    public Account currentUser() {
        return currentUser;
    }

    @GetMapping("/account/list")
    public List<Account> getAll() {
        return service.getAll();
    }

    @PostMapping("/register")
    public ResponseEntity<String> createAccount(@RequestBody Account account) {
        try {
            service.create(account);
            return new ResponseEntity<>("Account created!",HttpStatus.ACCEPTED);
        } catch (Exception e) {
            Throwable cause = e.getCause().getCause();
            if (cause instanceof ConstraintViolationException) {
                final StringBuilder message = new StringBuilder();
                Set<ConstraintViolation<?>> constraintViolations = ((ConstraintViolationException)cause).getConstraintViolations();
                constraintViolations.forEach(error -> message.append(" ").append(error.getMessage()));
                return new ResponseEntity<>(message.toString(),HttpStatus.FORBIDDEN);
            }
            else if (cause instanceof SQLException) {
                String errorMessage = ((SQLException)cause).getMessage();
                String messageToClient = "";
                if (errorMessage.contains("(email)=")) {
                    messageToClient = "Email address already exists.";
                }
                else if (errorMessage.contains("(username)=")) {
                    messageToClient = "Username is already in use.";
                }
                return new ResponseEntity<>(messageToClient, HttpStatus.FORBIDDEN);
            }
            else
                return new ResponseEntity<>("Server side error. Please try again", HttpStatus.FORBIDDEN);
        }
    }

    @PutMapping("/login")
    public ResponseEntity<Account> logIn(@RequestBody Credentials credentials) {
        Account foundAccount = service.findByEmail(credentials.getEmail());
        if (encoder.matches(credentials.getPassword(),foundAccount.getPassword())) {
            currentUser = foundAccount;
            return new ResponseEntity<>(currentUser ,HttpStatus.ACCEPTED);
        }
        else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }
    }
}
