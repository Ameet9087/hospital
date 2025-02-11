package com.LPHSmartX.hospital.DocterPrescription.Repository;

import java.util.Collection;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LPHSmartX.hospital.DocterPrescription.Entity.MedicationPrescription;
import com.LPHSmartX.hospital.DocterPrescription.Entity.PharmacyItemDosage;

@Repository
public interface PharmacyItemDosageRepository extends JpaRepository<PharmacyItemDosage, Integer>{

	Collection<PharmacyItemDosage> findByMedicationPrescription(MedicationPrescription medicationPrescription);

	 // Automatically generates a query based on the method name
//    Optional<PharmacyItemDosage> findByItemName(String itemName);
}
