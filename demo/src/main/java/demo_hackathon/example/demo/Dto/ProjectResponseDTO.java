package demo_hackathon.example.demo.Dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import demo_hackathon.example.demo.model.ProjectStatus;
import demo_hackathon.example.demo.model.ProjectType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProjectResponseDTO {

    private Long id;
    private String projectName;
    private ProjectType projectType;
    private String location;
    private Long estimatedReduction;
    private LocalDate startDate;
    private LocalDate endDate;
    private ProjectStatus status;
    private Long ownerId;
    private LocalDateTime createdAt;
}