package com.example.ghostkitchen.payload;

import com.example.ghostkitchen.model.MenuItem;

import java.math.BigDecimal;
import java.util.List;

public class OrderResponse {
    private int numberOfItems;
    private BigDecimal total;
    private List<MenuItem> menuItems;

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
