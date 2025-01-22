package com.LPHSmartX.hospital.Maternity.service;

import java.util.List;

import com.LPHSmartX.hospital.Maternity.dto.EmergencyHandlingDTO;

public interface EmergencyHandlingService {
	EmergencyHandlingDTO createEmergencyHandling(EmergencyHandlingDTO emergencyHandlingDTO);
    EmergencyHandlingDTO getEmergencyHandlingById(Long id);
    List<EmergencyHandlingDTO> getAllEmergencyHandlings();
    void deleteEmergencyHandling(Long id);
    EmergencyHandlingDTO updateEmergencyHandling(Long id, EmergencyHandlingDTO emergencyHandlingDTO);
}
