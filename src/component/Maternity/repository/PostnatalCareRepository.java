package com.LPHSmartX.hospital.Maternity.repository;

import com.LPHSmartX.hospital.Maternity.entity.PostnatalCare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostnatalCareRepository extends JpaRepository<PostnatalCare, Long>{

}
