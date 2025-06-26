package com.ilp.MyFirstSpringApp.repository;

import com.ilp.MyFirstSpringApp.entity.Insurance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsuranceRepository extends JpaRepository<Insurance, Long> {
}
