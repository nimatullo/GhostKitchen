package com.example.ghostkitchen.payload;

import java.util.List;

public class SubmitOrderRequest {
    int numberOfItems;
    List<MenuItemRequest> items;
}
