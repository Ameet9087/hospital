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



import com.bloodbank.bloodBank.dto.BloodBankDTO;
import com.bloodbank.bloodBank.service.BloodBankService;


/*------------------Prakash_Ghandage_BloodBankController_25_09_2024_Start---------------------------*/



@RestController
@RequestMapping("/api/bloodBank")
public class BloodBankController {

	

	@Autowired
	private BloodBankService bloodBankService;

	@GetMapping
	public List<BloodBankDTO> getAllBloodBank() {
		return bloodBankService.getAllBloodBank();
	}

	@PostMapping()
	public BloodBankDTO createBloodBank(@RequestBody BloodBankDTO bloodBank) {
		return bloodBankService.createBloodBank(bloodBank);
	}

	@GetMapping("/{id}")
	public ResponseEntity<BloodBankDTO> getBloodBankById(@PathVariable int id) {
		return ResponseEntity.ok(bloodBankService.bloodBankById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<BloodBankDTO> updateBloodBank(@PathVariable int id, @RequestBody BloodBankDTO bloodBankDTO) {
		return ResponseEntity.ok(bloodBankService.updateBloodBankById(id, bloodBankDTO));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, String>> deleteBloodBank(@PathVariable(value = "id") int id) {
		bloodBankService.deleteBloodBankById(id);
		Map<String, String> response = new HashMap<>();
		response.put("message", "Doctor deleted with id: " + id);
		return ResponseEntity.ok(response);
	}

}


/* --------------------------------Prakash_Ghandage_BloodBankController.java_25_09_2024_End ---------------------------------------*/