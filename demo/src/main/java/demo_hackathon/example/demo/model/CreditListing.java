package demo_hackathon.example.demo.model;

import java.time.LocalDate;

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
public class CreditListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "carbon_credit_id", nullable = false)
    private CarbonCredit carbonCredit;
    private Long pricePerCredit;
    private Long listedQuantity;
    private LocalDate listingDate;
    @Enumerated(EnumType.STRING)
    private ListingStatus listingStatus;
    
}
