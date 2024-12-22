package com.bloodbank.bloodBank.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bloodbank.bloodBank.entity.BloodCollection;

public interface BloodCollectionRepository extends JpaRepository<BloodCollection, Integer> {

}
