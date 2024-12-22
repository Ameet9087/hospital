package com.bloodbank.bloodBank.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.bloodbank.bloodBank.entity.Patient;

public interface PatientRepository extends JpaRepository<Patient ,Integer>{

}
