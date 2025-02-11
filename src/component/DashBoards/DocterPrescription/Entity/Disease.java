package com.LPHSmartX.hospital.DocterPrescription.Entity;

 import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import com.LPHSmartX.hospital.Pharmacy.model.PharmacyItemMaster;

@Entity
@Getter
@Setter
public class Disease {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diseaseId;
    private String name;

    @ManyToMany
    @JoinTable(
            name = "disease_symptom",
            joinColumns = @JoinColumn(name = "disease_id"),
            inverseJoinColumns = @JoinColumn(name = "symptom_id")
    )
    private List<Symptom> symptoms= new ArrayList<>(); 
    
//    @ManyToMany(mappedBy = "diseases")
//    private List<MedicationPrescription> medicationPrescriptions = new ArrayList<>();
    
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "medication_disease",
        joinColumns = @JoinColumn(name = "disease_id"),
        inverseJoinColumns = @JoinColumn(name = "medication_prescription_id")
    )
    private List<MedicationPrescription> medicationPrescriptions = new ArrayList<>();

}
