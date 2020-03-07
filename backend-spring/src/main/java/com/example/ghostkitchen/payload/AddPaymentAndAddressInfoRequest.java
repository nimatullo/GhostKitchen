package com.example.ghostkitchen.payload;

import com.example.ghostkitchen.model.Address;
import com.example.ghostkitchen.model.Name;
import com.example.ghostkitchen.model.PaymentDetails;

public class AddPaymentAndAddressInfoRequest {
    PaymentDetails details;
    Address userAddress;

    public PaymentDetails getDetails() {
        return details;
    }

    public void setDetails(PaymentDetails details) {
        this.details = details;
    }

    public Address getUserAddress() {
        return userAddress;
    }

    public void setUserAddress(Address userAddress) {
        this.userAddress = userAddress;
    }
}
