package com.bloodbank.bloodBank.dto;

// BasicInfoDTO.java
import com.bloodbank.bloodBank.entity.ConsentAndCompliance;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
public class BasicInfoDTO {
    private String fullName;
    private LocalDate dateOfBirth;
    private String gender;
    private String contactNumber;
    private String emailAddress;  // Optional
    private String address;
    private String nationalId;
    private HealthAndEligibilityDTO healthEligibilityInfo;
    private BloodTypeInfoDTO bloodTypeInfo;
    private ConsentAndCompliance consentInfo;
    private BloodCollectionDetailsDTO bloodCollectionDetails;

    // Getters and Setters
}
