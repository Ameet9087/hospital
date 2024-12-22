package com.bloodbank.bloodBank.entity;

// BloodTypeInfo.java

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class BloodTypeInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String bloodGroup;  // A, B, AB, or O
    private String rhFactor;    // Positive or Negative
    private String crossMatchingInfo;  // If applicable
    // Getters and Setters
}
