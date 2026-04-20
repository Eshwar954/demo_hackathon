package demo_hackathon.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import demo_hackathon.example.demo.model.CarbonCredit;

public interface CarbonCreditRepository extends JpaRepository<CarbonCredit,Long > {
    
}
