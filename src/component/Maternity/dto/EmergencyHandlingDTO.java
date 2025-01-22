package com.LPHSmartX.hospital.Maternity.dto;

import java.time.LocalTime;

import lombok.Data;

@Data
public class EmergencyHandlingDTO {
    private Long emergencyId;  
    private int inPatientId;
    private String emergencyType;  
    private Long bloodBankRequestId;  
    private String cSectionRequired;  
    private String emergencyStartTime;
    private String emergencyNotes;  
    private String emergencyEndTime;
}