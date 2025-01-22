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
import lombok.Data;

@Entity
@Data
@Table(name = "postnatal_care")
public class PostnatalCare {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long pncId;  // Unique identifier for each postnatal visit

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "patient_id", nullable = false)
	    private InPatient patient;  // Foreign key from the Patients table
	
	    private String visitDate;  // Date of the postnatal care visit

	    private String motherCondition;  // Condition of the mother

	    private String babyCondition;  // Condition of the newborn

	    private String doctorNotes;  // Doctor's observations and recommendations

	    private String nextVisitDate;
	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "staff_management_id") // Foreign key to LaborStaffManagement
	    private LaborStaffManagement staffManagement;

}
