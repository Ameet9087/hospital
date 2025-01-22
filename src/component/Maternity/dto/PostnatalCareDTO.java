package com.LPHSmartX.hospital.Maternity.dto;

import java.sql.Date;
import java.time.LocalDate;

import lombok.Data;

@Data
public class PostnatalCareDTO {
    private Long pncId;  
    private int inPatientId;
    private String visitDate;
    private String motherCondition;  
    private String babyCondition;  
    private String doctorNotes;  
    private String nextVisitDate;
    private Long staffManagementId;  
}