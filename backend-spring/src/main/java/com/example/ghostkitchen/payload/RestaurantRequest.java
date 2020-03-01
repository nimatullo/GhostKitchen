package com.example.ghostkitchen.payload;

import com.example.ghostkitchen.model.Address;
import com.example.ghostkitchen.model.MenuItem;
import com.example.ghostkitchen.model.Name;
import com.example.ghostkitchen.model.User;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class RestaurantRequest {
    @NotBlank
    String restaurantName;

    @NotBlank
    Address address;

    @NotBlank
    Name owner;

    @NotBlank
    List <MenuItemRequest> menuItems;

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

    public Name getOwner() {
        return owner;
    }

    public void setOwner(Name owner) {
        this.owner = owner;
    }
}

