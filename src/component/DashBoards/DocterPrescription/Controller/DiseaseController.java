package com.LPHSmartX.hospital.DocterPrescription.Controller;

import com.LPHSmartX.hospital.DocterPrescription.DTO.DiseaseDTO;

import com.LPHSmartX.hospital.DocterPrescription.Service.DiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(value = "*")
@RestController
@RequestMapping("/api/diseases")
public class DiseaseController {

    @Autowired
    private DiseaseService diseaseService;

    @PostMapping
    public ResponseEntity<DiseaseDTO> createDisease(@RequestBody DiseaseDTO diseaseDTO) {
        return ResponseEntity.ok(diseaseService.createDisease(diseaseDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiseaseDTO> getDiseaseById(@PathVariable Long id) {
        return ResponseEntity.ok(diseaseService.getDiseaseById(id));
    }

    @GetMapping
    public ResponseEntity<List<DiseaseDTO>> getAllDiseases() {
        return ResponseEntity.ok(diseaseService.getAllDiseases());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiseaseDTO> updateDisease(@PathVariable Long id, @RequestBody DiseaseDTO diseaseDTO) {
        return ResponseEntity.ok(diseaseService.updateDisease(id, diseaseDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDisease(@PathVariable Long id) {
        diseaseService.deleteDisease(id);
        return ResponseEntity.ok("Disease deleted successfully");
    }

}
