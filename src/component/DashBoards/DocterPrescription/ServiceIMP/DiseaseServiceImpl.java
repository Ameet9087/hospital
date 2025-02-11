package com.LPHSmartX.hospital.DocterPrescription.ServiceIMP;

import com.LPHSmartX.hospital.DocterPrescription.DTO.DiseaseDTO;
import com.LPHSmartX.hospital.DocterPrescription.DTO.MedicationPrescriptionDTO;
import com.LPHSmartX.hospital.DocterPrescription.DTO.PharmacyItemDosageDTO;
import com.LPHSmartX.hospital.DocterPrescription.DTO.SymptomDTO;
import com.LPHSmartX.hospital.DocterPrescription.Entity.Disease;
import com.LPHSmartX.hospital.DocterPrescription.Entity.MedicationPrescription;
import com.LPHSmartX.hospital.DocterPrescription.Entity.Symptom;
import com.LPHSmartX.hospital.DocterPrescription.Repository.DiseaseRepository;
import com.LPHSmartX.hospital.DocterPrescription.Repository.MedicationPrescriptionRepository;
import com.LPHSmartX.hospital.DocterPrescription.Repository.SymptomRepository;
import com.LPHSmartX.hospital.DocterPrescription.Service.DiseaseService;
import com.LPHSmartX.hospital.Pharmacy.dto.PharmacyItemMasterDTO;
import com.LPHSmartX.hospital.Pharmacy.model.PharmacyItemMaster;
import com.LPHSmartX.hospital.Pharmacy.repository.PharmacyItemMasterRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DiseaseServiceImpl implements DiseaseService {

    @Autowired
    private DiseaseRepository diseaseRepository;

    @Autowired
    private SymptomRepository symptomRepository;
    
    @Autowired
    private PharmacyItemMasterRepository pharmacyItemMasterRepository;
    
    @Autowired
    private MedicationPrescriptionRepository medicationPrescriptionRepository;

    @Override
    public DiseaseDTO createDisease(DiseaseDTO diseaseDTO) {
        Disease disease = new Disease();
        disease.setName(diseaseDTO.getName());

        // Fetch Symptoms
        List<Symptom> symptoms = diseaseDTO.getSymptoms().stream()
            .map(symptomDTO -> symptomRepository.findById(symptomDTO.getSymptomId())
                .orElseThrow(() -> new RuntimeException("Symptom not found with id: " + symptomDTO.getSymptomId())))
            .collect(Collectors.toList());
        disease.setSymptoms(symptoms);

        // Fetch or Create MedicationPrescriptions
        List<MedicationPrescription> medicationPrescriptions = diseaseDTO.getMedicationPrescriptions().stream()
            .map(medicationDto -> medicationPrescriptionRepository.findById(medicationDto.getMedicationPrescriptionId())
                .orElseGet(() -> {
                    MedicationPrescription newMedication = new MedicationPrescription();
                    newMedication.setDosage(medicationDto.getDosage());
                    return medicationPrescriptionRepository.save(newMedication);
                }))
            .collect(Collectors.toList());

        disease.setMedicationPrescriptions(medicationPrescriptions);

        // Save Disease with Medications
        Disease savedDisease = diseaseRepository.save(disease);
        return mapToDTO(savedDisease);
    }

    @Override
    public DiseaseDTO getDiseaseById(Long diseaseId) {
        Disease disease = diseaseRepository.findById(diseaseId)
                .orElseThrow(() -> new RuntimeException("Disease not found with id: " + diseaseId));
        return mapToDTO(disease);
    }

    @Override
    public List<DiseaseDTO> getAllDiseases() {
        return diseaseRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DiseaseDTO updateDisease(Long diseaseId, DiseaseDTO diseaseDTO) {
        Disease disease = diseaseRepository.findById(diseaseId)
                .orElseThrow(() -> new RuntimeException("Disease not found with id: " + diseaseId));

        disease.setName(diseaseDTO.getName());

        // Fetch symptoms one by one using findById
        List<Symptom> symptoms = diseaseDTO.getSymptoms().stream()
                .map(symptomDTO -> symptomRepository.findById(symptomDTO.getSymptomId())
                        .orElseThrow(() -> new RuntimeException("Symptom not found with id: " + symptomDTO.getSymptomId())))
                .collect(Collectors.toList());

        disease.setSymptoms(symptoms);
        Disease updatedDisease = diseaseRepository.save(disease);
        return mapToDTO(updatedDisease);
    }

    @Override
    public void deleteDisease(Long diseaseId) {
        Disease disease = diseaseRepository.findById(diseaseId)
                .orElseThrow(() -> new RuntimeException("Disease not found with id: " + diseaseId));
        diseaseRepository.delete(disease);
    }

    private DiseaseDTO mapToDTO(Disease disease) {
        DiseaseDTO diseaseDTO = new DiseaseDTO();
        diseaseDTO.setDiseaseId(disease.getDiseaseId());
        diseaseDTO.setName(disease.getName());

        List<SymptomDTO> symptomDTOs = disease.getSymptoms().stream()
                .map(this::mapToSymptomDTO)
                .collect(Collectors.toList());
        diseaseDTO.setSymptoms(symptomDTOs);
 
        List<MedicationPrescriptionDTO> medicationPrescriptionDTOs = disease.getMedicationPrescriptions().stream()
        		.map(this::mapToMedicationPrescriptionDTO)
        		.collect(Collectors.toList());
        diseaseDTO.setMedicationPrescriptions(medicationPrescriptionDTOs);
        return diseaseDTO;
    }

    private SymptomDTO mapToSymptomDTO(Symptom symptom) {
        SymptomDTO symptomDTO = new SymptomDTO();
        symptomDTO.setSymptomId(symptom.getSymptomId());
        symptomDTO.setSymptomsName(symptom.getSymptomsName());
        return symptomDTO;
    }
    
    private MedicationPrescriptionDTO mapToMedicationPrescriptionDTO(MedicationPrescription medicationPrescription) {
        // Create a new MedicationPrescriptionDTO object
        MedicationPrescriptionDTO medicationPrescriptionDTO = new MedicationPrescriptionDTO();
        
        // Set the fields for medicationPrescriptionDTO
        medicationPrescriptionDTO.setMedicationPrescriptionId(medicationPrescription.getMedicationPrescriptionId());
        medicationPrescriptionDTO.setDosage(medicationPrescription.getDosage());

        // Map PharmacyItemDosage to PharmacyItemDosageDTO and set it in the DTO
        List<PharmacyItemDosageDTO> pharmacyItemDosages = medicationPrescription.getPharmacyItemDosages().stream()
                .map(pharmacyItemDosage -> {
                    PharmacyItemDosageDTO pharmacyItemDosageDTO = new PharmacyItemDosageDTO();
                    pharmacyItemDosageDTO.setId(pharmacyItemDosage.getId());
                    pharmacyItemDosageDTO.setDosage(pharmacyItemDosage.getDosage());

                    // Assuming PharmacyItemMaster is the entity and we need to convert it to DTO
                    PharmacyItemMasterDTO pharmacyItemMasterDTO = new PharmacyItemMasterDTO();
                    pharmacyItemMasterDTO.setPharmacyItemMasterId(pharmacyItemDosage.getPharmacyItemMaster().getPharmacyItemMasterId());
                    pharmacyItemMasterDTO.setItemName(pharmacyItemDosage.getPharmacyItemMaster().getItemName());
                    // Set other fields as needed
                    pharmacyItemDosageDTO.setPharmacyItemMasterDTO(pharmacyItemMasterDTO);

                    // Set the related MedicationPrescriptionDTO if needed
                    MedicationPrescriptionDTO relatedPrescriptionDTO = new MedicationPrescriptionDTO();
                    relatedPrescriptionDTO.setMedicationPrescriptionId(medicationPrescription.getMedicationPrescriptionId());
                    pharmacyItemDosageDTO.setMedicationPrescriptionDTO(relatedPrescriptionDTO);

                    return pharmacyItemDosageDTO;
                })
                .collect(Collectors.toList());

        medicationPrescriptionDTO.setPharmacyItemsDosage(pharmacyItemDosages);
        return medicationPrescriptionDTO;
    }

 
}
