package com.example.ghostkitchen.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Entity
public class Rating {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   Long id;

   @Min(1)
   @Max(5)
   int rating;

   @JsonIgnore
   @ManyToOne(cascade = CascadeType.ALL)
   @JoinColumn(name = "user_id")
   User user;

   public Rating() {
   }

   public Rating(int rating,User user) {
      this.rating = rating;
      this.user = user;
   }

   public Long getId() {
      return id;
   }

   public void setId(Long id) {
      this.id = id;
   }

   public int getRating() {
      return rating;
   }

   public void setRating(int rating) {
      this.rating = rating;
   }

   public User getUser() {
      return user;
   }

   public void setUser(User user) {
      this.user = user;
   }
}
