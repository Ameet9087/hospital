package com.bloodbank.bloodBank.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class BloodBank {

	

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	int bloodBankId;
	
	String bloodBankName;
	
	@OneToMany(mappedBy = "bloodBank")
    private List<BloodIssue> bloodIssue;

	
	public BloodBank() {
		// TODO Auto-generated constructor stub
	}


	public BloodBank(int bloodBankId, String bloodBankName, List<BloodIssue> bloodIssue) {
		super();
		this.bloodBankId = bloodBankId;
		this.bloodBankName = bloodBankName;
		this.bloodIssue = bloodIssue;
	}


	public int getBloodBankId() {
		return bloodBankId;
	}


	public void setBloodBankId(int bloodBankId) {
		this.bloodBankId = bloodBankId;
	}


	public String getBloodBankName() {
		return bloodBankName;
	}


	public void setBloodBankName(String bloodBankName) {
		this.bloodBankName = bloodBankName;
	}


	public List<BloodIssue> getBloodIssue() {
		return bloodIssue != null ? bloodIssue : new ArrayList<>();
	}


	public void setBloodIssue(List<BloodIssue> bloodIssue) {
		this.bloodIssue = bloodIssue;
	}

	
}

