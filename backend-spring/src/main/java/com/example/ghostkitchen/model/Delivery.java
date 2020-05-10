package com.example.ghostkitchen.model;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
public class Delivery {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    Long id;

    @OneToOne(mappedBy = "delivery")
    Order order;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "deliveryperson_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    User deliveryPerson;

    boolean delivered = false;

    public Delivery() {
    }

    public Delivery(Order order) {
        this.order = order;
    }

    public boolean isDelivered() {
        return delivered;
    }

    public void setDelivered(boolean delivered) {
        this.delivered = delivered;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public User getDeliveryPerson() {
        return deliveryPerson;
    }

    public void setDeliveryPerson(User deliveryPerson) {
        this.deliveryPerson = deliveryPerson;
    }
}
