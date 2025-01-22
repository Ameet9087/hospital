package com.LPHSmartX.hospital.Maternity.entity;

import java.time.LocalDate;

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
@Table(name = "labour_list")
public class LabourList {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long laborId; // Unique identifier for the labor record

	    @ManyToOne(fetch = FetchType.LAZY) // Many labor records can relate to one patient
	    @JoinColumn(name = "patient_id") // Foreign key to the Patient entity
	    private InPatient patient; // Reference to the Patient entity

	    private String admissionDate; // Date of admission to the labor room
	    private String roomNumber; // Room number where labor took place
	    private String deliveryType; // Type of delivery (e.g., Normal, C-section)
	    private String instrumentUsed; // Instruments used during the delivery (if any)
	    private String doctorNotes; // Notes from the doctor about the delivery
	    private String motherConditionPostDelivery; // Condition of the mother post-delivery
	    private String babyConditionPostDelivery; // Condition of the baby post-delivery
	    
	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "staff_management_id") // Foreign key to LaborStaffManagement
	    private LaborStaffManagement staffManagement;

}
