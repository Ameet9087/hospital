package com.LPHSmartX.hospital.Maternity.controller;
/*------------------Sufiyan_Shaikh_BreastfeedingSupportController_08_10_2024_Start---------------------------*/

import java.util.List;

import com.LPHSmartX.hospital.Maternity.dto.BreastfeedingSupportDTO;
import com.LPHSmartX.hospital.Maternity.service.BreastfeedingSupportService;
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


@CrossOrigin(value = "*")
@RestController
@RequestMapping("/api/breastfeeding-support")
public class BreastfeedingSupportController {

    @Autowired
    private BreastfeedingSupportService breastfeedingSupportService;

    @PostMapping
    public ResponseEntity<BreastfeedingSupportDTO> createBreastfeedingSupport(@RequestBody BreastfeedingSupportDTO breastfeedingSupportDTO) {
        BreastfeedingSupportDTO createdSupport = breastfeedingSupportService.createBreastfeedingSupport(breastfeedingSupportDTO);
        return ResponseEntity.ok(createdSupport);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BreastfeedingSupportDTO> getBreastfeedingSupportById(@PathVariable Long id) {
        BreastfeedingSupportDTO support = breastfeedingSupportService.getBreastfeedingSupportById(id);
        return support != null ? ResponseEntity.ok(support) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<BreastfeedingSupportDTO>> getAllBreastfeedingSupports() {
        List<BreastfeedingSupportDTO> supportList = breastfeedingSupportService.getAllBreastfeedingSupports();
        return ResponseEntity.ok(supportList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBreastfeedingSupport(@PathVariable Long id) {
        breastfeedingSupportService.deleteBreastfeedingSupport(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<BreastfeedingSupportDTO> updateBreastfeedingSupport(@PathVariable Long id, @RequestBody BreastfeedingSupportDTO breastfeedingSupportDTO) {
        BreastfeedingSupportDTO updatedSupport = breastfeedingSupportService.updateBreastfeedingSupport(id, breastfeedingSupportDTO);
        return updatedSupport != null ? ResponseEntity.ok(updatedSupport) : ResponseEntity.notFound().build();
    }
}
/*------------------Sufiyan_Shaikh_BreastfeedingSupportController_08_10_2024_End---------------------------*/

