package com.LPHSmartX.hospital.DocterPrescription.Controller;

import com.LPHSmartX.hospital.DocterPrescription.DTO.CategoryDTO;
import com.LPHSmartX.hospital.DocterPrescription.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/api/symptom-categories") // Base URL for your API endpoints
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Get all symptom categories
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllSymptomCategories() {
        List<CategoryDTO> categories = categoryService.getAllSymptomCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    // Get symptom category by ID
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getSymptomCategoryById(@PathVariable("id") Long id) {
        CategoryDTO category = categoryService.getSymptomCategoryById(id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    // Create a new symptom category
    @PostMapping
    public ResponseEntity<CategoryDTO> createSymptomCategory(@RequestBody CategoryDTO categoryDTO) {
        CategoryDTO createdCategory = categoryService.createSymptomCategory(categoryDTO);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    // Update an existing symptom category
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateSymptomCategory(@PathVariable("id") Long id,
                                                             @RequestBody CategoryDTO categoryDTO) {
        CategoryDTO updatedCategory = categoryService.updateSymptomCategory(id, categoryDTO);
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

    // Delete a symptom category by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSymptomCategory(@PathVariable("id") Long id) {
        categoryService.deleteSymptomCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
