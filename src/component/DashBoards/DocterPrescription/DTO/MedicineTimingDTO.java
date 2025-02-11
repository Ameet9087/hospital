package com.LPHSmartX.hospital.DocterPrescription.DTO;

import java.util.ArrayList;
import java.util.List;

import com.LPHSmartX.hospital.DocterPrescription.Entity.PharmacyItemDosage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MedicineTimingDTO {

    private int id;

    // Item Name from PharmacyItemMaster (via PharmacyItemDosage)
    private String itemName;

 // Morning dosage details
    private String morning;
    private String morningBeforeMeal;
    private String morningAfterMeal;

    // Afternoon dosage details
    private String afternoon;
    private String afternoonBeforeMeal;
    private String afternoonAfterMeal;

    // Evening dosage details
    private String evening;
    private String eveningBeforeMeal;
    private String eveningAfterMeal;

    // Night dosage details
    private String night;
    private String nightBeforeMeal;
    private String nightAfterMeal;
    
    private List<PharmacyItemDosageDTO> pharmacyItemDosages = new ArrayList<>();
}

