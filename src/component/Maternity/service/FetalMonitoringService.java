package com.LPHSmartX.hospital.Maternity.service;

import java.util.List;

import com.LPHSmartX.hospital.Maternity.dto.FetalMonitoringDTO;


public interface FetalMonitoringService {
	FetalMonitoringDTO createFetalMonitoring(FetalMonitoringDTO fetalMonitoringDTO);
    FetalMonitoringDTO getFetalMonitoringById(Long id);
    List<FetalMonitoringDTO> getAllFetalMonitoring();
    void deleteFetalMonitoring(Long id);
    FetalMonitoringDTO updateFetalMonitoring(Long id, FetalMonitoringDTO fetalMonitoringDTO);	

}
