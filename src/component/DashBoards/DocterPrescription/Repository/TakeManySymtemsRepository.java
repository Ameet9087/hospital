package com.LPHSmartX.hospital.DocterPrescription.Repository;

import com.LPHSmartX.hospital.DocterPrescription.Entity.TakeManySymtems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TakeManySymtemsRepository extends JpaRepository<TakeManySymtems, Integer> {
}
