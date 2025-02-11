package com.LPHSmartX.hospital.DocterPrescription.Controller;
 
import com.LPHSmartX.hospital.DocterPrescription.DTO.MedicineTimingDTO;
import com.LPHSmartX.hospital.DocterPrescription.Service.MedicineTimingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicine-timings")
public class MedicineTimingController {

    @Autowired
    private MedicineTimingService medicineTimingService;

    // **Create Medicine Timing**
    @PostMapping
    public ResponseEntity<String> createMedicineTiming(@RequestBody MedicineTimingDTO medicineTimingDTO) {
        medicineTimingService.createMedicineTiming(medicineTimingDTO);
        return ResponseEntity.ok("Medicine Timing created successfully.");
    }

    // **Get All Medicine Timings**
    @GetMapping
    public ResponseEntity<List<MedicineTimingDTO>> getAllMedicineTiming() {
        return ResponseEntity.ok(medicineTimingService.getAllMedicineTiming());
    }

    // **Get Medicine Timing by ID**
    @GetMapping("/{id}")
    public ResponseEntity<MedicineTimingDTO> getMedicineTimingById(@PathVariable int id) {
        return ResponseEntity.ok(medicineTimingService.getMedicineTimingById(id));
    }

    // **Update Medicine Timing**
    @PutMapping("/{id}")
    public ResponseEntity<String> updateMedicineTiming(@PathVariable int id, @RequestBody MedicineTimingDTO medicineTimingDTO) {
        medicineTimingService.updateMedicineTiming(id, medicineTimingDTO);
        return ResponseEntity.ok("Medicine Timing updated successfully.");
    }

    // **Delete Medicine Timing**
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMedicineTiming(@PathVariable int id) {
        medicineTimingService.deleteMedicineTiming(id);
        return ResponseEntity.ok("Medicine Timing deleted successfully.");
    }
}

