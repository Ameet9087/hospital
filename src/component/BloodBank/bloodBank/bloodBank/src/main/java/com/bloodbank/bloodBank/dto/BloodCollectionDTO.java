package com.bloodbank.bloodBank.dto;

import java.util.List;

import lombok.Data;

@Data
public class BloodCollectionDTO {
	private int collectionId;  // Represents the unique ID of the collection

    private List<BloodTestingDTO> bloodTesting;


}
