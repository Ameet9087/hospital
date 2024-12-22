package com.bloodbank.bloodBank.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Patient {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	int patientId;
	
	String patientName;
	
	@OneToMany(mappedBy = "patient")
    private List<BloodRequest> bloodRequest;
	
	public Patient() {
		// TODO Auto-generated constructor stub
	}

	public Patient(int patientId, String patientName, List<BloodRequest> bloodRequest) {
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

	public List<BloodRequest> getBloodRequest() {
		 return bloodRequest != null ? bloodRequest : new ArrayList<>();
	}

	public void setBloodRequest(List<BloodRequest> bloodRequest) {
		this.bloodRequest = bloodRequest;
	}

}
