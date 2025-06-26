package com.ilp.MyFirstSpringApp.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Insurance {

    @Id
    @Column(length = 20)
    private String policyNo; // Custom policy number

    @Column(nullable = false)
    private String vehicleNo;

    @Column(nullable = false)
    private String vehicleType;

    @Column(nullable = false)
    private String CustomerName;

    private Long engineNo;
    private Long chassisNo;

    @Column(length = 10)
    private Long phoneNo;

    @Column(nullable = false)
    private String type;

    private Double premiumAmt;
    private LocalDate fromDate;
    private LocalDate toDate;

    @ManyToOne
    @JoinColumn(name = "underwriter_id", nullable = false)
    private Underwriter underwriter;

    @PrePersist
    public void calculateFields() {
        // Generate custom policy number
        if (this.policyNo == null || this.policyNo.isEmpty()) {
            String year = String.valueOf(LocalDate.now().getYear());
            int randomNum = (int) (Math.random() * 9000) + 1000; // 4-digit random
            this.policyNo = "POL" + year + randomNum;
        }

        // Premium calculation based on type
        // if ("Full Insurance".equalsIgnoreCase(type)) {
        //     premiumAmt = 5000.0;
        // } else if ("Third Party".equalsIgnoreCase(type)) {
        //     premiumAmt = 2500.0;
        // }

        // Remove auto-calculation of toDate; use value from payload
    }

    // Getters and Setters

    public String getPolicyNo() {
        return policyNo;
    }

    public void setPolicyNo(String policyNo) {
        this.policyNo = policyNo;
    }

    public String getVehicleNo() {
        return vehicleNo;
    }

    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getCustomerName() {
        return CustomerName;
    }

    public void setCustomerName(String CustomerName) {
        this.CustomerName = CustomerName;
    }

    public Long getEngineNo() {
        return engineNo;
    }

    public void setEngineNo(Long engineNo) {
        this.engineNo = engineNo;
    }

    public Long getChassisNo() {
        return chassisNo;
    }

    public void setChassisNo(Long chassisNo) {
        this.chassisNo = chassisNo;
    }

    public Long getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(Long phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getPremiumAmt() {
        return premiumAmt;
    }

    public void setPremiumAmt(Double premiumAmt) {
        this.premiumAmt = premiumAmt;
    }

    public LocalDate getFromDate() {
        return fromDate;
    }

    public void setFromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDate getToDate() {
        return toDate;
    }

    public void setToDate(LocalDate toDate) {
        this.toDate = toDate;
    }

    public Underwriter getUnderwriter() {
        return underwriter;
    }

    public void setUnderwriter(Underwriter underwriter) {
        this.underwriter = underwriter;
    }
}