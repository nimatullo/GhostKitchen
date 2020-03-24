package com.example.ghostkitchen.payload;

import com.example.ghostkitchen.model.*;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
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
    private String orderPlacedDate;

    public OrderResponse() {
    }

    public OrderResponse(UUID orderNumber,int numberOfItems,BigDecimal total,List<MenuItem> menuItems,
                         PaymentDetails paymentMethod, User customerDetails, String orderPlacedDate) {
        this.orderNumber = orderNumber;
        this.numberOfItems = numberOfItems;
        this.total = total;
        this.menuItems = menuItems;
        this.paymentMethod = paymentMethod;
        this.customerDetails = customerDetails;
        this.orderPlacedDate = orderPlacedDate;

    }

    public OrderResponse(Order order) {
        this.orderNumber = order.getOrderNumber();
        this.numberOfItems = order.getNumberOfItems();
        this.total = order.getTotal();
        this.menuItems = order.getItems();
        this.paymentMethod = order.getPaymentInfo();
        this.customerDetails = order.getUser();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy hh:mm a");
        this.orderPlacedDate = formatter.format(order.getOrderPlacedDate());
        this.restaurantName = order.getRestaurant().getName();
        this.restaurantAddress = order.getRestaurant().getAddress();
    }

    public OrderResponse(UUID orderNumber,int numberOfItems,BigDecimal total,List<MenuItem> menuItems,
                         PaymentDetails paymentMethod,User customerDetails,String restaurantName,
                         Address restaurantAddress, String orderPlacedDate) {
        this(orderNumber, numberOfItems, total, menuItems, paymentMethod, customerDetails, orderPlacedDate);
        this.restaurantName = restaurantName;
        this.restaurantAddress = restaurantAddress;
    }

    public String getOrderPlacedDate() {
        return orderPlacedDate;
    }

    public void setOrderPlacedDate(String orderPlacedDate) {
        this.orderPlacedDate = orderPlacedDate;
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
