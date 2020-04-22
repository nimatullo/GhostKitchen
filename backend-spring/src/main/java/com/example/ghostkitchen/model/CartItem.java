package com.example.ghostkitchen.model;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class CartItem extends Item {
    private int quantity;

    public CartItem(int quantity) {
        this.quantity = quantity;
    }

    public CartItem() {
        this.quantity = 1;
    }

    public CartItem(MenuItem item) {
        super(item.getName(), item.getPrice(), item.getDescription(), item.getUrlPath(), item.getRestaurant());
        this.quantity = 1;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void increaseQuantity() {
        quantity++;
    }

    public void decreaseQuantity() {quantity--;}
}
