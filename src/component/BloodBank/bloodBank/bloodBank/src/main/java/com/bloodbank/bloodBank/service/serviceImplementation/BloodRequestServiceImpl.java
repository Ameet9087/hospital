package com.bloodbank.bloodBank.service.serviceImplementation;

import java.util.List;
import java.util.stream.Collectors;

import com.bloodbank.bloodBank.exception.ResourceNotFoundExceptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import com.bloodbank.bloodBank.dto.BloodRequestDTO;
import com.bloodbank.bloodBank.exception.ResourceNotFoundException;
import com.bloodbank.bloodBank.entity.BloodRequest;
import com.bloodbank.bloodBank.entity.Doctor;
import com.bloodbank.bloodBank.entity.Hospital;
import com.bloodbank.bloodBank.entity.Patient;
import com.bloodbank.bloodBank.repository.BloodRequestRepository;
import com.bloodbank.bloodBank.repository.DoctorRepository;
import com.bloodbank.bloodBank.repository.HospitalRepository;
import com.bloodbank.bloodBank.repository.PatientRepository;
import com.bloodbank.bloodBank.service.BloodRequestServicee;



@Service
public class BloodRequestServiceImpl implements BloodRequestServicee {


	 @Autowired
	 BloodRequestRepository bloodRequestRepository;
	 
	 @Autowired
	 HospitalRepository hospitalRepository;
	 
	 @Autowired
	 DoctorRepository doctorRepository;
	 
	 @Autowired
	 PatientRepository patientRepository;
	 
	
	public List<BloodRequestDTO> getAllBloodRequest() {
		return bloodRequestRepository.findAll().stream().map(this::convertEntityToDTO).collect(Collectors.toList());
	}
	
	private BloodRequestDTO convertEntityToDTO(BloodRequest bloodRequest)
	{
		BloodRequestDTO bloodRequestDTO=new BloodRequestDTO();
		
		bloodRequestDTO.setRequestId(bloodRequest.getRequestId());
		bloodRequestDTO.setStatus(bloodRequest.getStatus());
		bloodRequestDTO.setRequiredUnits(bloodRequest.getRequiredUnits());
		
		bloodRequestDTO.setRequiredDate(bloodRequest.getRequiredDate());
		bloodRequestDTO.setRequestDate(bloodRequest.getRequestDate());
		bloodRequestDTO.setBloodGroup(bloodRequest.getBloodGroup());
		
		bloodRequestDTO.setContactInformation(bloodRequest.getContactInformation());
		
        bloodRequestDTO.setHsId(bloodRequest.getHospital().getHsId());
		
		bloodRequestDTO.setDoctorId(bloodRequest.getDoctor().getDoctorId());
		
		bloodRequestDTO.setPatientId(bloodRequest.getPatient().getPatientId());
		
		
		
		
		return bloodRequestDTO;
	}

	public BloodRequestDTO createBloodRequest(BloodRequestDTO bloodRequestDTO) {
	    BloodRequest bloodRequest = new BloodRequest();
	    
	    bloodRequest.setRequestId(bloodRequestDTO.getRequestId());
	    bloodRequest.setStatus(bloodRequestDTO.getStatus());
	    bloodRequest.setRequiredUnits(bloodRequestDTO.getRequiredUnits());
	    
	    bloodRequest.setRequiredDate(bloodRequestDTO.getRequiredDate());
	    bloodRequest.setRequestDate(bloodRequestDTO.getRequestDate());
	    bloodRequest.setBloodGroup(bloodRequestDTO.getBloodGroup());
	    
	    bloodRequest.setContactInformation(bloodRequestDTO.getContactInformation());
	    
	    Hospital hospital = hospitalRepository.findById(bloodRequestDTO.getHsId())
	            .orElseThrow(() -> new ResourceNotFoundExceptions("Hospital not found with id: " + bloodRequestDTO.getHsId()));
	    bloodRequest.setHospital(hospital);
	    
	    Doctor doctor = doctorRepository.findById(bloodRequestDTO.getDoctorId())
	            .orElseThrow(() -> new ResourceNotFoundExceptions("Doctor not found with id: " + bloodRequestDTO.getDoctorId()));
	    bloodRequest.setDoctor(doctor);
	    
	    Patient patient = patientRepository.findById(bloodRequestDTO.getPatientId())
	            .orElseThrow(() -> new ResourceNotFoundExceptions("Patient not found with id: " + bloodRequestDTO.getPatientId()));
	    bloodRequest.setPatient(patient);
	   
	    BloodRequest savedBloodRequest = bloodRequestRepository.save(bloodRequest);
	    
	    return convertEntityToDTO(savedBloodRequest);
	}



	public BloodRequestDTO bloodRequestById(int id) {
		BloodRequest bloodRequest =bloodRequestRepository.findById(id).orElseThrow(() -> new ResourceNotFoundExceptions("BloodRequest not found with id: " + id));
		return convertEntityToDTO(bloodRequest);
	}
	
	public BloodRequestDTO updateBloodRequestById(int id, BloodRequestDTO bloodRequestDTO) {
	    BloodRequest bloodRequest = bloodRequestRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundExceptions("BloodRequest not found with id: " + id));

	    bloodRequest.setBloodGroup(bloodRequestDTO.getBloodGroup());
	    bloodRequest.setStatus(bloodRequestDTO.getStatus());
	    bloodRequest.setRequiredUnits(bloodRequestDTO.getRequiredUnits());
	    bloodRequest.setRequiredDate(bloodRequestDTO.getRequiredDate());
	    bloodRequest.setRequestDate(bloodRequestDTO.getRequestDate());
	    bloodRequest.setContactInformation(bloodRequestDTO.getContactInformation());
	    
	    if(bloodRequestDTO.getRequestId()!=0)
	    {
	    	bloodRequest.setRequestId(bloodRequestDTO.getRequestId());
	    }
	    

	    Hospital hospital = hospitalRepository.findById(bloodRequestDTO.getHsId())
	            .orElseThrow(() -> new ResourceNotFoundExceptions("Hospital not found with id: " + bloodRequestDTO.getHsId()));
	    bloodRequest.setHospital(hospital);

	    Doctor doctor = doctorRepository.findById(bloodRequestDTO.getDoctorId())
	            .orElseThrow(() -> new ResourceNotFoundExceptions("Doctor not found with id: " + bloodRequestDTO.getDoctorId()));
	    bloodRequest.setDoctor(doctor);

	    Patient patient = patientRepository.findById(bloodRequestDTO.getPatientId())
	            .orElseThrow(() -> new ResourceNotFoundExceptions("Patient not found with id: " + bloodRequestDTO.getPatientId()));
	    bloodRequest.setPatient(patient);

	    BloodRequest updatedBloodRequest = bloodRequestRepository.save(bloodRequest);
	    
	    return convertEntityToDTO(updatedBloodRequest);
	}

    public void deleteBloodRequestById(int id) {
    	BloodRequest bloodRequest = bloodRequestRepository.findById(id).orElseThrow(() -> new ResourceNotFoundExceptions("BloodRequest not found with id: " + id));
    	bloodRequestRepository.delete(bloodRequest);
    }
    
 }
