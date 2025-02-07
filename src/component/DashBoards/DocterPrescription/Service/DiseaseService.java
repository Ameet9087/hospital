package com.LPHSmartX.hospital.DocterPrescription.Service;

import com.LPHSmartX.hospital.DocterPrescription.DTO.DiseaseDTO;
import com.LPHSmartX.hospital.DocterPrescription.DTO.MedicationPrescriptionDTO;

import java.util.List;

public interface DiseaseService {
    DiseaseDTO createDisease(DiseaseDTO diseaseDTO);

    DiseaseDTO getDiseaseById(Long diseaseId);

    List<DiseaseDTO> getAllDiseases();

    DiseaseDTO updateDisease(Long diseaseId, DiseaseDTO diseaseDTO);

    void deleteDisease(Long diseaseId);

 }