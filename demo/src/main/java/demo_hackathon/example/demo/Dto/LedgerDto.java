package demo_hackathon.example.demo.Dto;

import lombok.Data;

@Data
public class LedgerDto {
    private Long creditId;
    private String type;
    private String quantity;
    private String balance;
    private String date;
}
