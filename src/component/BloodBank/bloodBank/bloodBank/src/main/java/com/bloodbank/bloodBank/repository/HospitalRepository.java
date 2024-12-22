package com.bloodbank.bloodBank.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.bloodbank.bloodBank.entity.Hospital;

public interface HospitalRepository extends JpaRepository<Hospital,Integer>{

}
