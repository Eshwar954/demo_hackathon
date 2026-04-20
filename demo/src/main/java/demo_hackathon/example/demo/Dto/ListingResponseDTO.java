package demo_hackathon.example.demo.Dto;

import java.time.LocalDate;

import demo_hackathon.example.demo.model.ListingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ListingResponseDTO {

    private Long id;
    private Long creditId;
    private Long quantity;
    private Long price;
    private LocalDate listingDate;
    private ListingStatus status;
}