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
public class CreditVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "carbon_project_id", nullable = false)
    private CarbonProject carbonProject;
    private Long verifiedReduction;
    private Long verifiedBy;
    private LocalDate verificationDate;
    @Enumerated(EnumType.STRING)
    private VerificationStatus verificationStatus;
    
}
