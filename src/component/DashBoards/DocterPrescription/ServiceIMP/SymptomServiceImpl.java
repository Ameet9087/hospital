package com.LPHSmartX.hospital.DocterPrescription.ServiceIMP;

import com.LPHSmartX.hospital.DocterPrescription.DTO.DiseaseDTO;
import com.LPHSmartX.hospital.DocterPrescription.DTO.SymptomDTO;
import com.LPHSmartX.hospital.DocterPrescription.Entity.Disease;
import com.LPHSmartX.hospital.DocterPrescription.Entity.Symptom;
import com.LPHSmartX.hospital.DocterPrescription.Repository.SymptomRepository;
import com.LPHSmartX.hospital.DocterPrescription.Repository.DiseaseRepository;
import com.LPHSmartX.hospital.DocterPrescription.Service.SymptomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SymptomServiceImpl implements SymptomService {

    @Autowired
    private SymptomRepository symptomRepository;

    @Autowired
    private DiseaseRepository diseaseRepository;

    @Override
    public SymptomDTO createSymptom(SymptomDTO symptomDTO) {
        Symptom symptom = new Symptom();
        symptom.setSymptomsName(symptomDTO.getSymptomsName());
//        symptom.setCategory(symptomDTO.getCategory());

        // If disease list is provided, map diseases and set them to the symptom
        if (symptomDTO.getDisease() != null) {
            List<Disease> diseases = symptomDTO.getDisease().stream()
                    .map(diseaseDTO -> diseaseRepository.findById(diseaseDTO.getDiseaseId())
                            .orElseThrow(() -> new RuntimeException("Disease not found with id: " + diseaseDTO.getDiseaseId())))
                    .collect(Collectors.toList());
            symptom.setDiseases(diseases);
        }

        Symptom savedSymptom = symptomRepository.save(symptom);
        return mapToDTO(savedSymptom);
    }

    @Override
    public SymptomDTO getSymptomById(Long symptomId) {
        Symptom symptom = symptomRepository.findById(symptomId)
                .orElseThrow(() -> new RuntimeException("Symptom not found with id: " + symptomId));
        return mapToDTO(symptom);
    }

    @Override
    public List<SymptomDTO> getAllSymptoms() {
        List<Symptom> symptoms = symptomRepository.findAll();
        return symptoms.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public SymptomDTO updateSymptom(Long symptomId, SymptomDTO symptomDTO) {
        Symptom symptom = symptomRepository.findById(symptomId)
                .orElseThrow(() -> new RuntimeException("Symptom not found with id: " + symptomId));

        symptom.setSymptomsName(symptomDTO.getSymptomsName());
//        symptom.setCategory(symptomDTO.getCategory());

        // Update diseases if present
        if (symptomDTO.getDisease() != null) {
            List<Disease> diseases = symptomDTO.getDisease().stream()
                    .map(diseaseDTO -> diseaseRepository.findById(diseaseDTO.getDiseaseId())
                            .orElseThrow(() -> new RuntimeException("Disease not found with id: " + diseaseDTO.getDiseaseId())))
                    .collect(Collectors.toList());
            symptom.setDiseases(diseases);
        }

        Symptom updatedSymptom = symptomRepository.save(symptom);
        return mapToDTO(updatedSymptom);
    }

    @Override
    public void deleteSymptom(Long symptomId) {
        Symptom symptom = symptomRepository.findById(symptomId)
                .orElseThrow(() -> new RuntimeException("Symptom not found with id: " + symptomId));
        symptomRepository.delete(symptom);
    }

    private SymptomDTO mapToDTO(Symptom symptom) {
        SymptomDTO symptomDTO = new SymptomDTO();
        symptomDTO.setSymptomId(symptom.getSymptomId());
        symptomDTO.setSymptomsName(symptom.getSymptomsName());
//        symptomDTO.setCategory(symptom.getCategory());

        // Convert the associated diseases into DTOs and set
        if (symptom.getDiseases() != null) {
            List<DiseaseDTO> diseaseDTOs = symptom.getDiseases().stream()
                    .map(this::mapToDiseaseDTO)
                    .collect(Collectors.toList());
            symptomDTO.setDisease(diseaseDTOs);
        }

        return symptomDTO;
    }

    private DiseaseDTO mapToDiseaseDTO(Disease disease) {
        DiseaseDTO diseaseDTO = new DiseaseDTO();
        diseaseDTO.setDiseaseId(disease.getDiseaseId());
        diseaseDTO.setName(disease.getName());
        return diseaseDTO;
    }
}
