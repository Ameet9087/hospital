package com.LPHSmartX.hospital.Maternity.service;

import java.util.List;

import com.LPHSmartX.hospital.Maternity.dto.FamilyPlanningDTO;


public interface FamilyPlanningService {
    FamilyPlanningDTO createFamilyPlanning(FamilyPlanningDTO familyPlanningDTO);
    FamilyPlanningDTO getFamilyPlanningById(Long id);
    List<FamilyPlanningDTO> getAllFamilyPlanning();
    void deleteFamilyPlanning(Long id);
    FamilyPlanningDTO updateFamilyPlanning(Long id, FamilyPlanningDTO familyPlanningDTO);
}