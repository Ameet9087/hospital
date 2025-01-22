package com.LPHSmartX.hospital.Maternity.dto;

import java.time.LocalTime;

import lombok.Data;

@Data
public class FetalMonitoringDTO {
    private Long fetalMonitoringId;  
    private int inPatientId;
    private String monitoringStartTime;
    private String monitoringEndTime;
    private Double fetalHeartRate;  
    private String monitoringNotes;  
}