package com.bloodbank.bloodBank.service;

import java.util.List;

import com.bloodbank.bloodBank.dto.HospitalDTO;

public interface HospitalService {

	public List<HospitalDTO> getAllHospital();
	public HospitalDTO createHospital(HospitalDTO hospital);
	public HospitalDTO hospitalById(int id);
	public HospitalDTO updateHospitalById(int id, HospitalDTO hospitalDetails);
	public void deleteHospitalById(int id);
}
