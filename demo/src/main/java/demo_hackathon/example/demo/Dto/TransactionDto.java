package demo_hackathon.example.demo.Dto;

import lombok.Data;

@Data
public class TransactionDto {
    private Long id;
    private String project;
    private Long quantity;
    private Double totalPrice;
    private String status;
    private String date;
}
