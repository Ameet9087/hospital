package com.LPHSmartX.hospital.Maternity.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import com.LPHSmartX.hospital.Maternity.dto.FamilyPlanningDTO;
import com.LPHSmartX.hospital.Maternity.entity.FamilyPlanning;
import com.LPHSmartX.hospital.Maternity.repository.FamilyPlanningRepository;
import com.LPHSmartX.hospital.Maternity.service.FamilyPlanningService;
import com.LPHSmartX.hospital.Patient.entity.InPatient;
import com.LPHSmartX.hospital.Patient.repository.InPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class FamilyPlanningServiceImpl implements FamilyPlanningService {

    @Autowired
    private FamilyPlanningRepository familyPlanningRepository;

    @Autowired
    private InPatientRepository patientRepository;

    @Override
    public FamilyPlanningDTO createFamilyPlanning(FamilyPlanningDTO familyPlanningDTO) {
    	System.out.println(familyPlanningDTO);
        FamilyPlanning familyPlanning = convertToEntity(familyPlanningDTO);
        familyPlanning = familyPlanningRepository.save(familyPlanning);
        return convertToDTO(familyPlanning);
    }

    @Override
    public FamilyPlanningDTO getFamilyPlanningById(Long id) {
        return familyPlanningRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public List<FamilyPlanningDTO> getAllFamilyPlanning() {
        return familyPlanningRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteFamilyPlanning(Long id) {
        familyPlanningRepository.deleteById(id);
    }
    @Override
    public FamilyPlanningDTO updateFamilyPlanning(Long id, FamilyPlanningDTO familyPlanningDTO) {
        if (!familyPlanningRepository.existsById(id)) {
            return null; // Or throw an exception if preferred
        }
        
        FamilyPlanning existingFamilyPlanning = familyPlanningRepository.findById(id).orElseThrow(() -> new RuntimeException("Family planning not found"));

        // Update the fields
        existingFamilyPlanning.setCounselingDate(familyPlanningDTO.getCounselingDate());
        existingFamilyPlanning.setChosenMethod(familyPlanningDTO.getChosenMethod());
        existingFamilyPlanning.setPriorContraceptiveHistory(familyPlanningDTO.getPriorContraceptiveHistory());
        existingFamilyPlanning.setSideEffectsDiscussed(familyPlanningDTO.getSideEffectsDiscussed());
        existingFamilyPlanning.setPatientConsent(familyPlanningDTO.getPatientConsent());
        existingFamilyPlanning.setDoctorNotes(familyPlanningDTO.getDoctorNotes());
        existingFamilyPlanning.setNextFollowupDate(familyPlanningDTO.getNextFollowupDate());

        FamilyPlanning updatedFamilyPlanning = familyPlanningRepository.save(existingFamilyPlanning);
        return convertToDTO(updatedFamilyPlanning);
    }

    private FamilyPlanningDTO convertToDTO(FamilyPlanning familyPlanning) {
        FamilyPlanningDTO dto = new FamilyPlanningDTO();
        dto.setFpServiceId(familyPlanning.getFpServiceId());
        dto.setInPatientId(familyPlanning.getPatient().getInPatientId()); // Assuming Patient has an 'id' field
        dto.setCounselingDate(familyPlanning.getCounselingDate());
        dto.setChosenMethod(familyPlanning.getChosenMethod());
        dto.setPriorContraceptiveHistory(familyPlanning.getPriorContraceptiveHistory());
        dto.setSideEffectsDiscussed(familyPlanning.getSideEffectsDiscussed());
        dto.setPatientConsent(familyPlanning.getPatientConsent());
        dto.setDoctorNotes(familyPlanning.getDoctorNotes());
        dto.setNextFollowupDate(familyPlanning.getNextFollowupDate());
        return dto;
    }

    private FamilyPlanning convertToEntity(FamilyPlanningDTO familyPlanningDTO) {
        FamilyPlanning familyPlanning = new FamilyPlanning();
        
        // Set the fields of FamilyPlanning
        familyPlanning.setFpServiceId(familyPlanningDTO.getFpServiceId());
        familyPlanning.setCounselingDate(familyPlanningDTO.getCounselingDate());
        familyPlanning.setChosenMethod(familyPlanningDTO.getChosenMethod());
        familyPlanning.setPriorContraceptiveHistory(familyPlanningDTO.getPriorContraceptiveHistory());
        familyPlanning.setSideEffectsDiscussed(familyPlanningDTO.getSideEffectsDiscussed());
        familyPlanning.setPatientConsent(familyPlanningDTO.getPatientConsent());
        familyPlanning.setDoctorNotes(familyPlanningDTO.getDoctorNotes());
        familyPlanning.setNextFollowupDate(familyPlanningDTO.getNextFollowupDate());

        // Fetch the Patient entity by ID and set it
        InPatient patient = patientRepository.findById(familyPlanningDTO.getInPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        familyPlanning.setPatient(patient);

        return familyPlanning;
    }

	
}