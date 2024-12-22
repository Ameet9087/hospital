package com.bloodbank.bloodBank.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data


@Table(name = "donors")
public class Donor {

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
    // Constructors (default and parameterized)
}
