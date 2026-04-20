package demo_hackathon.example.demo.Dto;

import lombok.Data;

@Data
public class TransactionRequestDTO {

    private Long listingId;
    private Long quantity;
    private Long buyerId;
}