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
public class Hospital {
	

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int hsId;
	String hsName;
	
	
	@OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL , fetch = FetchType.LAZY)
	private List<BloodRequest> bloodRequest;
	
	
	public Hospital() {
		// TODO Auto-generated constructor stub
	}

	public Hospital(int hsId, String hsName, List<BloodRequest> bloodRequest) {
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

	public List<BloodRequest> getBloodRequest() {
	 return bloodRequest != null ? bloodRequest : new ArrayList<>();
	}

	public void setBloodRequest(List<BloodRequest> bloodRequest) {
		this.bloodRequest = bloodRequest;
	}

}
