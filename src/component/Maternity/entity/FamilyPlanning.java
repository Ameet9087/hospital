package com.LPHSmartX.hospital.Maternity.entity;

import java.time.LocalDate;
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
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
@Entity
@Table(name = "family_planning_services")
public class FamilyPlanning {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "fp_service_id")
	    private Long fpServiceId;  // Unique identifier for family planning service

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "patient_id", nullable = false)
	    private InPatient patient;  // Foreign key from the Patients table

	    @Column(name = "counseling_date", nullable = false)
	    private String counselingDate;  // Date of the counseling session

	    @Column(name = "chosen_method", length = 50, nullable = false)
	    private String chosenMethod;  // Method chosen for family planning

	    @Column(name = "prior_contraceptive_history", columnDefinition = "TEXT")
	    private String priorContraceptiveHistory;  // History of previous contraceptive methods

	    @Column(name = "side_effects_discussed", columnDefinition = "TEXT")
	    private String sideEffectsDiscussed;  // Side effects or concerns discussed during the session

	    @Column(name = "patient_consent", nullable = false)
	    private String patientConsent;  // Whether patient consented to the chosen method

	    @Column(name = "doctor_notes", columnDefinition = "TEXT")
	    private String doctorNotes;  // Doctor's notes from the session

	    @Column(name = "next_followup_date")
	    @Temporal(TemporalType.DATE)
	    private String nextFollowupDate;
}
