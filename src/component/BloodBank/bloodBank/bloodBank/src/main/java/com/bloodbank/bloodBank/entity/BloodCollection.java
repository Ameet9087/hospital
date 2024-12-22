
package com.bloodbank.bloodBank.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
@Entity
public class BloodCollection {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int collectionID;
    @JsonIgnore
    @OneToMany(mappedBy = "bloodCollection", orphanRemoval = true,fetch = FetchType.EAGER)
    private List<BloodTesting> bloodTesting;  // A list to represent multiple testings for one collection
}

