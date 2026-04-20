package demo_hackathon.example.demo.model;

import java.time.LocalDate;
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
public class CarbonCredit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "carbon_project_id", nullable = false)
    private CarbonProject carbonProject;
    private Long totalCredits;
    private Long availableCredits;
    private LocalDateTime createdAt;
    private LocalDate issueDate;

    @Enumerated(EnumType.STRING)
    private CreditStatus creditStatus;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
    
    
}
