package com.LPHSmartX.hospital.Maternity.dto;

import java.sql.Date;
import java.time.LocalDate;

import lombok.Data;

@Data
public class FamilyPlanningDTO {
    private Long fpServiceId;  
    private int inPatientId;
    private String counselingDate;
    private String chosenMethod;  
    private String priorContraceptiveHistory;  
    private String sideEffectsDiscussed;  
    private String patientConsent;  
    private String doctorNotes;  
    private String nextFollowupDate;
}