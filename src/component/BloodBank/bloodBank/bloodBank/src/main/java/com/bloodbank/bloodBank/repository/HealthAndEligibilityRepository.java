package com.bloodbank.bloodBank.repository;

// HealthAndEligibilityRepository.java
import com.bloodbank.bloodBank.entity.HealthAndEligibility;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthAndEligibilityRepository extends JpaRepository<HealthAndEligibility, Integer> {}
