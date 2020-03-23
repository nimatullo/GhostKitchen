package com.example.ghostkitchen.payload;

import com.example.ghostkitchen.model.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public class OrderResponse {
    private UUID orderNumber;
    private int numberOfItems;
    private BigDecimal total;
    private List<MenuItem> menuItems;
    private PaymentDetails paymentMethod;
    private User customerDetails;
    private String restaurantName;
    private Address restaurantAddress;

    public OrderResponse() {
    }

    public OrderResponse(UUID orderNumber,int numberOfItems,BigDecimal total,List<MenuItem> menuItems,
                         PaymentDetails paymentMethod, User customerDetails) {
        this.orderNumber = orderNumber;
        this.numberOfItems = numberOfItems;
        this.total = total;
        this.menuItems = menuItems;
        this.paymentMethod = paymentMethod;
        this.customerDetails = customerDetails;
    }

    public OrderResponse(UUID orderNumber,int numberOfItems,BigDecimal total,List<MenuItem> menuItems,PaymentDetails paymentMethod,User customerDetails,String restaurantName,Address restaurantAddress) {
        this.orderNumber = orderNumber;
        this.numberOfItems = numberOfItems;
        this.total = total;
        this.menuItems = menuItems;
        this.paymentMethod = paymentMethod;
        this.customerDetails = customerDetails;
        this.restaurantName = restaurantName;
        this.restaurantAddress = restaurantAddress;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public Address getRestaurantAddress() {
        return restaurantAddress;
    }

    public void setRestaurantAddress(Address restaurantAddress) {
        this.restaurantAddress = restaurantAddress;
    }

    public User getCustomerDetails() {
        return customerDetails;
    }

    public void setCustomerDetails(User customerDetails) {
        this.customerDetails = customerDetails;
    }

    public PaymentDetails getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentDetails paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public UUID getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(UUID orderNumber) {
        this.orderNumber = orderNumber;
    }

    public int getNumberOfItems() {
        return numberOfItems;
    }

    public void setNumberOfItems(int numberOfItems) {
        this.numberOfItems = numberOfItems;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public List<MenuItem> getMenuItems() {
        return menuItems;
    }

    public void setMenuItems(List<MenuItem> menuItems) {
        this.menuItems = menuItems;
    }
}
