package com.LPHSmartX.hospital.Maternity.controller;
/*------------------Sufiyan_Shaikh_FamilyPlanningController_08_10_2024_Start---------------------------*/

import java.util.List;

import com.LPHSmartX.hospital.Maternity.dto.FamilyPlanningDTO;
import com.LPHSmartX.hospital.Maternity.service.FamilyPlanningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/api/family-planning")
public class FamilyPlanningController {

    @Autowired
    private FamilyPlanningService familyPlanningService;

    @PostMapping
    public ResponseEntity<FamilyPlanningDTO> createFamilyPlanning(@RequestBody FamilyPlanningDTO familyPlanningDTO) {
        FamilyPlanningDTO createdFamilyPlanning = familyPlanningService.createFamilyPlanning(familyPlanningDTO);
        return ResponseEntity.ok(createdFamilyPlanning);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FamilyPlanningDTO> getFamilyPlanningById(@PathVariable Long id) {
        FamilyPlanningDTO familyPlanning = familyPlanningService.getFamilyPlanningById(id);
        return familyPlanning != null ? ResponseEntity.ok(familyPlanning) : ResponseEntity.notFound().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<FamilyPlanningDTO> updateFamilyPlanning(@PathVariable Long id, @RequestBody FamilyPlanningDTO familyPlanningDTO) {
        FamilyPlanningDTO updatedFamilyPlanning = familyPlanningService.updateFamilyPlanning(id, familyPlanningDTO);
        return updatedFamilyPlanning != null ? ResponseEntity.ok(updatedFamilyPlanning) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<FamilyPlanningDTO>> getAllFamilyPlanning() {
        List<FamilyPlanningDTO> familyPlanningList = familyPlanningService.getAllFamilyPlanning();
        return ResponseEntity.ok(familyPlanningList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFamilyPlanning(@PathVariable Long id) {
        familyPlanningService.deleteFamilyPlanning(id);
        return ResponseEntity.noContent().build();
    }
}
