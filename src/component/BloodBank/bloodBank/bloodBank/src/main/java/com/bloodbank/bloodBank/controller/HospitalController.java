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



import com.bloodbank.bloodBank.dto.HospitalDTO;
import com.bloodbank.bloodBank.service.HospitalService;
@RestController
@RequestMapping("/api/hospital")
public class HospitalController {

	
	@Autowired
	private HospitalService hospitalService;

	@GetMapping
	public List<HospitalDTO> getAllHospital() {
		return hospitalService.getAllHospital();
	}

	@PostMapping()
	public HospitalDTO createHospital(@RequestBody HospitalDTO hospital) {
		return hospitalService.createHospital(hospital);
	}

	@GetMapping("/{id}")
	public ResponseEntity<HospitalDTO> getHospitalById(@PathVariable int id) {
		return ResponseEntity.ok(hospitalService.hospitalById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<HospitalDTO> updateHospital(@PathVariable(value = "id") int id, @RequestBody HospitalDTO hospitalDetails) {
		return ResponseEntity.ok(hospitalService.updateHospitalById(id, hospitalDetails));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, String>> deleteHospital(@PathVariable(value = "id") int id) {
		hospitalService.deleteHospitalById(id);
		Map<String, String> response = new HashMap<>();
		response.put("message", "Hospital deleted with id: " + id);
		return ResponseEntity.ok(response);
	}

}
