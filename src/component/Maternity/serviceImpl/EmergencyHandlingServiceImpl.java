package com.LPHSmartX.hospital.Maternity.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import com.LPHSmartX.hospital.Maternity.dto.EmergencyHandlingDTO;
import com.LPHSmartX.hospital.Maternity.entity.EmergencyHandling;
import com.LPHSmartX.hospital.Maternity.repository.EmergencyHandlingRepository;
import com.LPHSmartX.hospital.Maternity.service.EmergencyHandlingService;
import com.LPHSmartX.hospital.Patient.entity.InPatient;
import com.LPHSmartX.hospital.Patient.repository.InPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class EmergencyHandlingServiceImpl implements EmergencyHandlingService {

    @Autowired
    private EmergencyHandlingRepository emergencyHandlingRepository;
    
    @Autowired
    private InPatientRepository patientRepository;

    @Override
    public EmergencyHandlingDTO createEmergencyHandling(EmergencyHandlingDTO emergencyHandlingDTO) {
        EmergencyHandling emergencyHandling = convertToEntity(emergencyHandlingDTO);
        emergencyHandling = emergencyHandlingRepository.save(emergencyHandling);
        return convertToDTO(emergencyHandling);
    }
    @Override
    public EmergencyHandlingDTO updateEmergencyHandling(Long id, EmergencyHandlingDTO emergencyHandlingDTO) {
        EmergencyHandling existingEmergencyHandling = emergencyHandlingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("EmergencyHandling not found for id: " + id));

        // Update the existing entity fields with the new data
        existingEmergencyHandling.setEmergencyType(emergencyHandlingDTO.getEmergencyType());
      //  existingEmergencyHandling.setPatient(emergencyHandlingDTO.)); // Assuming you have a Patient constructor or method to set patient
        existingEmergencyHandling.setBloodBankRequestId(emergencyHandlingDTO.getBloodBankRequestId());
        existingEmergencyHandling.setCSectionRequired(emergencyHandlingDTO.getCSectionRequired());
        existingEmergencyHandling.setEmergencyStartTime(emergencyHandlingDTO.getEmergencyStartTime());
        existingEmergencyHandling.setEmergencyNotes(emergencyHandlingDTO.getEmergencyNotes());
        existingEmergencyHandling.setEmergencyStartTime(emergencyHandlingDTO.getEmergencyStartTime());
        existingEmergencyHandling.setEmergencyEndTime(emergencyHandlingDTO.getEmergencyEndTime());

        // Save the updated entity
        EmergencyHandling updatedEmergencyHandling = emergencyHandlingRepository.save(existingEmergencyHandling);
        return convertToDTO(updatedEmergencyHandling);
    }
    @Override
    public EmergencyHandlingDTO getEmergencyHandlingById(Long id) {
        return emergencyHandlingRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public List<EmergencyHandlingDTO> getAllEmergencyHandlings() {
        return emergencyHandlingRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteEmergencyHandling(Long id) {
        emergencyHandlingRepository.deleteById(id);
    }

    private EmergencyHandlingDTO convertToDTO(EmergencyHandling emergencyHandling) {
        EmergencyHandlingDTO dto = new EmergencyHandlingDTO();
        dto.setEmergencyId(emergencyHandling.getEmergencyId());
        dto.setInPatientId(emergencyHandling.getPatient().getInPatientId()); // Assuming Patient has an 'id' field
        dto.setEmergencyType(emergencyHandling.getEmergencyType());
        dto.setBloodBankRequestId(emergencyHandling.getBloodBankRequestId());
        dto.setCSectionRequired(emergencyHandling.getCSectionRequired());
        dto.setEmergencyStartTime(emergencyHandling.getEmergencyStartTime());
        dto.setEmergencyNotes(emergencyHandling.getEmergencyNotes());
        dto.setEmergencyEndTime(emergencyHandling.getEmergencyEndTime());
        return dto;
    }

    private EmergencyHandling convertToEntity(EmergencyHandlingDTO emergencyHandlingDTO) {
        EmergencyHandling emergencyHandling = new EmergencyHandling();

        // Set the EmergencyHandling fields
        emergencyHandling.setEmergencyId(emergencyHandlingDTO.getEmergencyId());
        emergencyHandling.setEmergencyType(emergencyHandlingDTO.getEmergencyType());
        emergencyHandling.setBloodBankRequestId(emergencyHandlingDTO.getBloodBankRequestId());
        emergencyHandling.setCSectionRequired(emergencyHandlingDTO.getCSectionRequired());
        emergencyHandling.setEmergencyStartTime(emergencyHandlingDTO.getEmergencyStartTime());
        emergencyHandling.setEmergencyNotes(emergencyHandlingDTO.getEmergencyNotes());
        emergencyHandling.setEmergencyEndTime(emergencyHandlingDTO.getEmergencyEndTime());

        // Fetch the Patient entity by ID and set it
        InPatient patient = patientRepository.findById(emergencyHandlingDTO.getInPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        emergencyHandling.setPatient(patient);

        return emergencyHandling;
    }


}