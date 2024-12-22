package com.bloodbank.bloodBank.dto;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Data
public class DonorDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private LocalDate dob;
    private String gender;
    private String bloodGroup;
    private String phoneNumber;
    private String email;
    private String address;
    private String city;
    private String state;
    private String postalCode;
    private double weight;
    private LocalDate lastDonationDate;
    private String medication;
    private String surgeries;
    private String chronicIllness;
    private String travelHistory;
    private String infectiousDisease;
    private String healthComments;
    private LocalDate donationDate;
    private String donationType;
    private String donationCenter;
    private String timeSlot;
    private boolean consent;
    private boolean shareInfo;

    // Getters and Setters
}

