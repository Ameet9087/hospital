package com.LPHSmartX.hospital.Maternity.repository;

import com.LPHSmartX.hospital.Maternity.entity.FamilyPlanning;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FamilyPlanningRepository extends JpaRepository<FamilyPlanning, Long>{
	

}
