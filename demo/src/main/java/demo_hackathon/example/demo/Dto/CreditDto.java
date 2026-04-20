package demo_hackathon.example.demo.Dto;

import lombok.Data;

@Data
public class CreditDto {
    private Long id;
    private String project;
    private Long totalCredits;
    private Long availableCredits;
    private String status;
}
