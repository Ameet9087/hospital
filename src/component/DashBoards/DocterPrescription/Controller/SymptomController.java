package com.LPHSmartX.hospital.DocterPrescription.Controller;

import com.LPHSmartX.hospital.DocterPrescription.DTO.SymptomDTO;
import com.LPHSmartX.hospital.DocterPrescription.Service.SymptomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(value = "*")
@RestController
@RequestMapping("/api/symptoms")
public class SymptomController {

    @Autowired
    private SymptomService symptomService;

    @PostMapping
    public ResponseEntity<SymptomDTO> createSymptom(@RequestBody SymptomDTO symptomDTO) {
        SymptomDTO createdSymptom = symptomService.createSymptom(symptomDTO);
        return ResponseEntity.ok(createdSymptom);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SymptomDTO> getSymptomById(@PathVariable Long id) {
        SymptomDTO symptomDTO = symptomService.getSymptomById(id);
        return ResponseEntity.ok(symptomDTO);
    }

    @GetMapping
    public ResponseEntity<List<SymptomDTO>> getAllSymptoms() {
        List<SymptomDTO> symptoms = symptomService.getAllSymptoms();
        return ResponseEntity.ok(symptoms);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SymptomDTO> updateSymptom(@PathVariable Long id, @RequestBody SymptomDTO symptomDTO) {
        SymptomDTO updatedSymptom = symptomService.updateSymptom(id, symptomDTO);
        return ResponseEntity.ok(updatedSymptom);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSymptom(@PathVariable Long id) {
        symptomService.deleteSymptom(id);
        return ResponseEntity.noContent().build();
    }
}
