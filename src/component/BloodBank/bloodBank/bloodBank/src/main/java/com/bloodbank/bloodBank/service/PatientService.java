package com.bloodbank.bloodBank.service;

import java.util.List;

import com.bloodbank.bloodBank.dto.PatientDTO;

public interface PatientService {

	
	public List<PatientDTO> getAllPatient();
	public PatientDTO createPatient(PatientDTO patient);
	
	public PatientDTO updatePatientById(int id, PatientDTO patientDTO);
	
	
	public PatientDTO patientById(int id);
	public void deletePatientById(int id);
}
