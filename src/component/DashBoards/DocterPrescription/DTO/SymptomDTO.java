package com.LPHSmartX.hospital.DocterPrescription.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SymptomDTO {
    private Long symptomId;
    private String symptomsName;
//    private String category; 

    private List<DiseaseDTO> disease= new ArrayList<>();
}
