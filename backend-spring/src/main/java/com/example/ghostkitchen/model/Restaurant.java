package com.example.ghostkitchen.model;

import com.example.ghostkitchen.repo.RestaurantRepo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import java.util.*;

@Entity
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String restaurantName;

    @OneToOne(cascade = CascadeType.ALL)
    private Address address;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private User owner;

    @DecimalMin("0.0")
    @DecimalMax("5.0")
    private double averageRating;

    private int numberOfReviews;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name="restaurant_rating",
            joinColumns = @JoinColumn(name="restaurant_id", nullable = true),
            inverseJoinColumns = @JoinColumn(name="rating_id"))
    private List<Rating> listOfRatings = new ArrayList<>();

    @JsonIgnore
    @OrderBy("number_of_previous_orders desc")
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<RestaurantCustomer> restaurantCustomerList = new ArrayList<>();

    @ElementCollection
    Set<String> categories = new HashSet<>();

    public Restaurant() {

    }

    public Restaurant(String name,Address address,User owner) {
        this.restaurantName = name;
        this.address = address;
        this.owner = owner;
        this.averageRating = 0;
        this.numberOfReviews = 0;
    }

    public void addRating(Rating newRating) {
        listOfRatings.add(newRating);
        averageRating = findAverageRating();
        numberOfReviews++;
    }

    public double findAverageRating() {
        return listOfRatings.stream()
                .mapToDouble(Rating::getRating)
                .average()
                .orElse(Double.NaN);
    }

    public boolean checkForRating(User user) {
        return listOfRatings.stream().anyMatch(rating -> user.equals(rating.getUser()));
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

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double rating) {
        this.averageRating = rating;
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

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<Rating> getListOfRatings() {
        return listOfRatings;
    }

    public void setListOfRatings(List<Rating> listOfRatings) {
        this.listOfRatings = listOfRatings;
    }

    public List<RestaurantCustomer> getRestaurantCustomerList() {
        return restaurantCustomerList;
    }

    public void setRestaurantCustomerList(List<RestaurantCustomer> restaurantCustomerList) {
        this.restaurantCustomerList = restaurantCustomerList;
    }

    public void addCustomer(RestaurantCustomer customer) {
        if (restaurantCustomerList.contains(customer)) {
            restaurantCustomerList.get(restaurantCustomerList.indexOf(customer)).incrementNumberOfPreviousOrders();
        }
        else {
            restaurantCustomerList.add(customer);
        }
    }

    public Set<String> getCategories() {
        return categories;
    }

    public void setCategories(Set<String> categories) {
        this.categories = categories;
    }

    public void addCategory(String category) {
        this.categories.add(category);
    }
}
