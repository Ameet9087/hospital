package com.LPHSmartX.hospital.Maternity.entity;

import java.time.LocalTime;
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
import lombok.Data;

@Entity
@Data
public class EmergencyHandling {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emergency_id")
    private Long emergencyId; // Unique identifier for each emergency handling record

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private InPatient patient; // Reference to the Patient entity

    @Column(name = "emergency_type", nullable = false)
    private String emergencyType; // Type of emergency (e.g., Maternal distress, Fetal distress)

    @Column(name = "blood_bank_request_id")
    private Long bloodBankRequestId; // Foreign key for blood bank request, if applicable

   
    private String cSectionRequired; // Indicates if a C-section is required

 
    private String emergencyStartTime; // Start time of the emergency handling

    @Column(name = "emergency_notes")
    private String emergencyNotes; // Notes regarding the emergency

    @Column(name = "emergency_end_time")
    private String emergencyEndTime; // End time of the emergency handling
}
