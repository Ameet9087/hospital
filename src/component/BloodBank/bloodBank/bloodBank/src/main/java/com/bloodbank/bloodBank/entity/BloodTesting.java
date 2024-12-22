package com.bloodbank.bloodBank.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;


@Data
@Entity
public class BloodTesting {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int test_id;

    private Date test_date;
    private String test_type;  // Represents the type of test (e.g., HIV, Hepatitis)

    private String result;  // Could be ENUM in a stricter implementation (e.g., 'Passed', 'Failed')

    private String remarks;

    private String tested_by;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "Bloodcollection")
    private BloodCollection bloodCollection;
}

