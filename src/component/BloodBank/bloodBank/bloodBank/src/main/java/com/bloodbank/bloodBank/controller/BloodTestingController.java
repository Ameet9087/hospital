
package com.bloodbank.bloodBank.controller;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.bloodbank.bloodBank.entity.BloodTesting;
import com.bloodbank.bloodBank.service.BloodTestingService;

@CrossOrigin("*")
@RestController
@RequestMapping("/blood-testing")
public class BloodTestingController {

    @Autowired
    private BloodTestingService bloodService;
    
    @PostMapping("/add-test")
    public ResponseEntity<BloodTesting> addtest(@RequestBody BloodTesting newBloodTest) {
        System.out.println(newBloodTest); // Debugging line
        try {
            BloodTesting createdTest = bloodService.addTest(newBloodTest);
            return ResponseEntity.ok(createdTest);
        } catch (Exception e) 
        {
            e.printStackTrace(); 
            // Print stack trace for debugging
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Change to INTERNAL_SERVER_ERROR
        }
    }

    
    // GET: Retrieve all blood tests
    @GetMapping("/get-all-tests")
    public ResponseEntity<List<BloodTesting>> getAllTests() {
        List<BloodTesting> tests = (List<BloodTesting>) bloodService.getallbloodtest();
        return ResponseEntity.ok(tests);
    }

    // GET: Retrieve one blood test by ID
    @GetMapping("/get-one-test/{id}")
    public ResponseEntity<BloodTesting> getOneTest(@PathVariable int id) {
        Optional<BloodTesting> test = bloodService.getoneTest(id);
        if (test.isPresent()) {
            return ResponseEntity.ok(test.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    // PUT: Update blood test by ID
    @PutMapping("/update-test/{id}")
    public ResponseEntity<BloodTesting> updateTest(@PathVariable int id, @RequestBody BloodTesting newTest) {
        try {
            BloodTesting updatedTest = bloodService.update_test(id, newTest);
            return ResponseEntity.ok(updatedTest);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // DELETE: Delete blood test by ID
    @DeleteMapping("/delete-test/{id}")
    public ResponseEntity<String> deleteById(@PathVariable int id) {
        try {
            String response = bloodService.deleteTestbyid(id);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Blood Test not found with ID " + id);
        }
    }
}
