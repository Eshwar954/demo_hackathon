package demo_hackathon.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import demo_hackathon.example.demo.model.CarbonCredit;
import demo_hackathon.example.demo.model.CreditStatus;

public interface CarbonCreditRepository extends JpaRepository<CarbonCredit, Long> {

    CarbonCredit findByCarbonProject_Id(Long projectId);

    List<CarbonCredit> findByCreditStatus(CreditStatus status);
}
