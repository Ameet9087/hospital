package com.LPHSmartX.hospital.Maternity.entity;

import java.util.Date;

import com.LPHSmartX.hospital.Patient.entity.InPatient;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "antenatal_care")
public class AntenatalCare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "anc_id")
    private Long ancId;  // Unique identifier for each antenatal care visit

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private InPatient patient;  // Foreign key from the Patients table
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_management_id") // Foreign key to LaborStaffManagement
    private LaborStaffManagement staffManagement;

    private String visitDate;  // Date of the antenatal care visit

    private Integer gestationalAge;  // Gestational age in weeks at the time of the visit

    private Double babyweight;
    private Double weight;  // Weight of the patient during the visit

    private String bloodPressure;  // Blood pressure reading (e.g., 120/80)

    private String urineTestResult;  // Urine test result (can be null)


    private String ultrasoundReport;  // Ultrasound findings (if any)

   
    private String pregnancyRiskLevel;  // Risk classification (e.g., low, moderate, high)


    private String medicationsPrescribed;  // Medications prescribed (if any)

 
    private String nextVisitDate;  // Scheduled date for the next antenatal care visit
    
    private String Doctorname;

    private String doctorNotes;  // Doctor’s additional notes
}
