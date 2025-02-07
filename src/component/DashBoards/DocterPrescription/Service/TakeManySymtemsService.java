package com.LPHSmartX.hospital.DocterPrescription.Service;

import com.LPHSmartX.hospital.DocterPrescription.DTO.TakeManySymtemsDTO;
import com.LPHSmartX.hospital.DocterPrescription.Entity.TakeManySymtems;

import java.util.List;
import java.util.Optional;

public interface TakeManySymtemsService {

    TakeManySymtemsDTO saveTakeManySymtems(TakeManySymtemsDTO takeManySymtemsDTO);

    Optional<TakeManySymtemsDTO> getTakeManySymtemsById(int takeManySymtemsId);

    List<TakeManySymtemsDTO> getAllTakeManySymtems();

    void deleteTakeManySymtems(int takeManySymtemsId);
}
