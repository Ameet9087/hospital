package com.LPHSmartX.hospital.Maternity.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class LabourListDTO {
    private Long laborId;  
    private int inPatientId;
    private String admissionDate;
    private String roomNumber;  
    private String deliveryType;  
    private String instrumentUsed;  
    private String doctorNotes;  
    private String motherConditionPostDelivery;  
    private String babyConditionPostDelivery;  
    private Long staffManagementId;  
}
