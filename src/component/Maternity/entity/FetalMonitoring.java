package com.LPHSmartX.hospital.Maternity.entity;

import java.time.LocalTime;

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

@Data
@Entity
public class FetalMonitoring {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fetal_monitoring_id")
    private Long fetalMonitoringId; // Unique identifier for fetal monitoring record

    @ManyToOne(fetch = FetchType.LAZY) // Many fetal monitoring records can relate to one patient
    @JoinColumn(name = "patient_id", nullable = false) // Foreign key column
    private InPatient patient; // Reference to the Patient entity

    @Column(name = "monitoring_start_time", nullable = false)
    private String monitoringStartTime; // Start time of the fetal monitoring

    @Column(name = "monitoring_end_time")
    private String monitoringEndTime; // End time of the fetal monitoring

    @Column(name = "fetal_heart_rate", nullable = false)
    private Double fetalHeartRate; // Fetal heart rate during monitoring

    @Column(name = "monitoring_notes")
    private String monitoringNotes;
}
