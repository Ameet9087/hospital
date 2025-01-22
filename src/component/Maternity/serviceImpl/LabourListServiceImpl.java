package com.LPHSmartX.hospital.Maternity.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.LPHSmartX.hospital.Maternity.dto.LabourListDTO;
import com.LPHSmartX.hospital.Maternity.entity.LaborStaffManagement;
import com.LPHSmartX.hospital.Maternity.entity.LabourList;
import com.LPHSmartX.hospital.Maternity.repository.LaborStaffMangementRepository;
import com.LPHSmartX.hospital.Maternity.repository.LabourListRepository;
import com.LPHSmartX.hospital.Maternity.service.LabourListService;
import com.LPHSmartX.hospital.Patient.entity.InPatient;
import com.LPHSmartX.hospital.Patient.repository.InPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LabourListServiceImpl implements LabourListService {

    @Autowired
    private LabourListRepository labourListRepository;
    @Autowired
    private InPatientRepository patientRepository;
    
    @Autowired
    private LaborStaffMangementRepository laborStaffMangementRepository;

    @Override
    public LabourListDTO createLabourList(LabourListDTO labourListDTO) {
        LabourList labourList = convertToEntity(labourListDTO);
        labourList = labourListRepository.save(labourList);
        return convertToDTO(labourList);
    }

    @Override
    public LabourListDTO getLabourListById(Long id) {
        return labourListRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public List<LabourListDTO> getAllLabourLists() {
        return labourListRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    @Override
    public LabourListDTO updateLabourList(Long id, LabourListDTO labourListDTO) {
        Optional<LabourList> labourListOpt = labourListRepository.findById(id);
        if (labourListOpt.isPresent()) {
            LabourList existingLabourList = labourListOpt.get();
            // Update fields from DTO to the existing entity
            existingLabourList.setAdmissionDate(labourListDTO.getAdmissionDate());
            existingLabourList.setRoomNumber(labourListDTO.getRoomNumber());
            existingLabourList.setDeliveryType(labourListDTO.getDeliveryType());
            existingLabourList.setInstrumentUsed(labourListDTO.getInstrumentUsed());
            existingLabourList.setDoctorNotes(labourListDTO.getDoctorNotes());
            existingLabourList.setMotherConditionPostDelivery(labourListDTO.getMotherConditionPostDelivery());
            existingLabourList.setBabyConditionPostDelivery(labourListDTO.getBabyConditionPostDelivery());
           

            LabourList updatedLabourList = labourListRepository.save(existingLabourList);
            return convertToDTO(updatedLabourList);
        }
        return null; // or throw an exception if not found
    }

    @Override
    public void deleteLabourList(Long id) {
        labourListRepository.deleteById(id);
    }

    private LabourListDTO convertToDTO(LabourList labourList) {
        LabourListDTO dto = new LabourListDTO();
        dto.setLaborId(labourList.getLaborId());
        dto.setInPatientId(labourList.getPatient().getInPatientId());
        dto.setAdmissionDate(labourList.getAdmissionDate());
        dto.setRoomNumber(labourList.getRoomNumber());
        dto.setDeliveryType(labourList.getDeliveryType());
        dto.setInstrumentUsed(labourList.getInstrumentUsed());
        dto.setDoctorNotes(labourList.getDoctorNotes());
        dto.setMotherConditionPostDelivery(labourList.getMotherConditionPostDelivery());
        dto.setBabyConditionPostDelivery(labourList.getBabyConditionPostDelivery());
       // dto.setStaffManagementId(labourList.getStaffManagement().getStaffId());
        if (labourList.getStaffManagement() != null) {
            dto.setStaffManagementId(labourList.getStaffManagement().getStaffId());
        } else {
            dto.setStaffManagementId(null); // or handle it in a way that suits your needs
        }
        return dto;
    }

    private LabourList convertToEntity(LabourListDTO labourListDTO) {
        LabourList labourList = new LabourList();
        labourList.setLaborId(labourListDTO.getLaborId());
         // assuming you have Patient entity handling elsewhere
        labourList.setAdmissionDate(labourListDTO.getAdmissionDate());
        labourList.setRoomNumber(labourListDTO.getRoomNumber());
        labourList.setDeliveryType(labourListDTO.getDeliveryType());
        labourList.setInstrumentUsed(labourListDTO.getInstrumentUsed());
        labourList.setDoctorNotes(labourListDTO.getDoctorNotes());
        labourList.setMotherConditionPostDelivery(labourListDTO.getMotherConditionPostDelivery());
        labourList.setBabyConditionPostDelivery(labourListDTO.getBabyConditionPostDelivery());
        InPatient patient = patientRepository.findById(labourListDTO.getInPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        labourList.setPatient(patient);
        
        LaborStaffManagement staff=laborStaffMangementRepository.findById(labourListDTO.getStaffManagementId()).orElseThrow(()->new RuntimeException("satff id not found"));
        labourList.setStaffManagement(staff);
//        
        return labourList;
    }
}