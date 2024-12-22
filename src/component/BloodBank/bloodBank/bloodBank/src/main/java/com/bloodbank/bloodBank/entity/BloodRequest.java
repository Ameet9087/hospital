package com.bloodbank.bloodBank.entity;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.*;

@Entity
public class BloodRequest {



	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int requestId;

	private String bloodGroup;
	private int requiredUnits;
	
	private Date requestDate;
	private Date requiredDate;
	private String status;
	
	private String contactInformation;

	@ManyToOne
	@JoinColumn(name = "patientId")
	Patient patient;
	
	@ManyToOne
	@JoinColumn(name = "hsId")
	Hospital hospital;

	@ManyToOne
	@JoinColumn(name = "doctorId")
	Doctor doctor;


@OneToMany(mappedBy = "bloodRequest", cascade = CascadeType.ALL , fetch = FetchType.LAZY)
private List<BloodIssue> bloodIssue;

	public BloodRequest() {
		// TODO Auto-generated constructor stub
	}




	public BloodRequest(int requestId, String bloodGroup, int requiredUnits, Date requestDate, Date requiredDate, String status, String contactInformation, Patient patient, Hospital hospital, Doctor doctor, List<BloodIssue> bloodIssue) {
		this.requestId = requestId;
		this.bloodGroup = bloodGroup;
		this.requiredUnits = requiredUnits;
		this.requestDate = requestDate;
		this.requiredDate = requiredDate;
		this.status = status;
		this.contactInformation = contactInformation;
		this.patient = patient;
		this.hospital = hospital;
		this.doctor = doctor;
		this.bloodIssue = bloodIssue;
	}

	public BloodRequest(int requestId) {
		this.requestId = requestId;
	}

	public int getRequestId() {
		return requestId;
	}


	public void setRequestId(int requestId) {
		this.requestId = requestId;
	}


	public String getBloodGroup() {
		return bloodGroup;
	}


	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}


	public int getRequiredUnits() {
		return requiredUnits;
	}


	public void setRequiredUnits(int requiredUnits) {
		this.requiredUnits = requiredUnits;
	}


	public Date getRequestDate() {
		return requestDate;
	}


	public void setRequestDate(Date requestDate) {
		this.requestDate = requestDate;
	}


	public Date getRequiredDate() {
		return requiredDate;
	}


	public void setRequiredDate(Date requiredDate) {
		this.requiredDate = requiredDate;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getContactInformation() {
		return contactInformation;
	}


	public void setContactInformation(String contactInformation) {
		this.contactInformation = contactInformation;
	}


	public Patient getPatient() {
		return patient;
	}


	public void setPatient(Patient patient) {
		this.patient = patient;
	}


	public Hospital getHospital() {
		return hospital;
	}


	public void setHospital(Hospital hospital) {
		this.hospital = hospital;
	}


	public Doctor getDoctor() {
		return doctor;
	}


	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	public List<BloodIssue> getBloodIssue() {
		return bloodIssue;
	}

	public void setBloodIssue(List<BloodIssue> bloodIssue) {
		this.bloodIssue = bloodIssue;
	}


}
