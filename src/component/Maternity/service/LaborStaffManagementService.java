package com.LPHSmartX.hospital.Maternity.service;

import java.util.List;

import com.LPHSmartX.hospital.Maternity.dto.LaborStaffManagementDTO;


public interface LaborStaffManagementService {
	  LaborStaffManagementDTO createLaborStaffManagement(LaborStaffManagementDTO laborStaffManagementDTO);
	    LaborStaffManagementDTO getLaborStaffManagementById(Long id);
	    List<LaborStaffManagementDTO> getAllLaborStaffManagement();
	    void deleteLaborStaffManagement(Long id);
	    LaborStaffManagementDTO updateLaborStaffManagement(Long id, LaborStaffManagementDTO laborStaffManagementDTO);

}
