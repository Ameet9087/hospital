package com.LPHSmartX.hospital.DocterPrescription.ServiceIMP;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LPHSmartX.hospital.DocterPrescription.DTO.MedicationPrescriptionDTO;
import com.LPHSmartX.hospital.DocterPrescription.DTO.PharmacyItemDosageDTO;
import com.LPHSmartX.hospital.DocterPrescription.Entity.MedicationPrescription;
import com.LPHSmartX.hospital.DocterPrescription.Entity.PharmacyItemDosage;
import com.LPHSmartX.hospital.DocterPrescription.Repository.MedicationPrescriptionRepository;
import com.LPHSmartX.hospital.DocterPrescription.Repository.PharmacyItemDosageRepository;
import com.LPHSmartX.hospital.DocterPrescription.Service.MedicationPrescriptionService;
import com.LPHSmartX.hospital.Pharmacy.dto.PharmacyItemMasterDTO;
import com.LPHSmartX.hospital.Pharmacy.model.PharmacyItemMaster;
import com.LPHSmartX.hospital.Pharmacy.repository.PharmacyItemMasterRepository;

@Service
public class MedicationPrescriptionServiceImpl implements MedicationPrescriptionService {

    @Autowired
    private MedicationPrescriptionRepository medicationPrescriptionRepository;

    @Autowired
    private PharmacyItemMasterRepository pharmacyItemMasterRepository;

    @Autowired
    private PharmacyItemDosageRepository pharmacyItemDosageRepository;

    @Override
    public void createMedication(MedicationPrescriptionDTO medicationPrescriptionDTO) {
        MedicationPrescription medicationPrescription = new MedicationPrescription();
        medicationPrescription.setDosage(medicationPrescriptionDTO.getDosage());

        // Save and assign to a new variable
        final MedicationPrescription savedMedicationPrescription = medicationPrescriptionRepository.save(medicationPrescription);

        List<PharmacyItemDosage> pharmacyItemDosages = medicationPrescriptionDTO.getPharmacyItemsDosage().stream()
            .map(dto -> mapToPharmacyItemDosage(dto, savedMedicationPrescription)) // Use the final variable
            .collect(Collectors.toList());

        pharmacyItemDosageRepository.saveAll(pharmacyItemDosages);
    }

    @Override
    public List<MedicationPrescriptionDTO> getAllMedication() {
        return medicationPrescriptionRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MedicationPrescriptionDTO getMedicationById(int medicationPrescriptionId) {
        MedicationPrescription medicationPrescription = medicationPrescriptionRepository.findById(medicationPrescriptionId)
                .orElseThrow(() -> new RuntimeException("Medication Prescription not found with id: " + medicationPrescriptionId));

        return mapToDTO(medicationPrescription);
    }

    @Override
    public void updateMedication(int medicationPrescriptionId, MedicationPrescriptionDTO medicationPrescriptionDTO) {
        MedicationPrescription medicationPrescription = medicationPrescriptionRepository.findById(medicationPrescriptionId)
                .orElseThrow(() -> new RuntimeException("Medication Prescription not found with id: " + medicationPrescriptionId));
        
        medicationPrescription.setDosage(medicationPrescriptionDTO.getDosage());
        
//        pharmacyItemDosageRepository.deleteByMedicationPrescription(medicationPrescription);
        List<PharmacyItemDosage> newDosages = medicationPrescriptionDTO.getPharmacyItemsDosage().stream()
            .map(dto -> mapToPharmacyItemDosage(dto, medicationPrescription))
            .collect(Collectors.toList());
        
        pharmacyItemDosageRepository.saveAll(newDosages);
    }

    @Override
    public void deleteMedication(int medicationPrescriptionId) {
        MedicationPrescription medicationPrescription = medicationPrescriptionRepository.findById(medicationPrescriptionId)
                .orElseThrow(() -> new RuntimeException("Medication Prescription not found with id: " + medicationPrescriptionId));
        
//        pharmacyItemDosageRepository.deleteByMedicationPrescription(medicationPrescription);
        medicationPrescriptionRepository.delete(medicationPrescription);
    }

    private MedicationPrescriptionDTO mapToDTO(MedicationPrescription medicationPrescription) {
        MedicationPrescriptionDTO medicationPrescriptionDTO = new MedicationPrescriptionDTO();
        medicationPrescriptionDTO.setMedicationPrescriptionId(medicationPrescription.getMedicationPrescriptionId());
        medicationPrescriptionDTO.setDosage(medicationPrescription.getDosage());

        List<PharmacyItemDosageDTO> pharmacyItemDosageDTOs = pharmacyItemDosageRepository.findByMedicationPrescription(medicationPrescription).stream()
                .map(this::mapToPharmacyItemDosageDTO)
                .collect(Collectors.toList());
        
        medicationPrescriptionDTO.setPharmacyItemsDosage(pharmacyItemDosageDTOs);
        return medicationPrescriptionDTO;
    }

    private PharmacyItemDosage mapToPharmacyItemDosage(PharmacyItemDosageDTO dto, MedicationPrescription prescription) {
        PharmacyItemMaster pharmacyItemMaster = pharmacyItemMasterRepository.findById(dto.getPharmacyItemMasterDTO().getPharmacyItemMasterId())
                .orElseThrow(() -> new RuntimeException("Pharmacy Item not found with id: " + dto.getPharmacyItemMasterDTO().getPharmacyItemMasterId()));
        
        return new PharmacyItemDosage(0, prescription, pharmacyItemMaster, dto.getDosage(), null);
    }

 
    
    private PharmacyItemDosageDTO mapToPharmacyItemDosageDTO(PharmacyItemDosage pharmacyItemDosage) {
        // Fetching the PharmacyItemMaster associated with the dosage
        PharmacyItemMaster pharmacyItemMaster = pharmacyItemDosage.getPharmacyItemMaster();
        System.out.println("Fetching Item Group: " + pharmacyItemMaster.getItemName()); // Debug log

        // Creating PharmacyItemMasterDTO from the fetched entity
        PharmacyItemMasterDTO pharmacyItemMasterDTO = new PharmacyItemMasterDTO();
        pharmacyItemMasterDTO.setItemName(pharmacyItemMaster.getItemName());
        pharmacyItemMasterDTO.setPharmacyItemMasterId(pharmacyItemMaster.getPharmacyItemMasterId());
        

        return new PharmacyItemDosageDTO(
            pharmacyItemDosage.getId(),
            new MedicationPrescriptionDTO(
                pharmacyItemDosage.getMedicationPrescription().getMedicationPrescriptionId(),
                pharmacyItemDosage.getMedicationPrescription().getDosage(),null,
                null
            ),
            pharmacyItemMasterDTO,  // Pass the correct PharmacyItemMasterDTO
            pharmacyItemDosage.getDosage(), null
        );
    }

}
