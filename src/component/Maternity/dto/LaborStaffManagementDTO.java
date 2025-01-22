package com.LPHSmartX.hospital.Maternity.dto;

import java.time.LocalTime;
import java.util.List;

import lombok.Data;

@Data
public class LaborStaffManagementDTO {
    private Long staffId;  
    private String shiftStartTime;
    private String shiftEndTime;
    private String assignedRole;  
    private String responsibilitiesDescription;  
    private String emergencyResponseTeam;
    private List<Long> antenatalCareIds; // List of antenatal care IDs
    private List<Long> postnatalCareIds;
}
