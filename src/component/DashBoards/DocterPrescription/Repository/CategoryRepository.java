package com.LPHSmartX.hospital.DocterPrescription.Repository;

import com.LPHSmartX.hospital.DocterPrescription.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
