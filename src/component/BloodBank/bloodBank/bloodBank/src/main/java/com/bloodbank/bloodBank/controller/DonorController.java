package com.bloodbank.bloodBank.controller;

import com.bloodbank.bloodBank.dto.DonorDto;
import com.bloodbank.bloodBank.service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin(origins = "*")
public class DonorController {

    @Autowired
    private DonorService donorService;


    @PostMapping("/register")
    public ResponseEntity<?> registerDonor(@RequestBody DonorDto donorDto) {
        // Perform registration logic
        donorService.registerDonor(donorDto);
        return ResponseEntity.ok("Donor registered successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonorDto> getDonorById(@PathVariable Long id) {
        DonorDto donorDto = donorService.getDonorById(id);
        return ResponseEntity.ok(donorDto);
    }

    @GetMapping("/allDonors")
    public ResponseEntity<List<DonorDto>> getAllDonors() {
        List<DonorDto> donorList = donorService.getAllDonors();
        return ResponseEntity.ok(donorList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonorById(@PathVariable Long id) {
        donorService.deleteDonorById(id);
        return ResponseEntity.noContent().build();
    }
}

