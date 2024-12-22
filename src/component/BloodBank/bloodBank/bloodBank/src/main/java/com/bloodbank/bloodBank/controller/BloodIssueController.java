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



import com.bloodbank.bloodBank.dto.BloodIssueDTO;
import com.bloodbank.bloodBank.service.BloodIssueService;

/*-----------------------------Prakash_Ghandage_BloodIssueController.java_24_09_2024_Start------------------------------*/



@CrossOrigin(value="*")
@RestController
@RequestMapping("/api/bloodIssue")
public class BloodIssueController {

	@Autowired
	private BloodIssueService bloodIssueService;

	@GetMapping("/getAllIssue")
	public List<BloodIssueDTO> getAllBloodIssue() {
		return bloodIssueService.getAllBloodIssue();
	}

	@PostMapping()
	public BloodIssueDTO createBloodIssue(@RequestBody BloodIssueDTO bloodIssueDTO) {
		return bloodIssueService.createBloodIssue(bloodIssueDTO);
	}

	@GetMapping("/{id}")
	public ResponseEntity<BloodIssueDTO> getBloodIssueById(@PathVariable int id) {
		return ResponseEntity.ok(bloodIssueService.bloodIssueById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<BloodIssueDTO> updateBloodIssue(@PathVariable int id, @RequestBody BloodIssueDTO bloodIssueDTO) {
		return ResponseEntity.ok(bloodIssueService.updateBloodIssueById(id, bloodIssueDTO));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, String>> deleteBloodIssue(@PathVariable int id) {
		bloodIssueService.deleteBloodIssueById(id);
		Map<String, String> response = new HashMap<>();
		response.put("message", "BloodRequest deleted with id: " + id);
		return ResponseEntity.ok(response);
	}

}


/*---------------------------- Prakash_Ghandage_BloodIssueController.java_25_09_2024_Start--------------------------------------- */
