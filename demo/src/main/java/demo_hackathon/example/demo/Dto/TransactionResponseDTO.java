
package demo_hackathon.example.demo.Dto;

import demo_hackathon.example.demo.model.TransactionStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TransactionResponseDTO {

    private Long id;
    private Long listingId;
    private Long buyerId;
    private Long projectOwnerId;
    private Long quantity;
    private Long totalPrice;
    private TransactionStatus status;
}