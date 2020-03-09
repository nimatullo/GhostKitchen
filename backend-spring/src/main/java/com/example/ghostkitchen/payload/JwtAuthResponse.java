package com.example.ghostkitchen.payload;

public class JwtAuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String firstName;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public JwtAuthResponse(String accessToken, String firstName) {
        this.accessToken = accessToken;
        this.firstName = firstName;
    }
}
