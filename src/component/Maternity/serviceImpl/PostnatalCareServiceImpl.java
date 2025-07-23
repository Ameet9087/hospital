package com.LPHSmartX.hospital.Maternity.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.LPHSmartX.hospital.Maternity.dto.PostnatalCareDTO;
import com.LPHSmartX.hospital.Maternity.entity.LaborStaffManagement;
import com.LPHSmartX.hospital.Maternity.entity.PostnatalCare;
import com.LPHSmartX.hospital.Maternity.repository.LaborStaffMangementRepository;
import com.LPHSmartX.hospital.Maternity.repository.PostnatalCareRepository;
import com.LPHSmartX.hospital.Maternity.service.PostnatalCareService;
import com.LPHSmartX.hospital.Patient.entity.InPatient;
import com.LPHSmartX.hospital.Patient.repository.InPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostnatalCareServiceImpl implements PostnatalCareService {

    @Autowired
    private PostnatalCareRepository postnatalCareRepository;

    @Autowired
    private InPatientRepository patientRepository; // To fetch the Patient entity

    @Autowired
    private LaborStaffMangementRepository staffManagementRepository; // To fetch the LaborStaffManagement entity

    @Override
    public PostnatalCareDTO createPostnatalCare(PostnatalCareDTO postnatalCareDTO) {
    	System.out.println(postnatalCareDTO);
        PostnatalCare postnatalCare = convertToEntity(postnatalCareDTO);
        postnatalCare = postnatalCareRepository.save(postnatalCare);
        return convertToDTO(postnatalCare);
    }

    @Override
    public PostnatalCareDTO getPostnatalCareById(Long id) {
        return postnatalCareRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public List<PostnatalCareDTO> getAllPostnatalCares() {
        return postnatalCareRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deletePostnatalCare(Long id) {
        postnatalCareRepository.deleteById(id);
    }
    
    @Override
    public PostnatalCareDTO updatePostnatalCare(Long id, PostnatalCareDTO postnatalCareDTO) {
        Optional<PostnatalCare> existingPostnatalCareOpt = postnatalCareRepository.findById(id);

        if (existingPostnatalCareOpt.isPresent()) {
            PostnatalCare existingPostnatalCare = existingPostnatalCareOpt.get();
            
            // Update the existing entity with new values from the DTO
            existingPostnatalCare.setVisitDate(postnatalCareDTO.getVisitDate());
            existingPostnatalCare.setMotherCondition(postnatalCareDTO.getMotherCondition());
            existingPostnatalCare.setBabyCondition(postnatalCareDTO.getBabyCondition());
            existingPostnatalCare.setDoctorNotes(postnatalCareDTO.getDoctorNotes());
            existingPostnatalCare.setNextVisitDate(postnatalCareDTO.getNextVisitDate());

            // Save the updated entity back to the database
            PostnatalCare updatedPostnatalCare = postnatalCareRepository.save(existingPostnatalCare);

            // Convert the updated entity back to DTO
            return convertToDTO(updatedPostnatalCare);
        }

        return null; // Return null if the postnatal care record was not found
    }

    private PostnatalCareDTO convertToDTO(PostnatalCare postnatalCare) {
        PostnatalCareDTO dto = new PostnatalCareDTO();
        dto.setPncId(postnatalCare.getPncId());
        dto.setInPatientId(postnatalCare.getPatient().getInPatientId());
        dto.setVisitDate(postnatalCare.getVisitDate());
        dto.setMotherCondition(postnatalCare.getMotherCondition());
        dto.setBabyCondition(postnatalCare.getBabyCondition());
        dto.setDoctorNotes(postnatalCare.getDoctorNotes());
        dto.setNextVisitDate(postnatalCare.getNextVisitDate());

        // If you want to include staff management details
        if (postnatalCare.getStaffManagement() != null) {
            dto.setStaffManagementId(postnatalCare.getStaffManagement().getStaffId());
        }

        return dto;
    }

    private PostnatalCare convertToEntity(PostnatalCareDTO postnatalCareDTO) {
        PostnatalCare postnatalCare = new PostnatalCare();
        postnatalCare.setPncId(postnatalCareDTO.getPncId());

        // Fetch the Patient entity by ID and set it
        InPatient patient = patientRepository.findById(postnatalCareDTO.getInPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        postnatalCare.setPatient(patient);

        postnatalCare.setVisitDate(postnatalCareDTO.getVisitDate());
        postnatalCare.setMotherCondition(postnatalCareDTO.getMotherCondition());
        postnatalCare.setBabyCondition(postnatalCareDTO.getBabyCondition());
        postnatalCare.setDoctorNotes(postnatalCareDTO.getDoctorNotes());
        postnatalCare.setNextVisitDate(postnatalCareDTO.getNextVisitDate());

        // Set LaborStaffManagement if included in the DTO
        if (postnatalCareDTO.getStaffManagementId() != null) {
            LaborStaffManagement staffManagement = staffManagementRepository.findById(postnatalCareDTO.getStaffManagementId())
                    .orElseThrow(() -> new RuntimeException("Staff Management not found"));
            postnatalCare.setStaffManagement(staffManagement);
        }

        return postnatalCare;
    }
}
