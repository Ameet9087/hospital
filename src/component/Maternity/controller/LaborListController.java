	package com.LPHSmartX.hospital.Maternity.controller;
	/*------------------Sufiyan_Shaikh_LaborListController_08_10_2024_Start---------------------------*/

import java.util.List;

import com.LPHSmartX.hospital.Maternity.dto.LabourListDTO;
import com.LPHSmartX.hospital.Maternity.service.LabourListService;
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
@RequestMapping("/api/labor-list")
public class LaborListController {

    @Autowired
    private LabourListService laborListService;

    @PostMapping
    public ResponseEntity<LabourListDTO> createLaborList(@RequestBody LabourListDTO laborListDTO) {
    	LabourListDTO createdLaborList = laborListService.createLabourList(laborListDTO);
        return ResponseEntity.ok(createdLaborList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LabourListDTO> getLaborListById(@PathVariable Long id) {
    	LabourListDTO laborList = laborListService.getLabourListById(id);
        return laborList != null ? ResponseEntity.ok(laborList) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<LabourListDTO>> getAllLaborLists() {
        List<LabourListDTO> laborList = laborListService.getAllLabourLists();
        return ResponseEntity.ok(laborList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLaborList(@PathVariable Long id) {
        laborListService.deleteLabourList(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<LabourListDTO> updateLaborList(@PathVariable Long id, @RequestBody LabourListDTO laborListDTO) {
        LabourListDTO updatedLaborList = laborListService.updateLabourList(id, laborListDTO);
        return updatedLaborList != null ? ResponseEntity.ok(updatedLaborList) : ResponseEntity.notFound().build();
    }
}
/*------------------Sufiyan_Shaikh_LaborListController_08_10_2024_End---------------------------*/
