package com.LPHSmartX.hospital.DocterPrescription.DTO;

import lombok.Getter; 
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import com.LPHSmartX.hospital.DocterPrescription.Entity.MedicationPrescription;
import com.LPHSmartX.hospital.Pharmacy.dto.PharmacyItemMasterDTO;

 
@Getter
@Setter
public class DiseaseDTO {
    private Long diseaseId;
    private String name;

    private List<SymptomDTO> symptoms = new ArrayList<>(); // Ensures no null pointer
    
//    private List<PharmacyItemMasterDTO> pharmacyItems = new ArrayList<>();
    
    private List<MedicationPrescriptionDTO> medicationPrescriptions = new ArrayList<>();
    
 // Constructors
    public DiseaseDTO() {
        this.symptoms = new ArrayList<>();
    }

    public DiseaseDTO(Long diseaseId, String name) {
        this.diseaseId = diseaseId;
        this.name = name;
        this.symptoms = new ArrayList<>(); // Ensures list is never null
    }

    // Corrected Getter and Setter
    public List<SymptomDTO> getSymptoms() { // Changed to match field name
        return symptoms != null ? symptoms : new ArrayList<>();
    }

    public void setSymptoms(List<SymptomDTO> symptoms) { // Changed to match field name
        this.symptoms = symptoms != null ? symptoms : new ArrayList<>();
    }

}
