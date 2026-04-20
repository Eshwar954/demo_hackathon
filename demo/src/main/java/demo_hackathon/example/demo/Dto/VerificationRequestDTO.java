package demo_hackathon.example.demo.Dto;

import demo_hackathon.example.demo.model.VerificationStatus;
import lombok.Data;

@Data
public class VerificationRequestDTO {

    private Long projectId;
    private Long verifiedReduction;
    private Long verifiedBy;
    private VerificationStatus status;
}