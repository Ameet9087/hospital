package com.LPHSmartX.hospital.Maternity.service;

import com.LPHSmartX.hospital.Maternity.dto.BreastfeedingSupportDTO;

import java.util.List;



public interface BreastfeedingSupportService {
	BreastfeedingSupportDTO createBreastfeedingSupport(BreastfeedingSupportDTO breastfeedingSupportDTO);
    BreastfeedingSupportDTO getBreastfeedingSupportById(Long id);
    List<BreastfeedingSupportDTO> getAllBreastfeedingSupports();
    void deleteBreastfeedingSupport(Long id);
    BreastfeedingSupportDTO updateBreastfeedingSupport(Long id, BreastfeedingSupportDTO breastfeedingSupportDTO);
}
