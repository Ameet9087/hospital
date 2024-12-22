package com.bloodbank.bloodBank.service;

import java.util.List;


import com.bloodbank.bloodBank.dto.BloodRequestDTO;

public interface BloodRequestServicee {

	public List<BloodRequestDTO> getAllBloodRequest();
	public BloodRequestDTO createBloodRequest(BloodRequestDTO bloodRequestDTO);
	
	public BloodRequestDTO bloodRequestById(int id);
	public BloodRequestDTO updateBloodRequestById(int id, BloodRequestDTO bloodRequestDetails);
	public void deleteBloodRequestById(int id);
}