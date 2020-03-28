package com.example.ghostkitchen.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue
    Long id;

    @CreationTimestamp
    @DateTimeFormat(pattern = "MM/dd/yyy hh:mm")
    LocalDateTime orderPlacedDate;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "paymentinfo_id", nullable = false)
    PaymentDetails paymentInfo;

    UUID orderNumber;

    BigDecimal total;

    int numberOfItems;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "restaurant_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Restaurant restaurant;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "order_items",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "menu_item_id"))
    List<MenuItem> items = new ArrayList<>();

    @OneToOne
    Delivery delivery;

    boolean delivered = false;

    public Order() {
//        this.orderPlacedDate = LocalDateTime.now();
    }

    public Order(User user,PaymentDetails paymentInfo,UUID orderNumber,BigDecimal total,int numberOfItems,
                 Restaurant restaurant, Delivery delivery) {
        this.user = user;
        this.paymentInfo = paymentInfo;
        this.orderNumber = orderNumber;
        this.total = total;
        this.numberOfItems = numberOfItems;
        this.restaurant = restaurant;
        this.delivery = delivery;
    }

    public boolean isDelivered() {
        return delivered;
    }

    public Order setDelivered(boolean delivered) {
        this.delivered = delivered;
        return this;
    }

    public LocalDateTime getOrderPlacedDate() {
        return orderPlacedDate;
    }

    public Delivery getDelivery() {
        return delivery;
    }

    public void setDelivery(Delivery delivery) {
        this.delivery = delivery;
    }

    public void setOrderPlacedDate(LocalDateTime orderPlacedDate) {
        this.orderPlacedDate = orderPlacedDate;
    }

    public List<MenuItem> getItems() {
        return items;
    }

    public void setItems(List<MenuItem> items) {
        this.items = items;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UUID getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(UUID orderNumber) {
        this.orderNumber = orderNumber;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public int getNumberOfItems() {
        return numberOfItems;
    }

    public void setNumberOfItems(int numberOfItems) {
        this.numberOfItems = numberOfItems;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public PaymentDetails getPaymentInfo() {
        return paymentInfo;
    }

    public void setPaymentInfo(PaymentDetails paymentInfo) {
        this.paymentInfo = paymentInfo;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }
}
