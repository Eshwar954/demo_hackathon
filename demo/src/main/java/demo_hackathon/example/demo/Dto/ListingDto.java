package demo_hackathon.example.demo.Dto;

import lombok.Data;

@Data
public class ListingDto {
    private Long id;
    private String project;
    private Double price;
    private Long quantity;
    private String status;
}
