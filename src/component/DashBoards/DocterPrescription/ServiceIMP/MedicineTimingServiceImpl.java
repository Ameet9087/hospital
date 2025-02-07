package com.LPHSmartX.hospital.DocterPrescription.ServiceIMP;

 
import java.util.List;   
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LPHSmartX.hospital.DocterPrescription.DTO.MedicineTimingDTO;
import com.LPHSmartX.hospital.DocterPrescription.DTO.PharmacyItemDosageDTO;
import com.LPHSmartX.hospital.DocterPrescription.Entity.MedicineTiming;
 import com.LPHSmartX.hospital.DocterPrescription.Entity.PharmacyItemDosage;
import com.LPHSmartX.hospital.DocterPrescription.Repository.MedicineTimingRepository;
 import com.LPHSmartX.hospital.DocterPrescription.Repository.PharmacyItemDosageRepository;
import com.LPHSmartX.hospital.DocterPrescription.Service.MedicineTimingService;
import com.LPHSmartX.hospital.Pharmacy.dto.PharmacyItemMasterDTO;
 
@Service
public class MedicineTimingServiceImpl implements MedicineTimingService {

	   @Autowired
	    private MedicineTimingRepository medicineTimingRepository;

	    @Autowired
	    private PharmacyItemDosageRepository pharmacyItemDosageRepository;

	    @Override
	    public void createMedicineTiming(MedicineTimingDTO medicineTimingDTO) {
	        // Convert DTO to Entity
	        MedicineTiming medicineTiming = mapToEntity(medicineTimingDTO);

	        // Fetch all PharmacyItemDosage based on the IDs provided in the DTO
	        List<PharmacyItemDosage> pharmacyItemDosages = medicineTimingDTO.getPharmacyItemDosages().stream()
	                .map(dto -> pharmacyItemDosageRepository.findById(dto.getId()).orElseThrow(() -> 
	                    new RuntimeException("PharmacyItemDosage not found with ID: " + dto.getId())))
	                .collect(Collectors.toList());


	        // Set the fetched PharmacyItemDosages to the MedicineTiming entity
	        medicineTiming.setPharmacyItemDosages(pharmacyItemDosages);

	        // Save the MedicineTiming entity
	        medicineTimingRepository.save(medicineTiming);
	    }

	    @Override
	    public List<MedicineTimingDTO> getAllMedicineTiming() {
	        List<MedicineTiming> medicineTimings = medicineTimingRepository.findAll();
	        return medicineTimings.stream()
	                .map(this::mapToDto)
	                .collect(Collectors.toList());
	    }

	    @Override
	    public MedicineTimingDTO getMedicineTimingById(int id) {
	        MedicineTiming medicineTiming = medicineTimingRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("MedicineTiming not found"));
	        return mapToDto(medicineTiming);
	    }

	    @Override
	    public void updateMedicineTiming(int id, MedicineTimingDTO medicineTimingDTO) {
	        MedicineTiming existingMedicineTiming = medicineTimingRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("MedicineTiming not found with ID: " + id));

	        // Update fields in the existing MedicineTiming
	        existingMedicineTiming.setMorning(medicineTimingDTO.getMorning());
	        existingMedicineTiming.setAfternoon(medicineTimingDTO.getAfternoon());
	        existingMedicineTiming.setEvening(medicineTimingDTO.getEvening());
	        existingMedicineTiming.setNight(medicineTimingDTO.getNight());

	        // Update associated PharmacyItemDosages
	        List<PharmacyItemDosage> pharmacyItemDosages = medicineTimingDTO.getPharmacyItemDosages().stream()
	            .map(dto -> pharmacyItemDosageRepository.findById(dto.getId()).orElseThrow(() -> 
	                new RuntimeException("PharmacyItemDosage not found with ID: " + dto.getId())))
	            .collect(Collectors.toList());

	        // Set the new PharmacyItemDosages
	        existingMedicineTiming.setPharmacyItemDosages(pharmacyItemDosages);

	        // Save the updated MedicineTiming
	        medicineTimingRepository.save(existingMedicineTiming);
	    }

	    @Override
	    public void deleteMedicineTiming(int id) {
	        MedicineTiming medicineTiming = medicineTimingRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("MedicineTiming not found"));
	        medicineTimingRepository.delete(medicineTiming);
	    }

	 // Convert DTO to Entity
	    private MedicineTiming mapToEntity(MedicineTimingDTO medicineTimingDTO) {
	        MedicineTiming medicineTiming = new MedicineTiming();
	        medicineTiming.setMorning(medicineTimingDTO.getMorning());
	        medicineTiming.setMorningBeforeMeal(medicineTimingDTO.getMorningBeforeMeal());
	        medicineTiming.setMorningAfterMeal(medicineTimingDTO.getMorningAfterMeal());

	        medicineTiming.setAfternoon(medicineTimingDTO.getAfternoon());
	        medicineTiming.setAfternoonBeforeMeal(medicineTimingDTO.getAfternoonBeforeMeal());
	        medicineTiming.setAfternoonAfterMeal(medicineTimingDTO.getAfternoonAfterMeal());

	        medicineTiming.setEvening(medicineTimingDTO.getEvening());
	        medicineTiming.setEveningBeforeMeal(medicineTimingDTO.getEveningBeforeMeal());
	        medicineTiming.setEveningAfterMeal(medicineTimingDTO.getEveningAfterMeal());

	        medicineTiming.setNight(medicineTimingDTO.getNight());
	        medicineTiming.setNightBeforeMeal(medicineTimingDTO.getNightBeforeMeal());
	        medicineTiming.setNightAfterMeal(medicineTimingDTO.getNightAfterMeal());

	        // Convert PharmacyItemDosageDTO list to PharmacyItemDosage entity list
	        List<PharmacyItemDosage> pharmacyItemDosages = medicineTimingDTO.getPharmacyItemDosages().stream()
	            .map(dto -> {
	                PharmacyItemDosage pharmacyItemDosage = new PharmacyItemDosage();
	                pharmacyItemDosage.setId(dto.getId());
	                return pharmacyItemDosage;
	            })
	            .collect(Collectors.toList());

	        medicineTiming.setPharmacyItemDosages(pharmacyItemDosages);
	        
	        return medicineTiming;
	    }

	    // Convert Entity to DTO
	    private MedicineTimingDTO mapToDto(MedicineTiming medicineTiming) {
	    	    MedicineTimingDTO medicineTimingDTO = new MedicineTimingDTO();
	    	    medicineTimingDTO.setId(medicineTiming.getId());

	    	    medicineTimingDTO.setMorning(medicineTiming.getMorning());
	    	    medicineTimingDTO.setMorningBeforeMeal(medicineTiming.getMorningBeforeMeal());
	    	    medicineTimingDTO.setMorningAfterMeal(medicineTiming.getMorningAfterMeal());

	    	    medicineTimingDTO.setAfternoon(medicineTiming.getAfternoon());
	    	    medicineTimingDTO.setAfternoonBeforeMeal(medicineTiming.getAfternoonBeforeMeal());
	    	    medicineTimingDTO.setAfternoonAfterMeal(medicineTiming.getAfternoonAfterMeal());

	    	    medicineTimingDTO.setEvening(medicineTiming.getEvening());
	    	    medicineTimingDTO.setEveningBeforeMeal(medicineTiming.getEveningBeforeMeal());
	    	    medicineTimingDTO.setEveningAfterMeal(medicineTiming.getEveningAfterMeal());

	    	    medicineTimingDTO.setNight(medicineTiming.getNight());
	    	    medicineTimingDTO.setNightBeforeMeal(medicineTiming.getNightBeforeMeal());
	    	    medicineTimingDTO.setNightAfterMeal(medicineTiming.getNightAfterMeal());

	     // Map PharmacyItemDosages and fetch the itemName from PharmacyItemMaster
	        List<PharmacyItemDosageDTO> pharmacyItemDosageDTOs = medicineTiming.getPharmacyItemDosages().stream()
	            .map(pharmacyItemDosage -> {
	                PharmacyItemDosageDTO dto = new PharmacyItemDosageDTO();
	                dto.setId(pharmacyItemDosage.getId());
	                dto.setDosage(pharmacyItemDosage.getDosage());

	                // Fetch itemName from PharmacyItemMaster
	                if (pharmacyItemDosage.getPharmacyItemMaster() != null) {
	                    PharmacyItemMasterDTO pharmacyItemMasterDTO = new PharmacyItemMasterDTO();
	                    pharmacyItemMasterDTO.setPharmacyItemMasterId(pharmacyItemDosage.getPharmacyItemMaster().getPharmacyItemMasterId());
	                    pharmacyItemMasterDTO.setItemName(pharmacyItemDosage.getPharmacyItemMaster().getItemName());
	                    dto.setPharmacyItemMasterDTO(pharmacyItemMasterDTO);
	                }

	                return dto;
	            })
	            .collect(Collectors.toList());


	        medicineTimingDTO.setPharmacyItemDosages(pharmacyItemDosageDTOs);

	        return medicineTimingDTO;
	    }
	}
