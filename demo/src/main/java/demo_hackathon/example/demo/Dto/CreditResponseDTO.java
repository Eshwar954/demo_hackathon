package demo_hackathon.example.demo.Dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import demo_hackathon.example.demo.model.CreditStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreditResponseDTO {

    private Long id;
    private Long projectId;
    private Long totalCredits;
    private Long availableCredits;
    private LocalDateTime createdAt;
    private LocalDate issueDate;
    private CreditStatus status;
}