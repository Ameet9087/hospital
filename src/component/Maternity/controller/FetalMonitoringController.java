package com.LPHSmartX.hospital.Maternity.controller;
/*------------------Sufiyan_Shaikh_FetalMonitoringController_08_10_2024_Start---------------------------*/

import java.util.List;

import com.LPHSmartX.hospital.Maternity.dto.FetalMonitoringDTO;
import com.LPHSmartX.hospital.Maternity.service.FetalMonitoringService;
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
@RequestMapping("/api/fetal-monitoring")
public class FetalMonitoringController {

    @Autowired
    private FetalMonitoringService fetalMonitoringService;

    @PostMapping
    public ResponseEntity<FetalMonitoringDTO> createFetalMonitoring(@RequestBody FetalMonitoringDTO fetalMonitoringDTO) {
        FetalMonitoringDTO createdFetalMonitoring = fetalMonitoringService.createFetalMonitoring(fetalMonitoringDTO);
        return ResponseEntity.ok(createdFetalMonitoring);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FetalMonitoringDTO> getFetalMonitoringById(@PathVariable Long id) {
        FetalMonitoringDTO fetalMonitoring = fetalMonitoringService.getFetalMonitoringById(id);
        return fetalMonitoring != null ? ResponseEntity.ok(fetalMonitoring) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<FetalMonitoringDTO>> getAllFetalMonitoring() {
        List<FetalMonitoringDTO> fetalMonitoringList = fetalMonitoringService.getAllFetalMonitoring();
        return ResponseEntity.ok(fetalMonitoringList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFetalMonitoring(@PathVariable Long id) {
        fetalMonitoringService.deleteFetalMonitoring(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<FetalMonitoringDTO> updateFetalMonitoring(@PathVariable Long id, @RequestBody FetalMonitoringDTO fetalMonitoringDTO) {
        FetalMonitoringDTO updatedFetalMonitoring = fetalMonitoringService.updateFetalMonitoring(id, fetalMonitoringDTO);
        return updatedFetalMonitoring != null ? ResponseEntity.ok(updatedFetalMonitoring) : ResponseEntity.notFound().build();
    }
}
/*------------------Sufiyan_Shaikh_FetalMonitoringController_08_10_2024_End---------------------------*/
