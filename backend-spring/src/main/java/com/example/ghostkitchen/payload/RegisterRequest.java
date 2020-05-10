package com.example.ghostkitchen.payload;

import com.example.ghostkitchen.model.Name;

import javax.validation.constraints.NotBlank;

public class RegisterRequest {
    @NotBlank
    Name name;

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    public Name getName() {
        return name;
    }

    public void setName(Name name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
