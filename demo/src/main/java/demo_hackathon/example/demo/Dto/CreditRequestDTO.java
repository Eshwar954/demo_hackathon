package demo_hackathon.example.demo.Dto;

import demo_hackathon.example.demo.model.CreditStatus;
import lombok.Data;

@Data
public class CreditRequestDTO {

    private Long projectId;
    private Long totalCredits;
    private Long availableCredits;
    private CreditStatus status;
}