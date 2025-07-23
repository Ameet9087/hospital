package com.LPHSmartX.hospital.Maternity.service;

import java.util.List;

import com.LPHSmartX.hospital.Maternity.dto.LabourListDTO;


public interface LabourListService {
	LabourListDTO createLabourList(LabourListDTO labourListDTO);
    LabourListDTO getLabourListById(Long id);
    List<LabourListDTO> getAllLabourLists();
    void deleteLabourList(Long id);
    LabourListDTO updateLabourList(Long id, LabourListDTO labourListDTO);
}
