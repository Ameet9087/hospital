package com.LPHSmartX.hospital.Maternity.controller;
/*------------------Sufiyan_Shaikh_EmergencyHandlingController_08_10_2024_Start---------------------------*/

import java.util.List;

import com.LPHSmartX.hospital.Maternity.dto.EmergencyHandlingDTO;
import com.LPHSmartX.hospital.Maternity.service.EmergencyHandlingService;
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
@RequestMapping("/api/emergency-handling")
public class EmergencyHandlingController {

    @Autowired
    private EmergencyHandlingService emergencyHandlingService;

    @PostMapping
    public ResponseEntity<EmergencyHandlingDTO> createEmergencyHandling(@RequestBody EmergencyHandlingDTO emergencyHandlingDTO) {
        EmergencyHandlingDTO createdEmergencyHandling = emergencyHandlingService.createEmergencyHandling(emergencyHandlingDTO);
        return ResponseEntity.ok(createdEmergencyHandling);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmergencyHandlingDTO> getEmergencyHandlingById(@PathVariable Long id) {
        EmergencyHandlingDTO emergencyHandling = emergencyHandlingService.getEmergencyHandlingById(id);
        return emergencyHandling != null ? ResponseEntity.ok(emergencyHandling) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<EmergencyHandlingDTO>> getAllEmergencyHandlings() {
        List<EmergencyHandlingDTO> emergencyHandlingList = emergencyHandlingService.getAllEmergencyHandlings();
        return ResponseEntity.ok(emergencyHandlingList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmergencyHandling(@PathVariable Long id) {
        emergencyHandlingService.deleteEmergencyHandling(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<EmergencyHandlingDTO> updateEmergencyHandling(@PathVariable Long id, 
                                                                       @RequestBody EmergencyHandlingDTO emergencyHandlingDTO) {
        EmergencyHandlingDTO updatedEmergencyHandling = emergencyHandlingService.updateEmergencyHandling(id, emergencyHandlingDTO);
        return updatedEmergencyHandling != null ? ResponseEntity.ok(updatedEmergencyHandling) : ResponseEntity.notFound().build();
    }
}
/*------------------Sufiyan_Shaikh_EmergencyHandlingController_08_10_2024_end---------------------------*/
