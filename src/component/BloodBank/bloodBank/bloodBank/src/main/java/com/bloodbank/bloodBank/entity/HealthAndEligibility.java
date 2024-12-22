package com.bloodbank.bloodBank.entity;

// HealthAndEligibility.java
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@Entity
public class HealthAndEligibility {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDate dateOfLastDonation;
    private double weight;
    private String bloodPressure;
    private double hemoglobinLevel;
    private String pulseAndTemperature;
    private String medicalHistory;
    private String travelHistory;
    private String vaccinationStatus;
    private String tattoosOrPiercings;
    private String allergiesOrAdverseReactions;

    // Getters and Setters
}
