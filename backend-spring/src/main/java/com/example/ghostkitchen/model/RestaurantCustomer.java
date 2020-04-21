package com.example.ghostkitchen.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "restaurant_customer")
public class RestaurantCustomer implements Comparable<RestaurantCustomer>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    int numberOfPreviousOrders;

    @ManyToOne
    User user;

    @JsonIgnore
    @ManyToOne
    Restaurant restaurant;

    public RestaurantCustomer() {
    }

    public RestaurantCustomer(User user, Restaurant restaurant) {
        this.restaurant = restaurant;
        this.numberOfPreviousOrders = 1;
        this.user = user;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNumberOfPreviousOrders() {
        return numberOfPreviousOrders;
    }

    public void setNumberOfPreviousOrders(int numberOfPreviousOrders) {
        this.numberOfPreviousOrders = numberOfPreviousOrders;
    }

    public void incrementNumberOfPreviousOrders() {
        numberOfPreviousOrders++;
    }

    @Override
    public int compareTo(RestaurantCustomer customer) {
        return Integer.compare(this.numberOfPreviousOrders, customer.getNumberOfPreviousOrders());
    }
}
