package com.bloodbank.bloodBank.service;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bloodbank.bloodBank.entity.BloodCollection;
import com.bloodbank.bloodBank.entity.BloodTesting;
import com.bloodbank.bloodBank.repository.BloodCollectionRepository;
import com.bloodbank.bloodBank.repository.BloodTestingRepository;

import jakarta.transaction.Transactional;


@Service
public class BloodTestingService {
	
	@Autowired
	private BloodTestingRepository bloodRepo;
	
	@Autowired
    private BloodCollectionRepository bloodCollectionRepo;


    public BloodTesting addTest(BloodTesting newBloodTest) {
        // Fetch the BloodCollection if it exists
        BloodCollection collection = bloodCollectionRepo.findById(newBloodTest.getBloodCollection().getCollectionID())
                .orElseThrow(() -> new RuntimeException("BloodCollection not found"));
        System.out.println(collection);

        // Set the existing BloodCollection to the newBloodTest
        newBloodTest.setBloodCollection(collection);

        // Now save the BloodTesting entity
        return bloodRepo.save(newBloodTest);
    }
	
	public Optional<BloodTesting> getoneTest(int id) {
		return bloodRepo.findById(id);
	}
	
	public Collection<BloodTesting> getallbloodtest(){
		return bloodRepo.findAll();
	}
	
	public BloodTesting update_test(int id,BloodTesting newtest) throws Exception {
		return bloodRepo.findById(id).map(latesttest->{
			latesttest.setTest_type(newtest.getTest_type());
			latesttest.setRemarks(newtest.getRemarks());
			latesttest.setResult(newtest.getResult());
			latesttest.setTested_by(newtest.getTested_by());
			return bloodRepo.save(latesttest);
		}).orElseThrow(()-> new Exception("Blood testcode not found"));
		
		
	}
	public String deleteTestbyid(int id) {
		bloodRepo.deleteById(id);
		return "deleted success";
		
		
		
	}
	
	

}
