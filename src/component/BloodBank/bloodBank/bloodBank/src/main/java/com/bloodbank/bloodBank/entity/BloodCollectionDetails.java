package com.bloodbank.bloodBank.entity;

// BloodCollectionDetails.java
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@Entity
public class BloodCollectionDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDateTime collectionDateTime;
    private String collectionSite;
    private String collectionMethod;
    private int volumeCollected;
    private String collectionBagNumber;
    private String barcodeOrQrCode;

    // Getters and Setters
}
