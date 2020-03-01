package com.example.ghostkitchen.payload;

import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

public class MenuItemRequest {
    @NotBlank
    private String itemName;

    @NotBlank
    private BigDecimal itemPrice;

    @NotBlank
    private String itemDesc;

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public BigDecimal getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(BigDecimal itemPrice) {
        this.itemPrice = itemPrice;
    }

    public String getItemDesc() {
        return itemDesc;
    }

    public void setItemDesc(String itemDesc) {
        this.itemDesc = itemDesc;
    }
}
