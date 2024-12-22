package com.bloodbank.bloodBank.dto;

import java.sql.Date;


public class BloodRequestDTO {

	private int requestId;
	private String bloodGroup;
	
	private int requiredUnits;
	private Date requestDate;
	private Date requiredDate;
	
	private String status;
	private String contactInformation;
	
	int hsId;
	int doctorId;
	int patientId;

	public BloodRequestDTO() {
		// TODO Auto-generated constructor stub
	}

	public BloodRequestDTO(int requestId, String bloodGroup, int requiredUnits, Date requestDate, Date requiredDate,
			String status, String contactInformation, int hsId, int doctorId, int patientId) {
		super();
		this.requestId = requestId;
		this.bloodGroup = bloodGroup;
		this.requiredUnits = requiredUnits;
		this.requestDate = requestDate;
		this.requiredDate = requiredDate;
		this.status = status;
		this.contactInformation = contactInformation;
		this.hsId = hsId;
		this.doctorId = doctorId;
		this.patientId = patientId;
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

	public int getHsId() {
		return hsId;
	}

	public void setHsId(int hsId) {
		this.hsId = hsId;
	}

	public int getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	
	
}
