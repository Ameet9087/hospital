package com.LPHSmartX.hospital.DocterPrescription.Repository;

import com.LPHSmartX.hospital.DocterPrescription.Entity.Symptom;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SymptomRepository extends JpaRepository<Symptom, Long> {

}
