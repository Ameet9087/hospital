package com.LPHSmartX.hospital.DocterPrescription.Service;

import java.util.List;


import com.LPHSmartX.hospital.DocterPrescription.DTO.MedicineTimingDTO;

public interface MedicineTimingService {

	void createMedicineTiming(MedicineTimingDTO medicineTimingDTO);
	List<MedicineTimingDTO> getAllMedicineTiming();
	MedicineTimingDTO getMedicineTimingById(int id);
	void updateMedicineTiming(int id, MedicineTimingDTO medicineTimingDTO);
	void deleteMedicineTiming(int id);
}
