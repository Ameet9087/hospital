package com.bloodbank.bloodBank.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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



import com.bloodbank.bloodBank.dto.BloodRequestDTO;
import com.bloodbank.bloodBank.service.BloodRequestServicee;

@CrossOrigin(value="*")
@RestController
@RequestMapping("/api/bloodRequest")
public class BloodRequestController {

	@Autowired
	private BloodRequestServicee bloodRequestService;

	@GetMapping
	public List<BloodRequestDTO> getAllBloodRequest() {
		return bloodRequestService.getAllBloodRequest();
	}

	@PostMapping()
	public BloodRequestDTO createBloodRequest(@RequestBody BloodRequestDTO bloodRequestDTO) {
		return bloodRequestService.createBloodRequest(bloodRequestDTO);
	}

	@GetMapping("/{id}")
	public ResponseEntity<BloodRequestDTO> getBloodRequestById(@PathVariable int id) {
		return ResponseEntity.ok(bloodRequestService.bloodRequestById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<BloodRequestDTO> updateBloodRequest(@PathVariable int id, @RequestBody BloodRequestDTO bloodRequestDTO) {
		return ResponseEntity.ok(bloodRequestService.updateBloodRequestById(id, bloodRequestDTO));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, String>> deleteBloodRequest(@PathVariable int id) {
		bloodRequestService.deleteBloodRequestById(id);
		Map<String, String> response = new HashMap<>();
		response.put("message", "BloodRequest deleted with id: " + id);
		return ResponseEntity.ok(response);
	}

}
