package com.bloodbank.bloodBank.service.serviceImplementation;

import java.util.List;
import java.util.stream.Collectors;

import com.bloodbank.bloodBank.exception.ResourceNotFoundExceptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.bloodbank.bloodBank.dto.BloodRequestDTO;
import com.bloodbank.bloodBank.dto.PatientDTO;
import com.bloodbank.bloodBank.exception.ResourceNotFoundException;
import com.bloodbank.bloodBank.entity.Patient;
import com.bloodbank.bloodBank.repository.PatientRepository;
import com.bloodbank.bloodBank.service.PatientService;


@Service
public class PatientServiceImpl implements PatientService {

	@Autowired
	PatientRepository patientRepository;

	
	public List<PatientDTO> getAllPatient() {
		return patientRepository.findAll().stream().map(this::convertEntityToDTO).collect(Collectors.toList());
	}

	private PatientDTO convertEntityToDTO(Patient patient) {
		PatientDTO patientDTO = new PatientDTO();

		patientDTO.setPatientId(patient.getPatientId());
		patientDTO.setPatientName(patient.getPatientName());
	

		List<BloodRequestDTO> bloodRequestDTOs = patient.getBloodRequest().stream().map(bloodRequest -> {
			BloodRequestDTO bloodRequestDTO = new BloodRequestDTO();
			
			bloodRequestDTO.setRequestId(bloodRequest.getRequestId()); // Set requestId here
		//	bloodRequestDTO.setPatientName(bloodRequest.getPatientName());
			bloodRequestDTO.setBloodGroup(bloodRequest.getBloodGroup());
			bloodRequestDTO.setRequiredUnits(bloodRequest.getRequiredUnits());
			bloodRequestDTO.setRequestDate(bloodRequest.getRequestDate());
			bloodRequestDTO.setRequiredDate(bloodRequest.getRequiredDate());
			bloodRequestDTO.setStatus(bloodRequest.getStatus());
			bloodRequestDTO.setContactInformation(bloodRequest.getContactInformation());

			return bloodRequestDTO;
		}).collect(Collectors.toList());

		patientDTO.setBloodRequest(bloodRequestDTOs);

		return patientDTO;
	}

	public PatientDTO createPatient(PatientDTO patientDTO) {

		Patient patient = new Patient();
		
		patient.setPatientId(patientDTO.getPatientId());
		patient.setPatientName(patientDTO.getPatientName());

		Patient savedPatient= patientRepository.save(patient);

		PatientDTO savedPatientDTO = convertEntityToDTO(savedPatient);

		return savedPatientDTO;
	}

	public PatientDTO patientById(int id) {
		Patient patient = patientRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundExceptions("Patient not found with id: " + id));
		return convertEntityToDTO(patient);
	}

	public PatientDTO updatePatientById(int id, PatientDTO patientDTO) {
		Patient existingPatient = patientRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundExceptions("Patient not found with id: " + id));

		existingPatient.setPatientName(patientDTO.getPatientName());

		Patient patient = patientRepository.save(existingPatient);

		return convertEntityToDTO(patient);
	}

	public void deletePatientById(int id) {
		Patient patient = patientRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundExceptions("Patient not found with id: " + id));
		patientRepository.delete(patient);
	}
}
