package com.LPHSmartX.hospital.DocterPrescription.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter

public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long symptomCategoryId;
    private String category;

    @OneToMany
    @JoinColumn(name = "sy_id")
    private List<Symptom> symptoms = new ArrayList<>();
}
