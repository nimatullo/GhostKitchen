package com.example.ghostkitchen.payload;

import com.example.ghostkitchen.model.*;

import java.util.List;

public class RestaurantResponse {
    Long id;
    String restaurantName;
    Address address;
    List<MenuItem> menuItems;
    List<Order> pastOrders;
    double rating;
    int numberOfReviews;

    public RestaurantResponse(Long id, String restaurantName,Address address,List<MenuItem> menuItems,
                              double rating, int numberOfReviews, List<Order> pastOrders) {
        this.id = id;
        this.restaurantName = restaurantName;
        this.address = address;
        this.menuItems = menuItems;
        this.pastOrders = pastOrders;
        this.rating = rating;
        this.numberOfReviews = numberOfReviews;
    }

    public RestaurantResponse(String restaurantName,Address address,List<MenuItem> menuItems,
                              double rating, int numberOfReviews) {
        this.restaurantName = restaurantName;
        this.address = address;
        this.menuItems = menuItems;
        this.rating = rating;
        this.numberOfReviews = numberOfReviews;
    }
    public int getNumberOfReviews() {
        return numberOfReviews;
    }

    public void setNumberOfReviews(int numberOfReviews) {
        this.numberOfReviews = numberOfReviews;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<MenuItem> getMenuItems() {
        return menuItems;
    }

    public void setMenuItems(List<MenuItem> menuItems) {
        this.menuItems = menuItems;
    }

    public List<Order> getPastOrders() {
        return pastOrders;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public void setPastOrders(List<Order> pastOrders) {
        this.pastOrders = pastOrders;
    }
}
