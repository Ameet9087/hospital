package com.bloodbank.bloodBank.dto;

import java.util.List;

public class PatientDTO {
	
	int patientId;
	String patientName;

	List<BloodRequestDTO> bloodRequest;
	
	public PatientDTO() {
		// TODO Auto-generated constructor stub
	}

	public PatientDTO(int patientId, String patientName, List<BloodRequestDTO> bloodRequest) {
		super();
		this.patientId = patientId;
		this.patientName = patientName;
		this.bloodRequest = bloodRequest;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public List<BloodRequestDTO> getBloodRequest() {
		return bloodRequest;
	}

	public void setBloodRequest(List<BloodRequestDTO> bloodRequest) {
		this.bloodRequest = bloodRequest;
	}

}
