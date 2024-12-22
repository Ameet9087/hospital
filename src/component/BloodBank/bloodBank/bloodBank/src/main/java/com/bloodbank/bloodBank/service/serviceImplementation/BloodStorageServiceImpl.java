package com.bloodbank.bloodBank.service.serviceImplementation;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bloodbank.bloodBank.dto.BloodStorageDTO;
import com.bloodbank.bloodBank.entity.BloodStorage;
import com.bloodbank.bloodBank.entity.BloodTesting;
import com.bloodbank.bloodBank.repository.BloodStorageRepository;
import com.bloodbank.bloodBank.repository.BloodTestingRepository;
import com.bloodbank.bloodBank.service.BloodStorageService;
import com.bloodbank.bloodBank.mapper.BloodStorageMapper;

import jakarta.transaction.Transactional;

@Service
public class BloodStorageServiceImpl implements BloodStorageService{

	@Autowired
	BloodStorageRepository bloodStorageRepository;
	
	@Autowired
	BloodTestingRepository bloodTestingRepository;
	
	@Override
	public BloodStorageDTO addToBloodStorage(BloodStorageDTO bloodStorageDTO) {
	    BloodStorage bloodStorage = new BloodStorage();
	    bloodStorage.setStoragedate(bloodStorageDTO.getStoragedate());
	    bloodStorage.setBloodgroup(bloodStorageDTO.getBloodgroup());
	    bloodStorage.setVolume(bloodStorageDTO.getVolume());
	    bloodStorage.setExpirydate(bloodStorageDTO.getExpirydate());
	    bloodStorage.setStoragelocation(bloodStorageDTO.getStoragelocation());
	    bloodStorage.setStatus(bloodStorageDTO.getStatus());

	    // Find the associated BloodTesting by ID
	    BloodTesting bloodTesting = bloodTestingRepository.findById(bloodStorageDTO.getTest_id())
	            .orElseThrow(() -> new RuntimeException("BloodTesting not found"));

	    bloodStorage.setBloodTesting(bloodTesting);

	    // Save the blood storage entity
	    BloodStorage savedBloodStorage = bloodStorageRepository.save(bloodStorage);
	    
	    // Convert saved entity back to DTO
	    BloodStorageDTO savedBloodStorageDTO = new BloodStorageDTO();
	    savedBloodStorageDTO.setStoragedate(savedBloodStorage.getStoragedate());
	    savedBloodStorageDTO.setBloodgroup(savedBloodStorage.getBloodgroup());
	    savedBloodStorageDTO.setVolume(savedBloodStorage.getVolume());
	    savedBloodStorageDTO.setExpirydate(savedBloodStorage.getExpirydate());
	    savedBloodStorageDTO.setStoragelocation(savedBloodStorage.getStoragelocation());
	    savedBloodStorageDTO.setStatus(savedBloodStorage.getStatus());
	    savedBloodStorageDTO.setTest_id(savedBloodStorage.getBloodTesting().getTest_id()); // Adjust if the method name is different

	    return savedBloodStorageDTO;
	}


	@Override
	public BloodStorageDTO updateBloodStorage(BloodStorageDTO bloodstorage, int storage_id) {
	    Optional<BloodStorage> existingBloodStorageOpt = bloodStorageRepository.findById(storage_id);
	    
	    if (existingBloodStorageOpt.isPresent()) {
	        BloodStorage existingBloodStorage = existingBloodStorageOpt.get();

	        // Update fields
	        existingBloodStorage.setStoragedate(bloodstorage.getStoragedate());
	        existingBloodStorage.setBloodgroup(bloodstorage.getBloodgroup());
	        existingBloodStorage.setVolume(bloodstorage.getVolume());
	        existingBloodStorage.setExpirydate(bloodstorage.getExpirydate());
	        existingBloodStorage.setStoragelocation(bloodstorage.getStoragelocation());
	        existingBloodStorage.setStatus(bloodstorage.getStatus());

	        // Save the updated entity
	        BloodStorage updatedStorage = bloodStorageRepository.save(existingBloodStorage);
	        
	        // Convert to DTO and return
	        return BloodStorageMapper.toDTO(updatedStorage);
	    }

	    return null; // or throw new BloodStorageNotFoundException(storage_id);
	}
	@Override
	public List<BloodStorageDTO> allBloodStorage() {
	    // Fetch all BloodStorage entities
	    List<BloodStorage> bloodStorages = bloodStorageRepository.findAll();
	    
	    // Convert each BloodStorage entity to BloodStorageDTO
	    return bloodStorages.stream()
	            .map(bloodStorage -> {
	                BloodStorageDTO dto = new BloodStorageDTO();
	                dto.setStorage_id(bloodStorage.getStorage_id());
	                dto.setStoragedate(bloodStorage.getStoragedate());
	                dto.setBloodgroup(bloodStorage.getBloodgroup());
	                dto.setVolume(bloodStorage.getVolume());
	                dto.setExpirydate(bloodStorage.getExpirydate());
	                dto.setStoragelocation(bloodStorage.getStoragelocation());
	                dto.setStatus(bloodStorage.getStatus());
	                dto.setTest_id(bloodStorage.getBloodTesting().getTest_id()); // Adjust if necessary
	                return dto;
	            })
	            .collect(Collectors.toList());
	}


	@Override
	public BloodStorageDTO getBloodStorage(int storage_id) {
	    BloodStorage bloodStorage = bloodStorageRepository.findById(storage_id)
	            .orElseThrow(() -> new RuntimeException("BloodStorage not found with ID: " + storage_id));

	    // Convert to DTO
	    BloodStorageDTO dto = new BloodStorageDTO();
	    dto.setStorage_id(bloodStorage.getStorage_id());
	    dto.setStoragedate(bloodStorage.getStoragedate());
	    dto.setBloodgroup(bloodStorage.getBloodgroup());
	    dto.setVolume(bloodStorage.getVolume());
	    dto.setExpirydate(bloodStorage.getExpirydate());
	    dto.setStoragelocation(bloodStorage.getStoragelocation());
	    dto.setStatus(bloodStorage.getStatus());
	    dto.setTest_id(bloodStorage.getBloodTesting().getTest_id());

	    return dto;
	}


    @Transactional
	@Override
	public void deletebyid(int storage_id) {
	
	
	    bloodStorageRepository.deleteByStorageId(storage_id);

	   
	}
	





	

}

/* Ravindra_Sanap_BloodStorageServiceImpl.java_24_09_2024_End */

