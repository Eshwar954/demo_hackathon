package demo_hackathon.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import demo_hackathon.example.demo.model.CreditTransaction;

public interface CreditTransactionRepository extends JpaRepository<CreditTransaction, Long>{
    
}
