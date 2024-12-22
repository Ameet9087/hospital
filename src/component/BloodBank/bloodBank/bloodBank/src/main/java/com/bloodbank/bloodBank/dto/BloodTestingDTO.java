
package com.bloodbank.bloodBank.dto;

import com.bloodbank.bloodBank.entity.BloodCollection;

import lombok.Data;

@Data
public class BloodTestingDTO {
	private int testId;  // `test_id` field from `BloodTesting`
    private String testType;  // Represents the type of test (e.g., HIV, Hepatitis)
    private String result;  // Test result (e.g., 'Passed', 'Failed')
    private String remarks;  // Additional remarks about the test
    private String testedBy;  // Name of the person who conducted the test

    private BloodCollectionDTO bloodCollection;
}
