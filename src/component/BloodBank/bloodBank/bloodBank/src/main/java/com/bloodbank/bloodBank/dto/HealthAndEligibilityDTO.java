package com.bloodbank.bloodBank.dto;

// HealthAndEligibilityDTO.java
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
public class HealthAndEligibilityDTO {
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
