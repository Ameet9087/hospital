package com.LPHSmartX.hospital.Maternity.dto;

import java.util.Date;

import lombok.Data;

@Data
public class BreastfeedingSupportDTO {
    private Long bfSupportId;  
    private int inPatientId;
    private String sessionDate;
    private String latchSuccess;
    private String lactationConsultant;  
    private String consultantNotes;  
}