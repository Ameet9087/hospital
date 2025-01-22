package com.LPHSmartX.hospital.Maternity.entity;

import java.time.LocalTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "labor_staff_management")
public class LaborStaffManagement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long staffId; 


    private String shiftStartTime; // Start time of the staff shift

  
    private String shiftEndTime; // End time of the staff shift
 
    private String assignedRole; // Role during the shift (e.g., Labor Nurse, Obstetrician)

    private String responsibilitiesDescription; // Responsibilities during the shift

    private String emergencyResponseTeam; // Indicates if part of the emergency response team
    @OneToMany(mappedBy = "staffManagement", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AntenatalCare> antenatalCares; // List of antenatal care visits handled by staff

    @OneToMany(mappedBy = "staffManagement", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PostnatalCare> postnatalCares;
}
   

