package com.LPHSmartX.hospital.Maternity.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.LPHSmartX.hospital.Maternity.dto.BreastfeedingSupportDTO;
import com.LPHSmartX.hospital.Maternity.entity.BreastfeedingSupport;
import com.LPHSmartX.hospital.Maternity.repository.BreastfeedingSupportRepository;
import com.LPHSmartX.hospital.Maternity.service.BreastfeedingSupportService;
import com.LPHSmartX.hospital.Patient.entity.InPatient;
import com.LPHSmartX.hospital.Patient.repository.InPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class BreastfeedingSupportServiceImpl implements BreastfeedingSupportService {

    @Autowired
    private BreastfeedingSupportRepository breastfeedingSupportRepository;
    
    @Autowired
    private InPatientRepository patientRepository;

    @Override
    public BreastfeedingSupportDTO createBreastfeedingSupport(BreastfeedingSupportDTO breastfeedingSupportDTO) {
    	System.out.println(breastfeedingSupportDTO);
        BreastfeedingSupport breastfeedingSupport = convertToEntity(breastfeedingSupportDTO);
        breastfeedingSupport = breastfeedingSupportRepository.save(breastfeedingSupport);
        return convertToDTO(breastfeedingSupport);
    }

    @Override
    public BreastfeedingSupportDTO getBreastfeedingSupportById(Long id) {
        return breastfeedingSupportRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    public List<BreastfeedingSupportDTO> getAllBreastfeedingSupports() {
        return breastfeedingSupportRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteBreastfeedingSupport(Long id) {
        breastfeedingSupportRepository.deleteById(id);
    }

    private BreastfeedingSupportDTO convertToDTO(BreastfeedingSupport breastfeedingSupport) {
        BreastfeedingSupportDTO dto = new BreastfeedingSupportDTO();
        dto.setInPatientId(breastfeedingSupport.getPatient().getInPatientId());
        dto.setBfSupportId(breastfeedingSupport.getBfSupportId());
        dto.setSessionDate(breastfeedingSupport.getSessionDate());
        dto.setLatchSuccess(breastfeedingSupport.getLatchSuccess());
        dto.setLactationConsultant(breastfeedingSupport.getLactationConsultant());
        dto.setConsultantNotes(breastfeedingSupport.getConsultantNotes());
        return dto;
    }

    private BreastfeedingSupport convertToEntity(BreastfeedingSupportDTO breastfeedingSupportDTO) {
        BreastfeedingSupport breastfeedingSupport = new BreastfeedingSupport();
        breastfeedingSupport.setBfSupportId(breastfeedingSupportDTO.getBfSupportId());
        breastfeedingSupport.setSessionDate(breastfeedingSupportDTO.getSessionDate());
        breastfeedingSupport.setLatchSuccess(breastfeedingSupportDTO.getLatchSuccess());
        breastfeedingSupport.setLactationConsultant(breastfeedingSupportDTO.getLactationConsultant());
        breastfeedingSupport.setConsultantNotes(breastfeedingSupportDTO.getConsultantNotes());
        InPatient patient=patientRepository.findById(breastfeedingSupportDTO.getInPatientId()).orElseThrow(()-> new RuntimeException("patient not found"));
        breastfeedingSupport.setPatient(patient);
        return breastfeedingSupport;
    }
    @Override
    public BreastfeedingSupportDTO updateBreastfeedingSupport(Long id, BreastfeedingSupportDTO breastfeedingSupportDTO) {
        Optional<BreastfeedingSupport> supportOpt = breastfeedingSupportRepository.findById(id);
        if (supportOpt.isPresent()) {
            BreastfeedingSupport existingSupport = supportOpt.get();
            existingSupport.setSessionDate(breastfeedingSupportDTO.getSessionDate());
            existingSupport.setLatchSuccess(breastfeedingSupportDTO.getLatchSuccess());
            existingSupport.setLactationConsultant(breastfeedingSupportDTO.getLactationConsultant());
            existingSupport.setConsultantNotes(breastfeedingSupportDTO.getConsultantNotes());

            BreastfeedingSupport updatedSupport = breastfeedingSupportRepository.save(existingSupport);
            return convertToDTO(updatedSupport);
        } else {
            return null;
        }
    }

	
}
