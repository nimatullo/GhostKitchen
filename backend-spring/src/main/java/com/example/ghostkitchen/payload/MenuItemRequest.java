package com.example.ghostkitchen.payload;

import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

public class MenuItemRequest {
    Long id;
    @NotBlank
    private String name;

    @NotBlank
    private BigDecimal price;

    @NotBlank
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String itemName) {
        this.name = itemName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
