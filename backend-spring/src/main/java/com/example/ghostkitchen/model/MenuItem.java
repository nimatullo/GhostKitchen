package com.example.ghostkitchen.model;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class MenuItem extends Item {
    public MenuItem() {
    }

    public MenuItem(String name, BigDecimal price, String description) {
        super(name, price, description);
    }
}
