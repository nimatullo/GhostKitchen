package com.example.ghostkitchen.payload;

import com.example.ghostkitchen.model.Order;
import com.example.ghostkitchen.model.User;

public class DeliveryResponse {
    Long id;
    User deliveryPerson;
    OrderResponse order;
    boolean delivered;

    public DeliveryResponse(Long id, User deliveryPerson,Order order, boolean delivered) {
        this.id = id;
        this.deliveryPerson = deliveryPerson;
        this.delivered = delivered;
        if (order == null) {
            this.order = null;
        }
        else {
            this.order = new OrderResponse(order);
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getDeliveryPerson() {
        return deliveryPerson;
    }

    public void setDeliveryPerson(User deliveryPerson) {
        this.deliveryPerson = deliveryPerson;
    }

    public OrderResponse getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = new OrderResponse(order.getOrderNumber(), order.getNumberOfItems(), order.getTotal(),
                order.getItems(), order.getPaymentInfo(), order.getUser(), order.getRestaurant().getRestaurantName());
    }

    public void setOrder(OrderResponse order) {
        this.order = order;
    }

    public boolean isDelivered() {
        return delivered;
    }

    public void setDelivered(boolean delivered) {
        this.delivered = delivered;
    }
}
