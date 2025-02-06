package com.LPHSmartX.hospital.DocterPrescription.DTO;

import com.LPHSmartX.hospital.DocterPrescription.Entity.Symptom;
import com.LPHSmartX.hospital.DocterPrescription.Entity.Disease;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TakeManySymtemsDTO {

        private int takeManySymtemsId;

        private List<DiseaseDTO> disease;
        private List<SymptomDTO> symptoms;

}
