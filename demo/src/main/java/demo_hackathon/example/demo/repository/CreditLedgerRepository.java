package demo_hackathon.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import demo_hackathon.example.demo.model.CreditLedger;

public interface CreditLedgerRepository extends JpaRepository<CreditLedger, Long> {

    List<CreditLedger> findByCarbonCredit_Id(Long creditId);
}