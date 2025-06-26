package com.ilp.MyFirstSpringApp.repository;

import com.ilp.MyFirstSpringApp.entity.Insurance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InsuranceRepository extends JpaRepository<Insurance, String> {
    List<Insurance> findByUnderwriter_UnderwriterId(String underwriterId);
}
