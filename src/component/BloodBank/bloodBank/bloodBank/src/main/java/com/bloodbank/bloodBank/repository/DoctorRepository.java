package com.bloodbank.bloodBank.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.bloodbank.bloodBank.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor ,Integer> {

}
