package com.example.ghostkitchen.payload;

import com.example.ghostkitchen.model.Address;
import javax.validation.constraints.NotBlank;
import java.util.List;

public class RestaurantRequest {
    @NotBlank
    String restaurantName;

    @NotBlank
    Address address;

    @NotBlank
    List <MenuItemRequest> menuItems;

    double rating;

    int numberOfReviews;

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

    public List<MenuItemRequest> getMenuItems() {
        return menuItems;
    }

    public void setMenuItems(List<MenuItemRequest> menuItems) {
        this.menuItems = menuItems;
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

}

