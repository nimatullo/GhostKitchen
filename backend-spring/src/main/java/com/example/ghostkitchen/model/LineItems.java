package com.example.ghostkitchen.model;

import java.math.BigDecimal;

public interface LineItems {
    Long getId();

    void setId(Long id);

    User getUser();

    void setUser(User user);

    BigDecimal getTotal();

    void setTotal(BigDecimal total);

    int getNumberOfItems();
}