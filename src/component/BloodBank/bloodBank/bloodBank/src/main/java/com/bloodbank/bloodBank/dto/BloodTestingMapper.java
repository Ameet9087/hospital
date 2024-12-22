
package com.bloodbank.bloodBank.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.bloodbank.bloodBank.entity.BloodCollection;
import com.bloodbank.bloodBank.entity.BloodTesting;

public class BloodTestingMapper {
	public static BloodTestingDTO toDto(BloodTesting bloodTesting) {
        BloodTestingDTO dto = new BloodTestingDTO();
        dto.setTestId(bloodTesting.getTest_id());
        dto.setTestType(bloodTesting.getTest_type());
        dto.setResult(bloodTesting.getResult());
        dto.setRemarks(bloodTesting.getRemarks());
        dto.setTestedBy(bloodTesting.getTested_by());
        dto.setBloodCollection(toDto(bloodTesting.getBloodCollection())); // Converting BloodCollection to DTO
        return dto;
    }
	public static BloodCollectionDTO toDto(BloodCollection bloodCollection) {
        BloodCollectionDTO dto = new BloodCollectionDTO();
        dto.setCollectionId(bloodCollection.getCollectionID());
        // Convert List<BloodTesting> to List<BloodTestingDTO>
        List<BloodTestingDTO> testingDTOs = bloodCollection.getBloodTesting().stream()
                .map(BloodTestingMapper::toDto)
                .collect(Collectors.toList());
        dto.setBloodTesting(testingDTOs);
        return dto;
    }
	// Add this method to convert DTO back to entity
    public static BloodTesting toEntity(BloodTestingDTO bloodTestingDTO) {
        BloodTesting bloodTesting = new BloodTesting();
        bloodTesting.setTest_id(bloodTestingDTO.getTestId());
        bloodTesting.setTest_type(bloodTestingDTO.getTestType());
        bloodTesting.setResult(bloodTestingDTO.getResult());
        bloodTesting.setRemarks(bloodTestingDTO.getRemarks());
        bloodTesting.setTested_by(bloodTestingDTO.getTestedBy());
        bloodTesting.setBloodCollection(toEntity(bloodTestingDTO.getBloodCollection())); // Converting BloodCollectionDTO to entity
        return bloodTesting;
    }

    // Add this method to convert BloodCollectionDTO to BloodCollection
    public static BloodCollection toEntity(BloodCollectionDTO bloodCollectionDTO) {
        BloodCollection bloodCollection = new BloodCollection();
        bloodCollection.setCollectionID(bloodCollectionDTO.getCollectionId());
        // Additional fields can be set here if necessary
        return bloodCollection;
    }

}
