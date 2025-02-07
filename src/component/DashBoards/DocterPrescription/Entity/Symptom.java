    package com.LPHSmartX.hospital.DocterPrescription.Entity;

    import jakarta.persistence.*;
    import lombok.Getter;
    import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

    @Entity
    @Getter
    @Setter
    public class Symptom {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long symptomId;
        private String symptomsName;
//        private String category;
        
        @ManyToMany(mappedBy = "symptoms")
        private List<Disease> diseases= new ArrayList<>();;

    }
