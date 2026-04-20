package demo_hackathon.example.demo.model;

import java.time.LocalDate;
import java.time.LocalDateTime;



import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import lombok.Data;

@Entity
@Data
public class CarbonProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
   
    private Long id;
    private String projectName;

    @Enumerated(EnumType.STRING)
    private ProjectType projectType;

    private String location;
    private Long estimatedReduction;
    private LocalDate startDate;
    private LocalDate endDate;
    @Enumerated(EnumType.STRING)
    private ProjectStatus projectStatus;

    @ManyToOne
    private User createdBy;
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
    
    
}
