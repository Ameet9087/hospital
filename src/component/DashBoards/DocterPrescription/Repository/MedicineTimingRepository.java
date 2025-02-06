package com.LPHSmartX.hospital.DocterPrescription.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LPHSmartX.hospital.DocterPrescription.Entity.MedicineTiming;

@Repository
public interface MedicineTimingRepository extends JpaRepository<MedicineTiming, Integer>{

}
