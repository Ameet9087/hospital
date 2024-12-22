package com.bloodbank.bloodBank.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import com.bloodbank.bloodBank.dto.PatientDTO;
import com.bloodbank.bloodBank.service.PatientService;


@RestController
@RequestMapping("/api/patient")
public class PatientController {

	@Autowired
	private PatientService patientService;

	@GetMapping
	public List<PatientDTO> getAllPatient() {
		return patientService.getAllPatient();
	}

	@PostMapping()
	public PatientDTO createPatient(@RequestBody PatientDTO patient) {
		return patientService.createPatient(patient);
	}

	@GetMapping("/{id}")
	public ResponseEntity<PatientDTO> getPatientById(@PathVariable int id) {
		return ResponseEntity.ok(patientService.patientById(id));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<PatientDTO> updatePatient(@PathVariable int id, @RequestBody PatientDTO patientDetails) {
		return ResponseEntity.ok(patientService.updatePatientById(id, patientDetails));
		
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, String>> deletePatient(@PathVariable(value = "id") int id) {
		patientService.deletePatientById(id);
		Map<String, String> response = new HashMap<>();
		response.put("message", "Patient deleted with id: " + id);
		return ResponseEntity.ok(response);
	}
}
