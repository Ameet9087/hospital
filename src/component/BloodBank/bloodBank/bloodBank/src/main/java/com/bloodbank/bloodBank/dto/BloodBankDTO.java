package com.bloodbank.bloodBank.dto;

import java.util.List;

public class BloodBankDTO {
	
	
	int bloodBanId;
	String bloodBankName;
	List<BloodIssueDTO> bloodIssue;
	
	
	public BloodBankDTO() {
		// TODO Auto-generated constructor stub
	}


	public BloodBankDTO(int bloodBanId, String bloodBankName, List<BloodIssueDTO> bloodIssue) {
		super();
		this.bloodBanId = bloodBanId;
		this.bloodBankName = bloodBankName;
		this.bloodIssue = bloodIssue;
	}


	public int getBloodBanId() {
		return bloodBanId;
	}


	public void setBloodBanId(int bloodBanId) {
		this.bloodBanId = bloodBanId;
	}


	public String getBloodBankName() {
		return bloodBankName;
	}


	public void setBloodBankName(String bloodBankName) {
		this.bloodBankName = bloodBankName;
	}


	public List<BloodIssueDTO> getBloodIssue() {
		return bloodIssue;
	}


	public void setBloodIssue(List<BloodIssueDTO> bloodIssue) {
		this.bloodIssue = bloodIssue;
	}

	
}
