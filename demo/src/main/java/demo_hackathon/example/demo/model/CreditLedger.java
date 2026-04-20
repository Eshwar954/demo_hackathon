package demo_hackathon.example.demo.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class CreditLedger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "carbon_credit_id", nullable = false)
    private CarbonCredit carbonCredit;
    @Enumerated(EnumType.STRING)
    private TransactionType transactionType; 
    private Long quantity;
    private long balanceAfterTransaction;
    private LocalDateTime transactionDate;


    
}
