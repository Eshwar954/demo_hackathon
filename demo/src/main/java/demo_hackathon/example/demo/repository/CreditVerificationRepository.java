package demo_hackathon.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import demo_hackathon.example.demo.model.CreditVerification;

public interface CreditVerificationRepository extends JpaRepository<CreditVerification, Long> {
    
}
