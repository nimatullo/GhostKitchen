package com.example.ghostkitchen.model;

import javax.persistence.*;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;

@Entity
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String restaurantName;

    @OneToOne(cascade = CascadeType.ALL)
    private Address address;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "name_id", referencedColumnName = "id")
    private Name owner;

    @DecimalMin("0.0")
    @DecimalMax("5.0")
    private double rating;

    private int numberOfReviews;

    public Restaurant() {

    }

    public Restaurant(String name,Address address,Name owner,double rating,int numberOfReviews) {
        this.restaurantName = name;
        this.address = address;
        this.owner = owner;
        this.rating = rating;
        this.numberOfReviews = numberOfReviews;
    }

    public void addReview(double review) {
        this.numberOfReviews++;
        this.rating = (this.rating + review) / numberOfReviews;
    }

    public int getNumberOfReviews() {
        return numberOfReviews;
    }

    public void setNumberOfReviews(int numberOfReviews) {
        this.numberOfReviews = numberOfReviews;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return restaurantName;
    }

    public void setName(String name) {
        this.restaurantName = name;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Name getOwner() {
        return owner;
    }

    public void setOwner(Name owner) {
        this.owner = owner;
    }
}
