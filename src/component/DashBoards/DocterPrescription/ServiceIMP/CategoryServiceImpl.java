package com.LPHSmartX.hospital.DocterPrescription.ServiceIMP;

import com.LPHSmartX.hospital.DocterPrescription.DTO.CategoryDTO;
import com.LPHSmartX.hospital.DocterPrescription.DTO.DiseaseDTO;
import com.LPHSmartX.hospital.DocterPrescription.DTO.SymptomDTO;
import com.LPHSmartX.hospital.DocterPrescription.Entity.Category;
import com.LPHSmartX.hospital.DocterPrescription.Entity.Symptom;
import com.LPHSmartX.hospital.DocterPrescription.Repository.CategoryRepository;
import com.LPHSmartX.hospital.DocterPrescription.Repository.SymptomRepository;
import com.LPHSmartX.hospital.DocterPrescription.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SymptomRepository symptomRepository;

    @Override
    public List<CategoryDTO> getAllSymptomCategories() {
        List<Category> symptomCategories = categoryRepository.findAll();
        return symptomCategories.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    @Override
    public CategoryDTO getSymptomCategoryById(Long symptomCategoryId) {
        Category symptomCategory = categoryRepository.findById(symptomCategoryId)
                .orElseThrow(() -> new RuntimeException("Symptom category not found with ID: " + symptomCategoryId));

        return convertToDTO(symptomCategory);  // Assuming the convertToDTO method exists in your class
    }

//    @Override
//    public CategoryDTO createSymptomCategory(CategoryDTO symptomCategoryDTO) {
//        // Create a new Category entity
//        Category symptomCategory = new Category();
//        symptomCategory.setCategory(symptomCategoryDTO.getCategory());
//
//        // If there are symptoms in the DTO, associate them with the Category
//        if (symptomCategoryDTO.getSymptoms() != null) {
//            List<Symptom> symptoms = symptomCategoryDTO.getSymptoms().stream()
//                    .map(symptomDTO -> symptomRepository.findById(symptomDTO.getSymptomId())
//                            .orElseThrow(() -> new RuntimeException("Symptom not found with ID: " + symptomDTO.getSymptomId())))
//                    .collect(Collectors.toList());
//            symptomCategory.setSymptoms(symptoms); // Assuming Category has a list of Symptom
//        }
//
//        // Save the Category entity to the repository
//        Category savedSymptomCategory = categoryRepository.save(symptomCategory);
//
//        // Convert the saved Category entity to DTO and return
//        return convertToDTO(savedSymptomCategory);
//    }
    
//    @Override
//    public CategoryDTO createSymptomCategory(CategoryDTO symptomCategoryDTO) {
//        // Create a new Category entity
//        Category symptomCategory = new Category();
//        symptomCategory.setCategory(symptomCategoryDTO.getCategory());
//
//        // If there are symptoms in the DTO, associate them with the Category
//        if (symptomCategoryDTO.getSymptoms() != null) {
//            List<Symptom> symptoms = new ArrayList<>();
//            
//            for (SymptomDTO symptomDTO : symptomCategoryDTO.getSymptoms()) {
//                // Check if the symptom already exists in the database
//                Symptom symptom = symptomRepository.findById(symptomDTO.getSymptomId())
//                        .orElseGet(() -> {
//                            // If not found, create a new symptom and save it
//                            Symptom newSymptom = new Symptom();
//                            newSymptom.setSymptomsName(symptomDTO.getSymptomsName());
//                            return symptomRepository.save(newSymptom);
//                        });
//                symptoms.add(symptom); // Add the symptom (either existing or newly created)
//            }
//            
//            symptomCategory.setSymptoms(symptoms); // Set symptoms to the category
//        }
//
//        // Save the Category entity to the repository
//        Category savedSymptomCategory = categoryRepository.save(symptomCategory);
//
//        // Convert the saved Category entity to DTO and return
//        return convertToDTO(savedSymptomCategory);
//    }
    
    @Override
    public CategoryDTO createSymptomCategory(CategoryDTO symptomCategoryDTO) {
        // Create a new Category entity
        Category symptomCategory = new Category();
        symptomCategory.setCategory(symptomCategoryDTO.getCategory());

        // If there are symptoms in the DTO, associate them with the Category
        if (symptomCategoryDTO.getSymptoms() != null) {
            List<Symptom> symptoms = new ArrayList<>();
            
            for (SymptomDTO symptomDTO : symptomCategoryDTO.getSymptoms()) {
                Symptom symptom = null;
                
                // Check if symptomId is present, if not, create a new symptom
                if (symptomDTO.getSymptomId() != null) {
                    symptom = symptomRepository.findById(symptomDTO.getSymptomId())
                            .orElseThrow(() -> new RuntimeException("Symptom not found with ID: " + symptomDTO.getSymptomId()));
                } else {
                    // If symptomId is null, create a new symptom
                    symptom = new Symptom();
                    symptom.setSymptomsName(symptomDTO.getSymptomsName());
                    symptom = symptomRepository.save(symptom); // Save new symptom
                }
                
                symptoms.add(symptom); // Add the symptom (either existing or newly created)
            }
            
            symptomCategory.setSymptoms(symptoms); // Set symptoms to the category
        }

        // Save the Category entity to the repository
        Category savedSymptomCategory = categoryRepository.save(symptomCategory);

        // Convert the saved Category entity to DTO and return
        return convertToDTO(savedSymptomCategory);
    }



    @Override
    public CategoryDTO updateSymptomCategory(Long symptomCategoryId, CategoryDTO symptomCategoryDTO) {
        Category symptomCategory = categoryRepository.findById(symptomCategoryId)
                .orElseThrow(() -> new RuntimeException("Symptom category not found"));

        symptomCategory.setCategory(symptomCategoryDTO.getCategory());
        // Update the symptom category
        Category updatedSymptomCategory = categoryRepository.save(symptomCategory);

        // Convert the updated entity to DTO and return
        return convertToDTO(updatedSymptomCategory);
    }

    @Override
    public void deleteSymptomCategory(Long symptomCategoryId) {
        Category symptomCategory = categoryRepository.findById(symptomCategoryId)
                .orElseThrow(() -> new RuntimeException("Symptom category not found"));

        // Delete the symptom category
        categoryRepository.delete(symptomCategory);
    }

    // Convert Category entity to CategoryDTO
    private CategoryDTO convertToDTO(Category category) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setSymptomCategoryId(category.getSymptomCategoryId());
        categoryDTO.setCategory(category.getCategory());

        // Convert the List of Symptoms into List of SymptomDTO
        List<SymptomDTO> symptomDTOs = category.getSymptoms().stream()
                .map(this::convertToSymptomDTO)
                .collect(Collectors.toList());
        categoryDTO.setSymptoms(symptomDTOs);

        return categoryDTO;
    }

    // Convert Symptom entity to SymptomDTO
    private SymptomDTO convertToSymptomDTO(Symptom symptom) {
        // Create a new SymptomDTO instance
        SymptomDTO symptomDTO = new SymptomDTO();
        symptomDTO.setSymptomId(symptom.getSymptomId());
        symptomDTO.setSymptomsName(symptom.getSymptomsName());
//        symptomDTO.setCategory(symptom.getCategory());

        // Add logic to set the disease list if necessary
        List<DiseaseDTO> diseaseDTOs = symptom.getDiseases().stream()
                .map(disease -> {
                    DiseaseDTO diseaseDTO = new DiseaseDTO();
                    diseaseDTO.setDiseaseId(disease.getDiseaseId());
                    diseaseDTO.setName(disease.getName());
                    return diseaseDTO;
                })
                .collect(Collectors.toList());

        symptomDTO.setDisease(diseaseDTOs);

        return symptomDTO;
    }

}
