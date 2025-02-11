package com.LPHSmartX.hospital.DocterPrescription.ServiceIMP;

import com.LPHSmartX.hospital.DocterPrescription.DTO.DiseaseDTO; 
import com.LPHSmartX.hospital.DocterPrescription.DTO.SymptomDTO;
import com.LPHSmartX.hospital.DocterPrescription.DTO.TakeManySymtemsDTO;
import com.LPHSmartX.hospital.DocterPrescription.Entity.TakeManySymtems;
import com.LPHSmartX.hospital.DocterPrescription.Entity.Disease;
import com.LPHSmartX.hospital.DocterPrescription.Entity.Symptom;
import com.LPHSmartX.hospital.DocterPrescription.Repository.TakeManySymtemsRepository;
import com.LPHSmartX.hospital.DocterPrescription.Repository.DiseaseRepository;
import com.LPHSmartX.hospital.DocterPrescription.Repository.SymptomRepository;
import com.LPHSmartX.hospital.DocterPrescription.Service.TakeManySymtemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
 
@Service
public class TakeManySymtemsServiceImpl implements TakeManySymtemsService {

    @Autowired
    private TakeManySymtemsRepository takeManySymtemsRepository;

    @Autowired
    private DiseaseRepository diseaseRepository;

    @Autowired
    private SymptomRepository symptomRepository;

    @Override
    public TakeManySymtemsDTO saveTakeManySymtems(TakeManySymtemsDTO takeManySymtemsDTO) {
        // Find Diseases by ID
        List<Disease> diseases = takeManySymtemsDTO.getDisease().stream()
                .map(diseaseDTO -> diseaseRepository.findById(diseaseDTO.getDiseaseId())
                        .orElseThrow(() -> new RuntimeException("Disease not found with ID " + diseaseDTO.getDiseaseId())))
                .collect(Collectors.toList());

        List<Symptom> symptoms = takeManySymtemsDTO.getSymptoms().stream()
                .map(symptomDTO -> symptomRepository.findById(symptomDTO.getSymptomId()) // Use symptomId from DTO
                        .orElseThrow(() -> new RuntimeException("Symptom not found with ID: " + symptomDTO.getSymptomId())))
                .collect(Collectors.toList());

        TakeManySymtems entity = new TakeManySymtems();
        entity.setTakeManySymtemsId(takeManySymtemsDTO.getTakeManySymtemsId());
        entity.setDiseases(diseases);  // Setting the diseases list
        entity.setSymptoms(symptoms);

        takeManySymtemsRepository.save(entity);

        return takeManySymtemsDTO;
    }

    @Override
    public Optional<TakeManySymtemsDTO> getTakeManySymtemsById(int takeManySymtemsId) {
        Optional<TakeManySymtems> entity = takeManySymtemsRepository.findById(takeManySymtemsId);
        return entity.map(this::convertToDTO);
    }

    @Override
    public List<TakeManySymtemsDTO> getAllTakeManySymtems() {
        List<TakeManySymtems> entities = takeManySymtemsRepository.findAll();
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteTakeManySymtems(int takeManySymtemsId) {
        takeManySymtemsRepository.deleteById(takeManySymtemsId);
    }

    private TakeManySymtemsDTO convertToDTO(TakeManySymtems entity) {
        TakeManySymtemsDTO dto = new TakeManySymtemsDTO();
        dto.setTakeManySymtemsId(entity.getTakeManySymtemsId());

        // Convert Diseases to DTOs
        List<DiseaseDTO> diseaseDTOs = entity.getDiseases().stream()
                .map(disease -> {
                    DiseaseDTO diseaseDTO = new DiseaseDTO();
                    diseaseDTO.setDiseaseId(disease.getDiseaseId());
                    diseaseDTO.setName(disease.getName());
                    return diseaseDTO;
                })
                .collect(Collectors.toList());
        dto.setDisease(diseaseDTOs);

        // Convert Symptoms to DTOs
        List<SymptomDTO> symptomDTOs = entity.getSymptoms().stream()
                .map(symptom -> {
                    SymptomDTO symptomDTO = new SymptomDTO();
                    symptomDTO.setSymptomId(symptom.getSymptomId());
                    symptomDTO.setSymptomsName(symptom.getSymptomsName());
//                    symptomDTO.setCategory(symptom.getCategory());
                    return symptomDTO;
                })
                .collect(Collectors.toList());
        dto.setSymptoms(symptomDTOs);

        return dto;
    }
}
