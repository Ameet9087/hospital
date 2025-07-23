package com.LPHSmartX.hospital.Maternity.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.LPHSmartX.hospital.Maternity.dto.AntenatalCareDTO;
import com.LPHSmartX.hospital.Maternity.entity.AntenatalCare;
import com.LPHSmartX.hospital.Maternity.repository.AntenatalCareRepository;
import com.LPHSmartX.hospital.Maternity.service.AntenatalCareService;
import com.LPHSmartX.hospital.Patient.entity.InPatient;
import com.LPHSmartX.hospital.Patient.repository.InPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class AntenatalCareServiceImpl implements AntenatalCareService {

    @Autowired
    private AntenatalCareRepository antenatalCareRepository;
    
    @Autowired
    private InPatientRepository patientRepository;

    @Override
    public AntenatalCareDTO createAntenatalCare(AntenatalCareDTO antenatalCareDTO) {
    	System.out.println(antenatalCareDTO);
        AntenatalCare antenatalCare = convertToEntity(antenatalCareDTO);
        antenatalCare = antenatalCareRepository.save(antenatalCare);
        return convertToDTO(antenatalCare);
    }

    @Override
    public AntenatalCareDTO getAntenatalCareById(Long id) {
        return antenatalCareRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }
    public AntenatalCareDTO updateAntenatalCare(Long id, AntenatalCareDTO antenatalCareDTO) {
        Optional<AntenatalCare> optionalAntenatalCare = antenatalCareRepository.findById(id);
        if (optionalAntenatalCare.isPresent()) {
            AntenatalCare antenatalCare = optionalAntenatalCare.get();
            // Update fields with values from the DTO
            antenatalCare.setBabyweight(antenatalCareDTO.getBabyweight());
            antenatalCare.setVisitDate(antenatalCareDTO.getVisitDate());
            antenatalCare.setGestationalAge(antenatalCareDTO.getGestationalAge());
            antenatalCare.setWeight(antenatalCareDTO.getWeight());
            antenatalCare.setBloodPressure(antenatalCareDTO.getBloodPressure());
            antenatalCare.setUrineTestResult(antenatalCareDTO.getUrineTestResult());
            antenatalCare.setUltrasoundReport(antenatalCareDTO.getUltrasoundReport());
            antenatalCare.setPregnancyRiskLevel(antenatalCareDTO.getPregnancyRiskLevel());
            antenatalCare.setMedicationsPrescribed(antenatalCareDTO.getMedicationsPrescribed());
            antenatalCare.setNextVisitDate(antenatalCareDTO.getNextVisitDate());
            antenatalCare.setDoctorname(antenatalCareDTO.getDoctorName());
            antenatalCare.setDoctorNotes(antenatalCareDTO.getDoctorNotes());
            antenatalCare = antenatalCareRepository.save(antenatalCare);
            return convertToDTO(antenatalCare);
        }
        return null; // or throw an exception, depending on your error handling strategy
    }
    @Override
    public List<AntenatalCareDTO> getAllAntenatalCares() {
        return antenatalCareRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteAntenatalCare(Long id) {
        antenatalCareRepository.deleteById(id);
    }

    private AntenatalCareDTO convertToDTO(AntenatalCare antenatalCare) {
        AntenatalCareDTO dto = new AntenatalCareDTO();
        dto.setInPatientId(antenatalCare.getPatient().getInPatientId());
        dto.setAncId(antenatalCare.getAncId());
        dto.setBabyweight(antenatalCare.getBabyweight());
        dto.setVisitDate(antenatalCare.getVisitDate());
        dto.setGestationalAge(antenatalCare.getGestationalAge());
        dto.setWeight(antenatalCare.getWeight());
        dto.setBloodPressure(antenatalCare.getBloodPressure());
        dto.setUrineTestResult(antenatalCare.getUrineTestResult());
        dto.setUltrasoundReport(antenatalCare.getUltrasoundReport());
        dto.setPregnancyRiskLevel(antenatalCare.getPregnancyRiskLevel());
        dto.setMedicationsPrescribed(antenatalCare.getMedicationsPrescribed());
        dto.setNextVisitDate(antenatalCare.getNextVisitDate());
        dto.setDoctorName(antenatalCare.getDoctorname());
        dto.setDoctorNotes(antenatalCare.getDoctorNotes());
        return dto;
    }

    private AntenatalCare convertToEntity(AntenatalCareDTO antenatalCareDTO) {
        AntenatalCare antenatalCare = new AntenatalCare();
        antenatalCare.setBabyweight(antenatalCareDTO.getBabyweight());
        antenatalCare.setAncId(antenatalCareDTO.getAncId());
        antenatalCare.setVisitDate(antenatalCareDTO.getVisitDate());
        antenatalCare.setGestationalAge(antenatalCareDTO.getGestationalAge());
        antenatalCare.setWeight(antenatalCareDTO.getWeight());
        antenatalCare.setBloodPressure(antenatalCareDTO.getBloodPressure());
        antenatalCare.setUrineTestResult(antenatalCareDTO.getUrineTestResult());
        antenatalCare.setUltrasoundReport(antenatalCareDTO.getUltrasoundReport());
        antenatalCare.setPregnancyRiskLevel(antenatalCareDTO.getPregnancyRiskLevel());
        antenatalCare.setMedicationsPrescribed(antenatalCareDTO.getMedicationsPrescribed());
        antenatalCare.setNextVisitDate(antenatalCareDTO.getNextVisitDate());
        antenatalCare.setDoctorname(antenatalCareDTO.getDoctorName());
        antenatalCare.setDoctorNotes(antenatalCareDTO.getDoctorNotes());
        InPatient patient=patientRepository.findById(antenatalCareDTO.getInPatientId()).orElseThrow(()-> new RuntimeException("patient not found"));
        antenatalCare.setPatient(patient);
        return antenatalCare;
    }

	

	
}