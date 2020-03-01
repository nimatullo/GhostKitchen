package com.example.ghostkitchen.payload;

import com.example.ghostkitchen.model.Address;
import com.example.ghostkitchen.model.MenuItem;
import com.example.ghostkitchen.model.Name;

import java.util.List;

public class RestaurantResponse {
    String restaurantName;
    Name owner;
    Address address;
    List<MenuItem> menuItems;

    public RestaurantResponse(String restaurantName,Name owner,Address address,List<MenuItem> menuItems) {
        this.restaurantName = restaurantName;
        this.owner = owner;
        this.address = address;
        this.menuItems = menuItems;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public Name getOwner() {
        return owner;
    }

    public void setOwner(Name owner) {
        this.owner = owner;
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
}
