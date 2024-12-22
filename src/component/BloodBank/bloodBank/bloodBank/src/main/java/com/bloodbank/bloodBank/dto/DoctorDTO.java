package com.bloodbank.bloodBank.dto;

import java.util.List;

public class DoctorDTO {

	int doctorId;
	String doctorName;

	List<BloodRequestDTO> bloodRequest;

	public DoctorDTO() {
		// TODO Auto-generated constructor stub
	}

	public DoctorDTO(int doctorId, String doctorName, List<BloodRequestDTO> bloodRequest) {
		super();
		this.doctorId = doctorId;
		this.doctorName = doctorName;
		this.bloodRequest = bloodRequest;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public int getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}

	public List<BloodRequestDTO> getBloodRequest() {
		return bloodRequest;
	}

	public void setBloodRequest(List<BloodRequestDTO> bloodRequest) {
		this.bloodRequest = bloodRequest;
	}

}
