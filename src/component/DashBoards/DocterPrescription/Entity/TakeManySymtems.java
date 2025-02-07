package com.LPHSmartX.hospital.DocterPrescription.Entity;

import jakarta.persistence.*; 
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TakeManySymtems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int takeManySymtemsId;

    @ManyToMany
    @JoinTable(
            name = "take_disease",
            joinColumns = @JoinColumn(name = "takemid"),
            inverseJoinColumns = @JoinColumn(name = "disease_id")
    )
    private List<Disease> diseases;

    @ManyToMany
    @JoinTable(
            name = "take",
            joinColumns = @JoinColumn(name = "takemid"),
            inverseJoinColumns = @JoinColumn(name = "symptom_id")
    )
    private List<Symptom> symptoms;

}
