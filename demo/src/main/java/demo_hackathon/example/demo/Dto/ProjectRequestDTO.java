package demo_hackathon.example.demo.Dto;

import demo_hackathon.example.demo.model.ProjectType;
import lombok.Data;

@Data
public class ProjectRequestDTO {

    private String projectName;
    private ProjectType projectType;
    private String location;
    private Long estimatedReduction;
    private Long createdBy;
}