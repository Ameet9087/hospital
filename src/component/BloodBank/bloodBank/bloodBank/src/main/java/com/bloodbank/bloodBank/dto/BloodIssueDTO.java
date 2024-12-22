package com.bloodbank.bloodBank.dto;

import java.sql.Date;


public class BloodIssueDTO {

	private int issueId;
    private String bloodGroup;
    private int unitsIssued;
    private Date issueDate;
    
    private String issuedBy;
    private String status;



	private int requestId;
    private int patientId; 
    private int doctorId;
    private int bloodBankId;
    
	
	public BloodIssueDTO() {
		// TODO Auto-generated constructor stub
	}


	public BloodIssueDTO(int issueId, String bloodGroup, int unitsIssued, Date issueDate, String issuedBy,
			String status, int requestId, int patientId, int doctorId, int bloodBankId) {
		super();
		this.issueId = issueId;
		this.bloodGroup = bloodGroup;
		this.unitsIssued = unitsIssued;
		this.issueDate = issueDate;
		this.issuedBy = issuedBy;
		this.status = status;
		this.requestId =requestId;
		this.patientId = patientId;
		this.doctorId = doctorId;
		this.bloodBankId = bloodBankId;
	}


	public int getIssueId() {
		return issueId;
	}


	public void setIssueId(int issueId) {
		this.issueId = issueId;
	}


	public String getBloodGroup() {
		return bloodGroup;
	}


	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}


	public int getUnitsIssued() {
		return unitsIssued;
	}


	public void setUnitsIssued(int unitsIssued) {
		this.unitsIssued = unitsIssued;
	}


	public Date getIssueDate() {
		return issueDate;
	}


	public void setIssueDate(Date issueDate) {
		this.issueDate = issueDate;
	}


	public String getIssuedBy() {
		return issuedBy;
	}


	public void setIssuedBy(String issuedBy) {
		this.issuedBy = issuedBy;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}




	public int getPatientId() {
		return patientId;
	}


	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}


	public int getDoctorId() {
		return doctorId;
	}


	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}


	public int getBloodBankId() {
		return bloodBankId;
	}


	public void setBloodBankId(int bloodBankId) {
		this.bloodBankId = bloodBankId;
	}

	public int getRequestId() {
		return requestId;
	}

	public void setRequestId(int requestId) {
		this.requestId = requestId;
	}
	
}
