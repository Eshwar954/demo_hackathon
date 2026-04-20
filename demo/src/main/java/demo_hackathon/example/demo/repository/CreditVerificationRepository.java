package demo_hackathon.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import demo_hackathon.example.demo.model.CreditVerification;
import demo_hackathon.example.demo.model.VerificationStatus;

public interface CreditVerificationRepository extends JpaRepository<CreditVerification, Long> {

    List<CreditVerification> findByVerificationStatus(VerificationStatus status);

    List<CreditVerification> findByCarbonProject_Id(Long projectId);
}
