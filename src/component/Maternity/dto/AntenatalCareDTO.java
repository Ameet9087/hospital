package com.LPHSmartX.hospital.Maternity.dto;

import java.util.Date;

import lombok.Data;

@Data
public class AntenatalCareDTO {
    private Long ancId;  
    private int inPatientId;
    private Long staffManagementId;  
    private String visitDate;
    private Integer gestationalAge;  
    private Double weight;  
    private String bloodPressure;  
    private String urineTestResult;  
    private String ultrasoundReport;  
    private String pregnancyRiskLevel;  
    private String medicationsPrescribed;  
    private String nextVisitDate;
    private String doctorName;  
    private String doctorNotes;  
    private Double babyweight;
}