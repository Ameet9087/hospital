package com.LPHSmartX.hospital.Maternity.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.LPHSmartX.hospital.Maternity.dto.LaborStaffManagementDTO;
import com.LPHSmartX.hospital.Maternity.entity.LaborStaffManagement;
import com.LPHSmartX.hospital.Maternity.repository.AntenatalCareRepository;
import com.LPHSmartX.hospital.Maternity.repository.LaborStaffMangementRepository;
import com.LPHSmartX.hospital.Maternity.repository.PostnatalCareRepository;
import com.LPHSmartX.hospital.Maternity.service.LaborStaffManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class LabourStaffManagementServiceImpl implements LaborStaffManagementService {

    @Autowired
    private LaborStaffMangementRepository labourStaffManagementRepository;

    @Autowired
    private AntenatalCareRepository antenatalCareRepository;

    @Autowired
    private PostnatalCareRepository postnatalCareRepository;

    @Override
    public LaborStaffManagementDTO createLaborStaffManagement(LaborStaffManagementDTO labourStaffManagementDTO) {
        LaborStaffManagement labourStaffManagement = convertToEntity(labourStaffManagementDTO);
        labourStaffManagement = labourStaffManagementRepository.save(labourStaffManagement);
        return convertToDTO(labourStaffManagement);
    }

    @Override
    public LaborStaffManagementDTO getLaborStaffManagementById(Long id) {
        return labourStaffManagementRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public List<LaborStaffManagementDTO> getAllLaborStaffManagement() {
        return labourStaffManagementRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteLaborStaffManagement(Long id) {
        labourStaffManagementRepository.deleteById(id);
    }
    @Override
    public LaborStaffManagementDTO updateLaborStaffManagement(Long id, LaborStaffManagementDTO laborStaffManagementDTO) {
        // Find the existing staff management entry
        Optional<LaborStaffManagement> existingStaffManagement = labourStaffManagementRepository.findById(id);
        if (existingStaffManagement.isPresent()) {
            LaborStaffManagement staffManagementToUpdate = existingStaffManagement.get();
            // Update the fields
            staffManagementToUpdate.setShiftStartTime(laborStaffManagementDTO.getShiftStartTime());
            staffManagementToUpdate.setShiftEndTime(laborStaffManagementDTO.getShiftEndTime());
            staffManagementToUpdate.setAssignedRole(laborStaffManagementDTO.getAssignedRole());
            staffManagementToUpdate.setResponsibilitiesDescription(laborStaffManagementDTO.getResponsibilitiesDescription());
            staffManagementToUpdate.setEmergencyResponseTeam(laborStaffManagementDTO.getEmergencyResponseTeam());

            // Save the updated staff management entry
            LaborStaffManagement updatedStaffManagement = labourStaffManagementRepository.save(staffManagementToUpdate);
            return convertToDTO(updatedStaffManagement);
        }
        return null; // Or throw an exception
    }

    // Convert Entity to DTO
    private LaborStaffManagementDTO convertToDTO(LaborStaffManagement labourStaffManagement) {
        LaborStaffManagementDTO dto = new LaborStaffManagementDTO();
        dto.setStaffId(labourStaffManagement.getStaffId());
        dto.setShiftStartTime(labourStaffManagement.getShiftStartTime());
        dto.setShiftEndTime(labourStaffManagement.getShiftEndTime());
        dto.setAssignedRole(labourStaffManagement.getAssignedRole());
        dto.setResponsibilitiesDescription(labourStaffManagement.getResponsibilitiesDescription());
        dto.setEmergencyResponseTeam(labourStaffManagement.getEmergencyResponseTeam());

        // Convert AntenatalCare and PostnatalCare lists to IDs for the DTO
//        dto.setAntenatalCareIds(
//                labourStaffManagement.getAntenatalCares().stream()
//                        .map(AntenatalCare::getAncId)
//                        .collect(Collectors.toList())
//        );
//        dto.setPostnatalCareIds(
//                labourStaffManagement.getPostnatalCares().stream()
//                        .map(PostnatalCare::getPncId)
//                        .collect(Collectors.toList())
//        );

        return dto;
    }

    // Convert DTO to Entity
    private LaborStaffManagement convertToEntity(LaborStaffManagementDTO labourStaffManagementDTO) {
        LaborStaffManagement labourStaffManagement = new LaborStaffManagement();
        labourStaffManagement.setStaffId(labourStaffManagementDTO.getStaffId());
        labourStaffManagement.setShiftStartTime(labourStaffManagementDTO.getShiftStartTime());
        labourStaffManagement.setShiftEndTime(labourStaffManagementDTO.getShiftEndTime());
        labourStaffManagement.setAssignedRole(labourStaffManagementDTO.getAssignedRole());
        labourStaffManagement.setResponsibilitiesDescription(labourStaffManagementDTO.getResponsibilitiesDescription());
        labourStaffManagement.setEmergencyResponseTeam(labourStaffManagementDTO.getEmergencyResponseTeam());

        // Fetch and set AntenatalCare entities from their IDs
//        List<AntenatalCare> antenatalCares = labourStaffManagementDTO.getAntenatalCareIds().stream()
//                .map(id -> antenatalCareRepository.findById(id)
//                        .orElseThrow(() -> new RuntimeException("AntenatalCare not found with id: " + id)))
//                .collect(Collectors.toList());
//        labourStaffManagement.setAntenatalCares(antenatalCares);
//
//        // Fetch and set PostnatalCare entities from their IDs
//        List<PostnatalCare> postnatalCares = labourStaffManagementDTO.getPostnatalCareIds().stream()
//                .map(id -> postnatalCareRepository.findById(id)
//                        .orElseThrow(() -> new RuntimeException("PostnatalCare not found with id: " + id)))
//                .collect(Collectors.toList());
//        labourStaffManagement.setPostnatalCares(postnatalCares);

        return labourStaffManagement;
    }
}