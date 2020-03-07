package com.example.ghostkitchen.payload;

import com.example.ghostkitchen.model.PaymentDetails;

import java.math.BigDecimal;
import java.util.List;

public class OrderRequest {
    List<MenuItemRequest> items;
    int numberOfItems;
    BigDecimal total;
    PaymentDetails formOfPayment;

    public List<MenuItemRequest> getItems() {
        return items;
    }

    public PaymentDetails getFormOfPayment() {
        return formOfPayment;
    }

    public void setFormOfPayment(PaymentDetails formOfPayment) {
        this.formOfPayment = formOfPayment;
    }

    public List<MenuItemRequest> getMenuItems() {
        return items;
    }

    public void setItems(List<MenuItemRequest> items) {
        this.items = items;
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
}
