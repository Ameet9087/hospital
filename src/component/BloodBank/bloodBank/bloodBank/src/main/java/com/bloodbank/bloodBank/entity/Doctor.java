package com.bloodbank.bloodBank.entity;

import java.util.ArrayList;
import java.util.List;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Doctor {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int doctorId;
	String doctorName;
	
	@OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL ,fetch = FetchType.LAZY)
	private List<BloodRequest> bloodRequest;

	
	public Doctor() {
		// TODO Auto-generated constructor stub
	}

	public Doctor(int doctorId, String doctorName, List<BloodRequest> bloodRequest) {
		super();
		this.doctorId = doctorId;
		this.doctorName = doctorName;
		this.bloodRequest = bloodRequest;
	}

	public int getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public List<BloodRequest> getBloodRequest() {
	   return bloodRequest != null ? bloodRequest : new ArrayList<>();
	}

	public void setBloodRequest(List<BloodRequest> bloodRequest) {
		this.bloodRequest = bloodRequest;
	}

}
