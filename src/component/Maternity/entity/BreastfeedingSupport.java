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

@Data
@Entity
@Table(name = "breastfeeding_support")
public class BreastfeedingSupport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bfSupportId;  // Unique identifier for breastfeeding session

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private InPatient patient;  // Foreign key from the Patients table

   
    private String sessionDate;  // Date of breastfeeding support session
    private String latchSuccess;  // Whether baby was able to latch successfully

    private String lactationConsultant;  // Name of lactation consultant


    private String consultantNotes;
}