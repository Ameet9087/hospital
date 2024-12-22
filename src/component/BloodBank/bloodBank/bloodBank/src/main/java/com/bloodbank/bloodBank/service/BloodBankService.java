package com.bloodbank.bloodBank.service;

import java.util.List;



import com.bloodbank.bloodBank.dto.BloodBankDTO;

public interface BloodBankService {

	public List<BloodBankDTO> getAllBloodBank();
	public BloodBankDTO createBloodBank(BloodBankDTO bloodBankDTO);
	public BloodBankDTO bloodBankById(int id);
	public BloodBankDTO updateBloodBankById(int id, BloodBankDTO bloodBankDetails);
	public void deleteBloodBankById(int id);
}
