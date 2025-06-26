package com.ilp.MyFirstSpringApp.repository;

import com.ilp.MyFirstSpringApp.entity.Underwriter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnderwriterRepository extends JpaRepository<Underwriter, Long> {
}
