package com.bloodbank.bloodBank.dto;

import java.util.List;


public class HospitalDTO {

	int hsId;
	String hsName;
	List<BloodRequestDTO> bloodRequest;
	
	public HospitalDTO() {
		// TODO Auto-generated constructor stub
	}

	public HospitalDTO(int hsId, String hsName, List<BloodRequestDTO> bloodRequest) {
		super();
		this.hsId = hsId;
		this.hsName = hsName;
		this.bloodRequest = bloodRequest;
	}

	public int getHsId() {
		return hsId;
	}

	public void setHsId(int hsId) {
		this.hsId = hsId;
	}

	public String getHsName() {
		return hsName;
	}

	public void setHsName(String hsName) {
		this.hsName = hsName;
	}

	public List<BloodRequestDTO> getBloodRequest() {
		return bloodRequest;
	}

	public void setBloodRequest(List<BloodRequestDTO> bloodRequest) {
		this.bloodRequest = bloodRequest;
	}

	
	
}
