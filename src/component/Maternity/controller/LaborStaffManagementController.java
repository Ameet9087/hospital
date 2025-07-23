package com.LPHSmartX.hospital.Maternity.controller;
/*------------------Sufiyan_Shaikh_LaborStaffManagementController_08_10_2024_Start---------------------------*/

import java.util.List;

import com.LPHSmartX.hospital.Maternity.dto.LaborStaffManagementDTO;
import com.LPHSmartX.hospital.Maternity.service.LaborStaffManagementService;
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
@RequestMapping("/api/labor-staff-management")
public class LaborStaffManagementController {

    @Autowired
    private LaborStaffManagementService laborStaffManagementService;

    @PostMapping
    public ResponseEntity<LaborStaffManagementDTO> createLaborStaffManagement(@RequestBody LaborStaffManagementDTO laborStaffManagementDTO) {
        LaborStaffManagementDTO createdStaffManagement = laborStaffManagementService.createLaborStaffManagement(laborStaffManagementDTO);
        return ResponseEntity.ok(createdStaffManagement);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LaborStaffManagementDTO> getLaborStaffManagementById(@PathVariable Long id) {
        LaborStaffManagementDTO staffManagement = laborStaffManagementService.getLaborStaffManagementById(id);
        return staffManagement != null ? ResponseEntity.ok(staffManagement) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<LaborStaffManagementDTO>> getAllLaborStaffManagement() {
        List<LaborStaffManagementDTO> staffManagementList = laborStaffManagementService.getAllLaborStaffManagement();
        return ResponseEntity.ok(staffManagementList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLaborStaffManagement(@PathVariable Long id) {
        laborStaffManagementService.deleteLaborStaffManagement(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<LaborStaffManagementDTO> updateLaborStaffManagement(@PathVariable Long id, @RequestBody LaborStaffManagementDTO laborStaffManagementDTO) {
        LaborStaffManagementDTO updatedStaffManagement = laborStaffManagementService.updateLaborStaffManagement(id, laborStaffManagementDTO);
        return ResponseEntity.ok(updatedStaffManagement);
    }
    /*------------------Sufiyan_Shaikh_LaborStaffManagementController_08_10_2024_End---------------------------*/

}