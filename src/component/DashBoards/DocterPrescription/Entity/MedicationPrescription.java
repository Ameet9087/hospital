package com.LPHSmartX.hospital.DocterPrescription.Entity;

import java.util.ArrayList; 
import java.util.List;

import com.LPHSmartX.hospital.Pharmacy.model.PharmacyItemMaster;
import jakarta.persistence.*;

 import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class MedicationPrescription {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int medicationPrescriptionId;
	
	private String dosage;
	
	// One-to-Many with PharmacyItemDosage (Stores item + dosage)
    @OneToMany(mappedBy = "medicationPrescription", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PharmacyItemDosage> pharmacyItemDosages = new ArrayList<>();
    
    @ManyToMany(mappedBy = "medicationPrescriptions")
    private List<Disease> diseases = new ArrayList<>();
    
    
}
