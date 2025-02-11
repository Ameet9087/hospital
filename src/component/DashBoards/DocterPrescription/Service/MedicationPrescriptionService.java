package com.LPHSmartX.hospital.DocterPrescription.Service;

import java.util.List;

import com.LPHSmartX.hospital.DocterPrescription.DTO.MedicationPrescriptionDTO;

public interface MedicationPrescriptionService {

	void createMedication(MedicationPrescriptionDTO medicationPrescriptionDTO);
	List<MedicationPrescriptionDTO> getAllMedication();
	MedicationPrescriptionDTO getMedicationById(int medicationPrescriptionId);
	void updateMedication(int medicationPrescriptionId, MedicationPrescriptionDTO medicationPrescriptionDTO);
	void deleteMedication(int medicationPrescriptionId);
}
