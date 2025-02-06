package com.LPHSmartX.hospital.DocterPrescription.Service;

import com.LPHSmartX.hospital.DocterPrescription.DTO.DiseaseDTO;
import com.LPHSmartX.hospital.DocterPrescription.DTO.SymptomDTO;

import java.util.List;

public interface SymptomService {

    SymptomDTO createSymptom(SymptomDTO symptomDTO);

    SymptomDTO getSymptomById(Long symptomId);

    List<SymptomDTO> getAllSymptoms();

    SymptomDTO updateSymptom(Long symptomId, SymptomDTO symptomDTO);

    void deleteSymptom(Long symptomId);
}
