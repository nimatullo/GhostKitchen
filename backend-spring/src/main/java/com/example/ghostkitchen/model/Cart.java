package com.example.ghostkitchen.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Cart {
    @Id
    @GeneratedValue
    Long id;

    BigDecimal total = new BigDecimal("0.00");

    int numberOfItems;

    public void setNumberOfItems(int numberOfItems) {
        this.numberOfItems = numberOfItems;
    }

    public List<MenuItem> getItems() {
        return items;
    }

    public void setItems(List<MenuItem> items) {
        this.items = items;
    }

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name="cart_items",
            joinColumns = @JoinColumn(name="cart_id"),
            inverseJoinColumns = @JoinColumn(name="menu_item_id"))
    List<MenuItem> items = new ArrayList<>();

//    @Override
    public Long getId() {
        return this.id;
    }

//    @Override
    public void setId(Long id) {
        this.id = id;
    }

//    @Override
//    public User getUser() {
//        return this.user;
//    }
//
//    @Override
//    public void setUser(User user) {
//        this.user = user;
//    }

//    @Override
    public BigDecimal getTotal() {
        return total;
    }

//    @Override
    public void setTotal(BigDecimal total) {
        this.total = total;
    }

//    @Override
    public int getNumberOfItems() {
        return this.numberOfItems;
    }

    public void addItem(MenuItem item) {
        this.items.add(item);
        this.numberOfItems++;
        this.setTotal(this.total.add(item.getPrice()));
    }
}
