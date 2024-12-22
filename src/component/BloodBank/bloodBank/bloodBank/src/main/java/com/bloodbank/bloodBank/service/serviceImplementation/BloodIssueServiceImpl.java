package com.bloodbank.bloodBank.service.serviceImplementation;

import java.util.List;
import java.util.stream.Collectors;

import com.bloodbank.bloodBank.exception.ResourceNotFoundExceptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.bloodbank.bloodBank.dto.BloodIssueDTO;
import com.bloodbank.bloodBank.exception.ResourceNotFoundException;
import com.bloodbank.bloodBank.entity.BloodBank;
import com.bloodbank.bloodBank.entity.BloodIssue;
import com.bloodbank.bloodBank.entity.Doctor;
import com.bloodbank.bloodBank.entity.BloodRequest;
import com.bloodbank.bloodBank.entity.Patient;
import com.bloodbank.bloodBank.repository.BloodBankReopository;
import com.bloodbank.bloodBank.repository.BloodIssueRepository;
import com.bloodbank.bloodBank.repository.DoctorRepository;
import com.bloodbank.bloodBank.repository.BloodRequestRepository;
import com.bloodbank.bloodBank.repository.PatientRepository;
import com.bloodbank.bloodBank.service.BloodIssueService;

@Service
public class BloodIssueServiceImpl implements BloodIssueService {


	 @Autowired
	 BloodIssueRepository bloodIssueRepository;
	 
	 @Autowired
	 BloodRequestRepository hospitalRepository;
	 
	 @Autowired
	 DoctorRepository doctorRepository;
	 
	 @Autowired
	 PatientRepository patientRepository;
	 
	 @Autowired
     BloodBankReopository bloodBnkRepository;
	 
	
	public List<BloodIssueDTO> getAllBloodIssue() {
		return bloodIssueRepository.findAll().stream().map(this::convertEntityToDTO).collect(Collectors.toList());
	}
	
	private BloodIssueDTO convertEntityToDTO(BloodIssue bloodIssue)
	{
		BloodIssueDTO bloodIssuetDTO=new BloodIssueDTO();
		
		bloodIssuetDTO.setUnitsIssued(bloodIssue.getUnitsIssued());
		bloodIssuetDTO.setStatus(bloodIssue.getStatus());
		bloodIssuetDTO.setIssueId(bloodIssue.getIssueId());
		
		bloodIssuetDTO.setIssuedBy(bloodIssue.getIssuedBy());
		bloodIssuetDTO.setIssueDate(bloodIssue.getIssueDate());
		bloodIssuetDTO.setBloodGroup(bloodIssue.getBloodGroup());
		
		bloodIssuetDTO.setPatientId(bloodIssue.getPatient().getPatientId());
		bloodIssuetDTO.setDoctorId(bloodIssue.getDoctor().getDoctorId());
		bloodIssuetDTO.setRequestId(bloodIssue.getBloodRequest().getRequestId());
		bloodIssuetDTO.setBloodBankId(bloodIssue.getBloodBank().getBloodBankId());
		
		
		return bloodIssuetDTO;
	}

	public BloodIssueDTO createBloodIssue(BloodIssueDTO bloodIssueDTO) {
	    BloodIssue bloodIssue = new BloodIssue();
	    
	    bloodIssue.setUnitsIssued(bloodIssueDTO.getUnitsIssued());
	    bloodIssue.setStatus(bloodIssueDTO.getStatus());
	    bloodIssue.setIssueId(bloodIssueDTO.getIssueId());
	    bloodIssue.setIssuedBy(bloodIssueDTO.getIssuedBy());
	    bloodIssue.setIssueDate(bloodIssueDTO.getIssueDate());
	    bloodIssue.setBloodGroup(bloodIssueDTO.getBloodGroup());
	    
	  
	    
	    BloodRequest bloodRequest = hospitalRepository.findById(bloodIssueDTO.getRequestId())
	            .orElseThrow(() -> new ResourceNotFoundExceptions("Hospital not found with id: " + bloodIssueDTO.getRequestId()));
	    bloodIssue.setBloodRequest(bloodRequest);
	    
	    Doctor doctor = doctorRepository.findById(bloodIssueDTO.getDoctorId())
	            .orElseThrow(() -> new ResourceNotFoundExceptions("Doctor not found with id: " + bloodIssueDTO.getDoctorId()));
	    bloodIssue.setDoctor(doctor);
	    
	    Patient patient = patientRepository.findById(bloodIssueDTO.getPatientId())
	            .orElseThrow(() -> new ResourceNotFoundExceptions("Patient not found with id: " + bloodIssueDTO.getPatientId()));
	    bloodIssue.setPatient(patient);
	    
	    BloodBank bloodBank =bloodBnkRepository.findById(bloodIssueDTO.getBloodBankId())
	            .orElseThrow(() -> new ResourceNotFoundExceptions("BloodBank not found with id: " + bloodIssueDTO.getBloodBankId()));
	    bloodIssue.setBloodBank(bloodBank);
	   
	    BloodIssue savedBloodIssue = bloodIssueRepository.save(bloodIssue);
	    
	    return convertEntityToDTO(savedBloodIssue);
	}



	public BloodIssueDTO bloodIssueById(int id) {
		BloodIssue bloodIssue =bloodIssueRepository.findById(id).orElseThrow(() -> new ResourceNotFoundExceptions("BloodIssue not found with id: " + id));
		return convertEntityToDTO(bloodIssue);
	}
	
	public BloodIssueDTO updateBloodIssueById(int id, BloodIssueDTO bloodIssueDTO) {
	    BloodIssue bloodIssue = bloodIssueRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundExceptions("BloodIssue not found with id: " + id));
	    
	    bloodIssue.setUnitsIssued(bloodIssueDTO.getUnitsIssued());
	    bloodIssue.setStatus(bloodIssueDTO.getStatus());
	   
	    bloodIssue.setIssuedBy(bloodIssueDTO.getIssuedBy());
	    bloodIssue.setIssueDate(bloodIssueDTO.getIssueDate());
	    bloodIssue.setBloodGroup(bloodIssueDTO.getBloodGroup());

	    if(bloodIssueDTO.getRequestId()!=0)
	    {
	    	bloodIssue.setIssueId(bloodIssueDTO.getRequestId());
	    }
	    

	    BloodRequest bloodRequest = hospitalRepository.findById(bloodIssueDTO.getRequestId())
	            .orElseThrow(() -> new ResourceNotFoundExceptions("Hospital not found with id: " + bloodIssueDTO.getRequestId()));
	    bloodIssue.setBloodRequest(bloodRequest);

	    Doctor doctor = doctorRepository.findById(bloodIssueDTO.getDoctorId())
	            .orElseThrow(() -> new ResourceNotFoundExceptions("Doctor not found with id: " + bloodIssueDTO.getDoctorId()));
	    bloodIssue.setDoctor(doctor);

	    Patient patient = patientRepository.findById(bloodIssueDTO.getPatientId())
	            .orElseThrow(() -> new ResourceNotFoundExceptions("Patient not found with id: " + bloodIssueDTO.getPatientId()));
	    bloodIssue.setPatient(patient);

	    BloodBank bloodBank =bloodBnkRepository.findById(bloodIssueDTO.getBloodBankId())
	            .orElseThrow(() -> new ResourceNotFoundExceptions("BloodBank not found with id: " + bloodIssueDTO.getBloodBankId()));
	    bloodIssue.setBloodBank(bloodBank);
	    
	    BloodIssue updatedBloodIssue = bloodIssueRepository.save(bloodIssue);
	    
	    return convertEntityToDTO(updatedBloodIssue);
	}

    public void deleteBloodIssueById(int id) {
    	BloodIssue bloodIssue = bloodIssueRepository.findById(id).orElseThrow(() -> new ResourceNotFoundExceptions("BloodIssue not found with id: " + id));
    	bloodIssueRepository.delete(bloodIssue);
    }
    
 }
