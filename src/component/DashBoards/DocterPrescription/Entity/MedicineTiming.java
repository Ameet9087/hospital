package com.LPHSmartX.hospital.DocterPrescription.Entity;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class MedicineTiming {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

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

    @ManyToMany
    @JoinTable(
        name = "pharmacy_item_dosage_medicine_timing",
        joinColumns = @JoinColumn(name = "medicine_timing_id"),
        inverseJoinColumns = @JoinColumn(name = "pharmacy_item_dosage_id")
    )
    private List<PharmacyItemDosage> pharmacyItemDosages = new ArrayList<>();
	     
}
