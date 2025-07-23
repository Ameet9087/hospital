package com.LPHSmartX.hospital.Maternity.repository;

import com.LPHSmartX.hospital.Maternity.entity.FetalMonitoring;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FetalMonitoringRepository  extends JpaRepository<FetalMonitoring, Long>{

}
