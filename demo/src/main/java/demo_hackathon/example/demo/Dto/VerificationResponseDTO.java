package demo_hackathon.example.demo.Dto;

import java.time.LocalDate;

import demo_hackathon.example.demo.model.VerificationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VerificationResponseDTO {

    private Long id;
    private Long projectId;
    private Long verifiedReduction;
    private Long verifiedBy;
    private LocalDate verificationDate;
    private VerificationStatus status;
}