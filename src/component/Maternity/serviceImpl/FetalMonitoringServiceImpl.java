package com.LPHSmartX.hospital.Maternity.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.LPHSmartX.hospital.Maternity.dto.FetalMonitoringDTO;
import com.LPHSmartX.hospital.Maternity.entity.FetalMonitoring;
import com.LPHSmartX.hospital.Maternity.repository.FetalMonitoringRepository;
import com.LPHSmartX.hospital.Maternity.service.FetalMonitoringService;
import com.LPHSmartX.hospital.Patient.entity.InPatient;
import com.LPHSmartX.hospital.Patient.repository.InPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class FetalMonitoringServiceImpl implements FetalMonitoringService {

    @Autowired
    private FetalMonitoringRepository fetalMonitoringRepository;

    @Autowired
    private InPatientRepository patientRepository;

    @Override
    public FetalMonitoringDTO createFetalMonitoring(FetalMonitoringDTO fetalMonitoringDTO) {
        FetalMonitoring fetalMonitoring = convertToEntity(fetalMonitoringDTO);
        fetalMonitoring = fetalMonitoringRepository.save(fetalMonitoring);
        return convertToDTO(fetalMonitoring);
    }

    @Override
    public FetalMonitoringDTO getFetalMonitoringById(Long id) {
        return fetalMonitoringRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public List<FetalMonitoringDTO> getAllFetalMonitoring() {
        return fetalMonitoringRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteFetalMonitoring(Long id) {
        fetalMonitoringRepository.deleteById(id);
    }
    @Override
    public FetalMonitoringDTO updateFetalMonitoring(Long id, FetalMonitoringDTO fetalMonitoringDTO) {
    	
    	System.out.println(fetalMonitoringDTO);
        Optional<FetalMonitoring> existingFetalMonitoring = fetalMonitoringRepository.findById(id);
        if (existingFetalMonitoring.isPresent()) {
            FetalMonitoring fetalMonitoringToUpdate = existingFetalMonitoring.get();
            // Update fields with new values
          
           // fetalMonitoringToUpdate.setFetalMonitoringId(fetalMonitoringDTO.getFetalMonitoringId());
//            fetalMonitoringToUpdate.setPatientId(fetalMonitoringDTO.getPatient().getId());
            fetalMonitoringToUpdate.setFetalHeartRate(fetalMonitoringDTO.getFetalHeartRate());
            fetalMonitoringToUpdate.setMonitoringStartTime(fetalMonitoringDTO.getMonitoringStartTime());
            fetalMonitoringToUpdate.setMonitoringEndTime(fetalMonitoringDTO.getMonitoringEndTime());
            fetalMonitoringToUpdate.setMonitoringNotes(fetalMonitoringDTO.getMonitoringNotes());
            // ... Update other fields as necessary

            // Save the updated fetal monitoring entry
            FetalMonitoring updatedFetalMonitoring = fetalMonitoringRepository.save(fetalMonitoringToUpdate);
            return convertToDTO(updatedFetalMonitoring);
        }
        return null; // Or throw an exception
    }

    private FetalMonitoringDTO convertToDTO(FetalMonitoring fetalMonitoring) {
        FetalMonitoringDTO dto = new FetalMonitoringDTO();
        dto.setFetalMonitoringId(fetalMonitoring.getFetalMonitoringId());
        dto.setInPatientId(fetalMonitoring.getPatient().getInPatientId());
        dto.setFetalHeartRate(fetalMonitoring.getFetalHeartRate());
        dto.setMonitoringStartTime(fetalMonitoring.getMonitoringStartTime());
        dto.setMonitoringEndTime(fetalMonitoring.getMonitoringEndTime());
        dto.setMonitoringNotes(fetalMonitoring.getMonitoringNotes());
        return dto;
    }

    private FetalMonitoring convertToEntity(FetalMonitoringDTO fetalMonitoringDTO) {
        FetalMonitoring fetalMonitoring = new FetalMonitoring();
        fetalMonitoring.setFetalMonitoringId(fetalMonitoringDTO.getFetalMonitoringId());
        fetalMonitoring.setFetalHeartRate(fetalMonitoringDTO.getFetalHeartRate());
        fetalMonitoring.setMonitoringStartTime(fetalMonitoringDTO.getMonitoringStartTime());
        fetalMonitoring.setMonitoringEndTime(fetalMonitoringDTO.getMonitoringEndTime());
        fetalMonitoring.setMonitoringNotes(fetalMonitoringDTO.getMonitoringNotes());

        // Fetch the Patient entity by ID and set it
        InPatient patient = patientRepository.findById(fetalMonitoringDTO.getInPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        fetalMonitoring.setPatient(patient);

        return fetalMonitoring;
    }
}
