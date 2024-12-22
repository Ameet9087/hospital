package com.bloodbank.bloodBank.service.serviceImplementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.bloodbank.bloodBank.dto.BloodBankDTO;
import com.bloodbank.bloodBank.dto.BloodIssueDTO;
import com.bloodbank.bloodBank.exception.ResourceNotFoundExceptions;
import com.bloodbank.bloodBank.entity.BloodBank;
import com.bloodbank.bloodBank.repository.BloodBankReopository;
import com.bloodbank.bloodBank.service.BloodBankService;




@Service
public class BloodBankServiceImpl implements BloodBankService {

	@Autowired
	BloodBankReopository bloodBankRepository;

	public List<BloodBankDTO> getAllBloodBank() {
		return bloodBankRepository.findAll().stream().map(this::convertEntityToDTO).collect(Collectors.toList());
	}

	private BloodBankDTO convertEntityToDTO(BloodBank bloodBank) {
		BloodBankDTO bloodBankDTO = new BloodBankDTO();

		bloodBankDTO.setBloodBanId(bloodBank.getBloodBankId());
		bloodBankDTO.setBloodBankName(bloodBank.getBloodBankName());

		List<BloodIssueDTO> bloodIssueDTOs = bloodBank.getBloodIssue().stream().map(bloodIssue -> {
			BloodIssueDTO bloodIssueDTO = new BloodIssueDTO();

			bloodIssueDTO.setIssueId(bloodIssue.getIssueId());
			bloodIssueDTO.setBloodGroup(bloodIssue.getBloodGroup());
			bloodIssueDTO.setUnitsIssued(bloodIssue.getUnitsIssued());
			bloodIssueDTO.setIssueDate(bloodIssue.getIssueDate());
			bloodIssueDTO.setIssuedBy(bloodIssue.getIssuedBy());
			bloodIssueDTO.setStatus(bloodIssue.getStatus());
			
			bloodIssueDTO.setRequestId(bloodIssue.getBloodRequest().getRequestId());
			bloodIssueDTO.setPatientId(bloodIssue.getPatient().getPatientId());
			bloodIssueDTO.setDoctorId(bloodIssue.getDoctor().getDoctorId());
			bloodIssueDTO.setBloodBankId(bloodIssue.getBloodBank().getBloodBankId());
			return bloodIssueDTO;
		}).collect(Collectors.toList());

		bloodBankDTO.setBloodIssue(bloodIssueDTOs);

		return bloodBankDTO;
	}

	public BloodBankDTO createBloodBank(BloodBankDTO bloodBankDTO) {

		BloodBank bloodBank = new BloodBank();

		bloodBank.setBloodBankId(bloodBankDTO.getBloodBanId());
		bloodBank.setBloodBankName(bloodBankDTO.getBloodBankName());

		BloodBank savedBloodBank = bloodBankRepository.save(bloodBank);

		BloodBankDTO savedBloodBankDTO = convertEntityToDTO(savedBloodBank);

		return savedBloodBankDTO;
	}

	public BloodBankDTO bloodBankById(int id) {
		BloodBank bloodBank = bloodBankRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundExceptions("BloodBank not found with id: " + id));
		return convertEntityToDTO(bloodBank);
	}

	public BloodBankDTO updateBloodBankById(int id, BloodBankDTO bloodBankDTO) {
		BloodBank existingBloodBank = bloodBankRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundExceptions("BloodBank not found with id: " + id));

		existingBloodBank.setBloodBankName(bloodBankDTO.getBloodBankName());

		BloodBank bloodBank = bloodBankRepository.save(existingBloodBank);

		return convertEntityToDTO(bloodBank);
	}

	public void deleteBloodBankById(int id) {
		BloodBank bloodBank = bloodBankRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundExceptions("BloodBank not found with id: " + id));
		bloodBankRepository.delete(bloodBank);
	}

}
