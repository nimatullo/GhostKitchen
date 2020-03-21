package com.example.ghostkitchen.model;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_id")
    Cart cart;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="address_id")
    Address address;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="payment_id")
    PaymentDetails payment;

    // For User's with ROLE_OWNER
    @OneToOne(cascade = CascadeType.ALL)
    private Restaurant restaurant;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name="user_roles",
                joinColumns = @JoinColumn(name="user_id"),
                inverseJoinColumns = @JoinColumn(name="role_id"))
    private Set<Role> roles = new HashSet<>();

    public User() {
    }

    public User(Name name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public PaymentDetails getPayment() {
        return payment;
    }

    public void setPayment(PaymentDetails payment) {
        this.payment = payment;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

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

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
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
