package demo_hackathon.example.demo.Dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class ProjectDto {
    private Long id;
    private String name;
    private String type;
    private String location;
    private Long reduction;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
}
