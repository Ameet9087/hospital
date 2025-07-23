package com.LPHSmartX.hospital.DocterPrescription.DTO;

import java.util.ArrayList;
import java.util.List;

import com.LPHSmartX.hospital.DocterPrescription.Entity.Disease;
import com.LPHSmartX.hospital.DocterPrescription.Entity.MedicineTiming;
import com.LPHSmartX.hospital.Pharmacy.dto.PharmacyItemMasterDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicationPrescriptionDTO {

	    private int medicationPrescriptionId;
	    private String dosage;
	    private List<PharmacyItemDosageDTO> pharmacyItemsDosage = new ArrayList<>(); 
	    private List<DiseaseDTO> diseases = new ArrayList<>();
	    }
