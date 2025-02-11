package com.LPHSmartX.hospital.DocterPrescription.Controller;

import com.LPHSmartX.hospital.DocterPrescription.DTO.TakeManySymtemsDTO;
import com.LPHSmartX.hospital.DocterPrescription.Service.TakeManySymtemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(value = "*")
@RestController
@RequestMapping("/api/takemanysymtems")
public class TakeManySymtemsController {

    @Autowired
    private TakeManySymtemsService takeManySymtemsService;

    @PostMapping
    public ResponseEntity<TakeManySymtemsDTO> createTakeManySymtems(@RequestBody TakeManySymtemsDTO takeManySymtemsDTO) {
        TakeManySymtemsDTO savedDTO = takeManySymtemsService.saveTakeManySymtems(takeManySymtemsDTO);
        return ResponseEntity.ok(savedDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TakeManySymtemsDTO> getTakeManySymtemsById(@PathVariable("id") int takeManySymtemsId) {
        Optional<TakeManySymtemsDTO> takeManySymtemsDTO = takeManySymtemsService.getTakeManySymtemsById(takeManySymtemsId);
        return takeManySymtemsDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<TakeManySymtemsDTO>> getAllTakeManySymtems() {
        List<TakeManySymtemsDTO> takeManySymtemsDTOs = takeManySymtemsService.getAllTakeManySymtems();
        return ResponseEntity.ok(takeManySymtemsDTOs);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTakeManySymtems(@PathVariable("id") int takeManySymtemsId) {
        takeManySymtemsService.deleteTakeManySymtems(takeManySymtemsId);
        return ResponseEntity.noContent().build();
    }
}
