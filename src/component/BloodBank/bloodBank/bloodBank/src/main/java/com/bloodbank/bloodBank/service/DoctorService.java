package com.bloodbank.bloodBank.service;

import java.util.List;


import com.bloodbank.bloodBank.dto.DoctorDTO;

public interface DoctorService {
	
	
	public List<DoctorDTO> getAllDoctor();
	public DoctorDTO createDoctor(DoctorDTO doctor);
	public DoctorDTO doctorById(int id);
	public DoctorDTO updateDoctorById(int id, DoctorDTO doctorDetails);
	public void deleteDoctorById(int id);

}
