package com.example.ghostkitchen.payload;

import java.math.BigDecimal;
import java.util.List;

public class OrderRequest {
    List<MenuItemRequest> items;
    int numberOfItems;
    BigDecimal total;

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
