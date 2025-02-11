package com.LPHSmartX.hospital.DocterPrescription.DTO;

import jakarta.persistence.OrderColumn;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import com.LPHSmartX.hospital.DocterPrescription.Entity.Symptom;

@Getter
@Setter
public class CategoryDTO {
    private Long symptomCategoryId;
    private String category;

    private List<SymptomDTO> symptoms = new ArrayList<>() ;
    
    // Constructors
    public CategoryDTO() {
        this.symptoms = new ArrayList<>();
    }

    public CategoryDTO(Long symptomCategoryId, String category) {
        this.symptomCategoryId = symptomCategoryId;
        this.category = category;
        this.symptoms = new ArrayList<>();
    }

    // Getter and Setter for symptoms
    public List<SymptomDTO> getSymptoms() { // Changed to match the field name
        return symptoms != null ? symptoms : new ArrayList<>();
    }

    public void setSymptoms(List<SymptomDTO> symptoms) { // Changed to match the field name
        this.symptoms = symptoms != null ? symptoms : new ArrayList<>();
    }
}
