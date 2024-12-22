package com.bloodbank.bloodBank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bloodbank.bloodBank.entity.*;

public interface BloodStorageRepository extends JpaRepository<BloodStorage, Integer>{
	
	@Modifying
	@Query("DELETE FROM BloodStorage b WHERE b.storage_id = :storage_id")
	void deleteByStorageId(@Param("storage_id") int storage_id);

}
