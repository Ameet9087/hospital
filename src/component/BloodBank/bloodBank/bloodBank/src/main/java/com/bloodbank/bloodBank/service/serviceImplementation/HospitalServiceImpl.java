package com.bloodbank.bloodBank.service.serviceImplementation;

import java.util.List;
import java.util.stream.Collectors;

import com.bloodbank.bloodBank.exception.ResourceNotFoundExceptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import com.bloodbank.bloodBank.dto.BloodRequestDTO;
import com.bloodbank.bloodBank.dto.HospitalDTO;
import com.bloodbank.bloodBank.exception.ResourceNotFoundException;
import com.bloodbank.bloodBank.entity.Hospital;
import com.bloodbank.bloodBank.repository.HospitalRepository;
import com.bloodbank.bloodBank.service.HospitalService;


@Service
public class HospitalServiceImpl implements HospitalService {

	@Autowired
	HospitalRepository hospitalRepository;

	public List<HospitalDTO> getAllHospital() {
		return hospitalRepository.findAll().stream().map(this::convertEntityToDTO).collect(Collectors.toList());
	}

	private HospitalDTO convertEntityToDTO(Hospital hospital) {
		HospitalDTO hospitalDTO = new HospitalDTO();

		hospitalDTO.setHsName(hospital.getHsName());
		hospitalDTO.setHsId(hospital.getHsId());

		List<BloodRequestDTO> bloodRequestDTOs = hospital.getBloodRequest().stream().map(bloodRequest -> {
			BloodRequestDTO bloodRequestDTO = new BloodRequestDTO();
			bloodRequestDTO.setRequestId(bloodRequest.getRequestId()); // Set requestId here
		//	bloodRequestDTO.setPatientName(bloodRequest.getPatientName());
			bloodRequestDTO.setBloodGroup(bloodRequest.getBloodGroup());
			bloodRequestDTO.setRequiredUnits(bloodRequest.getRequiredUnits());
			bloodRequestDTO.setRequestDate(bloodRequest.getRequestDate());
			bloodRequestDTO.setRequiredDate(bloodRequest.getRequiredDate());
			bloodRequestDTO.setStatus(bloodRequest.getStatus());
			bloodRequestDTO.setContactInformation(bloodRequest.getContactInformation());

			return bloodRequestDTO;
		}).collect(Collectors.toList());

		hospitalDTO.setBloodRequest(bloodRequestDTOs);

		return hospitalDTO;
	}

	public HospitalDTO createHospital(HospitalDTO hospitalDTO) {

		Hospital hospital = new Hospital();
		
		hospital.setHsId(hospitalDTO.getHsId());
		hospital.setHsName(hospitalDTO.getHsName());

		Hospital savedHospital = hospitalRepository.save(hospital);

		HospitalDTO savedHospitalDTO = convertEntityToDTO(savedHospital);

		return savedHospitalDTO;
	}

	public HospitalDTO hospitalById(int id) {
		Hospital hospital = hospitalRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundExceptions("Hospital not found with id: " + id));
		return convertEntityToDTO(hospital);
	}

	public HospitalDTO updateHospitalById(int id, HospitalDTO hospitalDTO) {
		Hospital existingHospital = hospitalRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundExceptions("Hospital not found with id: " + id));

		existingHospital.setHsName(hospitalDTO.getHsName());

		Hospital hospital = hospitalRepository.save(existingHospital);

		return convertEntityToDTO(hospital);
	}

	public void deleteHospitalById(int id) {
		Hospital hospital = hospitalRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundExceptions("Hospital not found with id: " + id));
		hospitalRepository.delete(hospital);
	}

}
