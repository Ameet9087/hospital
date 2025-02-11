package com.LPHSmartX.hospital.DocterPrescription.DTO;

import java.util.ArrayList;
import java.util.List;

import com.LPHSmartX.hospital.DocterPrescription.Entity.MedicineTiming;
import com.LPHSmartX.hospital.DocterPrescription.Entity.PharmacyItemDosage;
import com.LPHSmartX.hospital.Pharmacy.dto.PharmacyItemMasterDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PharmacyItemDosageDTO {

	  private int id;  // Unique identifier for the dosage record
	    private MedicationPrescriptionDTO medicationPrescriptionDTO; // ID of the related MedicationPrescription
	    private PharmacyItemMasterDTO pharmacyItemMasterDTO;  // The pharmacy item details
	    private String dosage;  // The dosage for the item
	    
	    private List<MedicineTimingDTO> medicineTimings;
}
