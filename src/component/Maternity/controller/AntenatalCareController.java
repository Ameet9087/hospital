package com.LPHSmartX.hospital.Maternity.controller;
/*------------------Sufiyan_Shaikh_AntenatalCareController_08_10_2024_Start---------------------------*/

import java.util.List;

import com.LPHSmartX.hospital.Maternity.dto.AntenatalCareDTO;
import com.LPHSmartX.hospital.Maternity.service.AntenatalCareService;
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
@RequestMapping("/api/antenatal-care")
public class AntenatalCareController {

    @Autowired
    private AntenatalCareService antenatalCareService;

    @PostMapping
    public ResponseEntity<AntenatalCareDTO> createAntenatalCare(@RequestBody AntenatalCareDTO antenatalCareDTO) {
        AntenatalCareDTO createdAntenatalCare = antenatalCareService.createAntenatalCare(antenatalCareDTO);
        return ResponseEntity.ok(createdAntenatalCare);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AntenatalCareDTO> getAntenatalCareById(@PathVariable Long id) {
        AntenatalCareDTO antenatalCare = antenatalCareService.getAntenatalCareById(id);
        return antenatalCare != null ? ResponseEntity.ok(antenatalCare) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<AntenatalCareDTO>> getAllAntenatalCares() {
        List<AntenatalCareDTO> antenatalCareList = antenatalCareService.getAllAntenatalCares();
        return ResponseEntity.ok(antenatalCareList);
    }
    @PutMapping("/{id}")
    public ResponseEntity<AntenatalCareDTO> updateAntenatalCare(@PathVariable Long id, @RequestBody AntenatalCareDTO antenatalCareDTO) {
        AntenatalCareDTO updatedAntenatalCare = antenatalCareService.updateAntenatalCare(id, antenatalCareDTO);
        return updatedAntenatalCare != null ? ResponseEntity.ok(updatedAntenatalCare) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAntenatalCare(@PathVariable Long id) {
        antenatalCareService.deleteAntenatalCare(id);
        return ResponseEntity.noContent().build();
    }
}
/*------------------Sufiyan_Shaikh_AntenatalCareController_08_10_2024_End---------------------------*/
