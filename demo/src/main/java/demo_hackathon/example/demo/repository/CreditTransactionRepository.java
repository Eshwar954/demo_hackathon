package demo_hackathon.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import demo_hackathon.example.demo.model.CreditTransaction;
import demo_hackathon.example.demo.model.TransactionStatus;

public interface CreditTransactionRepository extends JpaRepository<CreditTransaction, Long> {

    List<CreditTransaction> findByBuyer(Long buyerId);

    List<CreditTransaction> findByTransactionStatus(TransactionStatus status);
}