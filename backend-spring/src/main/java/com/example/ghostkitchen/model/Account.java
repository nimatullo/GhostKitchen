package com.example.ghostkitchen.model;


import com.example.ghostkitchen.model.Name;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Account {
    @Id
    @GeneratedValue
    @Column(name="id")
    Long id;

    @OneToOne(cascade = CascadeType.ALL)
    Name name;

    @Column(name = "email", unique = true)
    @NotNull(message = "Email cannot be blank.")
    @Email(message = "Please enter a valid email!")
    String email;

    @Column(name = "password")
    @NotNull(message = "Password must be between 8 and 16 characters.")
    String password;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Name getName() {
        return name;
    }

    public void setName(Name name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "{" +
                "\"id:\"" + id +
                ", \"name\": { \"firstName\": " + name.getFirstName() +
                ", \"lastName\": " + name.getLastName() +
                "}, \"email\":'" + email +
                '}';
    }
}
