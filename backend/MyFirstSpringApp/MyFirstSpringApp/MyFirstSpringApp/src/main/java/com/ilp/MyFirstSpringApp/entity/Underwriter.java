package com.ilp.MyFirstSpringApp.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Underwriter {

    @Id
    @Column(length = 20)
    private String underwriterId; // Custom formatted ID like "UND20250001"

    @Column(nullable = false, length = 50)
    private String name;

    private LocalDate dob;
    private LocalDate joiningDate;

    @Column(length = 100)
    private String defaultPassword = "default123";

    @OneToMany(mappedBy = "underwriter", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Insurance> insurances;

    @PrePersist
    public void generateUnderwriterId() {
        if (this.underwriterId == null || this.underwriterId.isEmpty()) {
            String year = String.valueOf(LocalDate.now().getYear());
            String random = String.valueOf((int)(Math.random() * 9000) + 1000);
            this.underwriterId = "UND" + year + random;
        }
    }

    //-- Getters and Setters --

    public String getUnderwriterId() {
        return underwriterId;
    }

    public void setUnderwriterId(String underwriterId) {
        this.underwriterId = underwriterId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public LocalDate getJoiningDate() {
        return joiningDate;
    }

    public void setJoiningDate(LocalDate joiningDate) {
        this.joiningDate = joiningDate;
    }

    public String getDefaultPassword() {
        return defaultPassword;
    }

    public void setDefaultPassword(String defaultPassword) {
        this.defaultPassword = defaultPassword;
    }

    public List<Insurance> getInsurances() {
        return insurances;
    }

    public void setInsurances(List<Insurance> insurances) {
        this.insurances = insurances;
    }
}
