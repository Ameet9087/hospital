package com.LPHSmartX.hospital.DocterPrescription.Service;

import com.LPHSmartX.hospital.DocterPrescription.DTO.CategoryDTO;

import java.util.List;

public interface CategoryService {

    List<CategoryDTO> getAllSymptomCategories();

    CategoryDTO getSymptomCategoryById(Long symptomCategoryId);

    CategoryDTO createSymptomCategory(CategoryDTO symptomCategoryDTO);

    CategoryDTO updateSymptomCategory(Long symptomCategoryId, CategoryDTO symptomCategoryDTO);

    void deleteSymptomCategory(Long symptomCategoryId);
}
