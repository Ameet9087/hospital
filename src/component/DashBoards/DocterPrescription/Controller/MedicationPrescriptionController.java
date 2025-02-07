package com.LPHSmartX.hospital.DocterPrescription.Controller;

import com.LPHSmartX.hospital.DocterPrescription.DTO.MedicationPrescriptionDTO;
import com.LPHSmartX.hospital.DocterPrescription.Service.MedicationPrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/api/medication-prescriptions")
public class MedicationPrescriptionController {

    @Autowired
    private MedicationPrescriptionService medicationPrescriptionService;

    // Create a new medication prescription
    @PostMapping
    public ResponseEntity<String> createMedication(@RequestBody MedicationPrescriptionDTO medicationPrescriptionDTO) {
        try {
            medicationPrescriptionService.createMedication(medicationPrescriptionDTO);
            return new ResponseEntity<>("Medication prescription created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create medication prescription: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get all medication prescriptions
    @GetMapping
    public ResponseEntity<?> getAllMedications() {
        try {
            List<MedicationPrescriptionDTO> medicationPrescriptions = medicationPrescriptionService.getAllMedication();
            return new ResponseEntity<>(medicationPrescriptions, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error retrieving medications: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get a specific medication prescription by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getMedicationById(@PathVariable("id") int medicationPrescriptionId) {
        try {
            MedicationPrescriptionDTO medicationPrescription = medicationPrescriptionService.getMedicationById(medicationPrescriptionId);
            return new ResponseEntity<>(medicationPrescription, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Medication prescription not found: " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // Update a medication prescription by ID
    @PutMapping("/{id}")
    public ResponseEntity<String> updateMedication(@PathVariable("id") int medicationPrescriptionId,
                                                   @RequestBody MedicationPrescriptionDTO medicationPrescriptionDTO) {
        try {
            medicationPrescriptionService.updateMedication(medicationPrescriptionId, medicationPrescriptionDTO);
            return new ResponseEntity<>("Medication prescription updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update medication prescription: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete a medication prescription by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMedication(@PathVariable("id") int medicationPrescriptionId) {
        try {
            medicationPrescriptionService.deleteMedication(medicationPrescriptionId);
            return new ResponseEntity<>("Medication prescription deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete medication prescription: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
