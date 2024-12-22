package com.bloodbank.bloodBank.service;

import java.util.List;

import com.bloodbank.bloodBank.dto.BloodStorageDTO;

public interface BloodStorageService {

	
	

	public BloodStorageDTO getBloodStorage(int storage_id);

	BloodStorageDTO updateBloodStorage(BloodStorageDTO bloodstorage, int storage_id);

	BloodStorageDTO addToBloodStorage(BloodStorageDTO bloodStorageDTO);

	List<BloodStorageDTO> allBloodStorage();
	
	void deletebyid(int storage_id);


}
