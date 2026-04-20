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
import jakarta.persistence.PrePersist;
import lombok.Data;

@Entity
@Data
public class CreditTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long buyer;
    @ManyToOne
    @JoinColumn(name = "credit_listing_id", nullable = false)
    private CreditListing creditListing;
    private Long purchasedQuantity;
    private Long totalPrice;
    private LocalDateTime transactionDate;
    @Enumerated(EnumType.STRING)
    private TransactionStatus transactionStatus;
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
    
}
