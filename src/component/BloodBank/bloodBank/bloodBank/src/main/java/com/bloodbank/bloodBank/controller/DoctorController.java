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


import com.bloodbank.bloodBank.dto.DoctorDTO;
import com.bloodbank.bloodBank.service.DoctorService;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {
	
	@Autowired
	private DoctorService doctorService;

	@GetMapping
	public List<DoctorDTO> getAllDoctor() {
		return doctorService.getAllDoctor();
	}

	@PostMapping()
	public DoctorDTO createDoctor(@RequestBody DoctorDTO doctor) {
		return doctorService.createDoctor(doctor);
	}

	@GetMapping("/{id}")
	public ResponseEntity<DoctorDTO> getDoctorById(@PathVariable int id) {
		return ResponseEntity.ok(doctorService.doctorById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<DoctorDTO> updateDoctor(@PathVariable int id, @RequestBody DoctorDTO doctorDTO) {
		return ResponseEntity.ok(doctorService.updateDoctorById(id, doctorDTO));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, String>> deleteDoctor(@PathVariable(value = "id") int id) {
		doctorService.deleteDoctorById(id);
		Map<String, String> response = new HashMap<>();
		response.put("message", "Doctor deleted with id: " + id);
		return ResponseEntity.ok(response);
	}

}
