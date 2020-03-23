package com.example.ghostkitchen.payload;

import com.example.ghostkitchen.model.Address;
import com.example.ghostkitchen.model.MenuItem;
import com.example.ghostkitchen.model.PaymentDetails;
import com.example.ghostkitchen.model.User;

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
