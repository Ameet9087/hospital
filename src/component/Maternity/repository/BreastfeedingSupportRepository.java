package com.LPHSmartX.hospital.Maternity.repository;

import com.LPHSmartX.hospital.Maternity.entity.BreastfeedingSupport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BreastfeedingSupportRepository extends JpaRepository<BreastfeedingSupport, Long> {

}
