package com.bloodbank.bloodBank.entity;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class BloodIssue {

	    @Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    private int issueId;
	    
	    private String bloodGroup;
	    
	    private int unitsIssued;
	    
	    private Date issueDate;
	    
	    private String issuedBy;
	    
	    private String status;
	 
	    
	    @ManyToOne
	    @JoinColumn(name = "bloodRequestId")
	    private BloodRequest bloodRequest;

	    @ManyToOne
	    @JoinColumn(name = "patientId")
	    private Patient patient;
	    
	    @ManyToOne
	    @JoinColumn(name = "doctorId")
	    private Doctor doctor;
	    
	    @ManyToOne
	    @JoinColumn(name = "bloodBankId")
	    private BloodBank bloodBank;

	    public BloodIssue() {
			// TODO Auto-generated constructor stub
		}

		public BloodIssue(int issueId, String bloodGroup, int unitsIssued, Date issueDate, String issuedBy,
				String status, BloodRequest bloodRequest, Patient patient, Doctor doctor, BloodBank bloodBank) {
			super();
			this.issueId = issueId;
			this.bloodGroup = bloodGroup;
			this.unitsIssued = unitsIssued;
			this.issueDate = issueDate;
			this.issuedBy = issuedBy;
			this.status = status;
			this.bloodRequest = bloodRequest;
			this.patient = patient;
			this.doctor = doctor;
			this.bloodBank = bloodBank;
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

		public BloodRequest getBloodRequest() {
			return bloodRequest;
		}

		public void setBloodRequest(BloodRequest bloodRequest) {
			this.bloodRequest = bloodRequest;
		}

		public Patient getPatient() {
			return patient;
		}

		public void setPatient(Patient patient) {
			this.patient = patient;
		}

		public Doctor getDoctor() {
			return doctor;
		}

		public void setDoctor(Doctor doctor) {
			this.doctor = doctor;
		}

		public BloodBank getBloodBank() {
			return bloodBank;
		}

		public void setBloodBank(BloodBank bloodBank) {
			this.bloodBank = bloodBank;
		}
	    
	
}
