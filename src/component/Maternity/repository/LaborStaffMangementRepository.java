package com.LPHSmartX.hospital.Maternity.repository;

import com.LPHSmartX.hospital.Maternity.entity.LaborStaffManagement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LaborStaffMangementRepository extends JpaRepository<LaborStaffManagement, Long> {

}
