package demo_hackathon.example.demo.Dto;

import java.time.LocalDateTime;

import demo_hackathon.example.demo.model.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LedgerResponseDTO {

    private Long id;
    private Long creditId;
    private TransactionType type;
    private Long quantity;
    private long balance;
    private LocalDateTime transactionDate;
}