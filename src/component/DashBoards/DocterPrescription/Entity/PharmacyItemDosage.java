package com.LPHSmartX.hospital.DocterPrescription.Entity;

import java.util.List;

import com.LPHSmartX.hospital.Pharmacy.model.PharmacyItemMaster; 

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class PharmacyItemDosage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "medication_prescription_id")
    private MedicationPrescription medicationPrescription;

    @ManyToOne
    @JoinColumn(name = "pharmacy_item_master_id")
    private PharmacyItemMaster pharmacyItemMaster;

    private String dosage;
    
    @ManyToMany(mappedBy = "pharmacyItemDosages")
    private List<MedicineTiming> medicineTimings;

}

