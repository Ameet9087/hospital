package com.bloodbank.bloodBank.dto;

// BloodCollectionDetailsDTO.java
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
public class BloodCollectionDetailsDTO {
    private LocalDateTime collectionDateTime;
    private String collectionSite;
    private String collectionMethod;
    private int volumeCollected;
    private String collectionBagNumber;
    private String barcodeOrQrCode;

    // Getters and Setters
}
