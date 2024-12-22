package com.bloodbank.bloodBank.entity;

// BasicInfo.java

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@Entity
public class BasicInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String fullName;
    private LocalDate dateOfBirth;
    private String gender;
    private String contactNumber;
    private String emailAddress;
    private String address;
    private String nationalId;
    // One-to-one relationship with HealthEligibilityInfo
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "health_eligibility_info_id", referencedColumnName = "id")
    private HealthAndEligibility healthEligibilityInfo;

    // One-to-one relationship with BloodTypeInfo
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "blood_type_info_id", referencedColumnName = "id")
    private BloodTypeInfo bloodTypeInfo;

    // One-to-one relationship with ConsentInfo
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "consent_info_id", referencedColumnName = "id")
    private ConsentAndCompliance consentInfo;

    // One-to-one relationship with BloodCollectionDetails
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "blood_collection_details_id", referencedColumnName = "id")
    private BloodCollectionDetails bloodCollectionDetails;
    // Getters and Setters
}
