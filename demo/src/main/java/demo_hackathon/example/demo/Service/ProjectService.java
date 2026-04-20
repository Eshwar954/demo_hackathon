package demo_hackathon.example.demo.Service;

import demo_hackathon.example.demo.Dto.ProjectDto;
import demo_hackathon.example.demo.model.CarbonProject;
import demo_hackathon.example.demo.model.ProjectType;
import demo_hackathon.example.demo.model.ProjectStatus;
import demo_hackathon.example.demo.repository.CarbonProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final CarbonProjectRepository repository;

    public ProjectDto createProject(ProjectDto dto) {
        CarbonProject project = new CarbonProject();
        project.setProjectName(dto.getName());
        project.setLocation(dto.getLocation());
        project.setEstimatedReduction(dto.getReduction());
        project.setStartDate(dto.getStartDate());
        project.setEndDate(dto.getEndDate());
        try {
            project.setProjectType(ProjectType.valueOf(dto.getType().toUpperCase()));
        } catch(Exception e) {
            project.setProjectType(ProjectType.FORESTRY);
        }
        project.setProjectStatus(ProjectStatus.CREATED);
        
        repository.save(project);
        dto.setId(project.getId());
        dto.setStatus("CREATED");
        return dto;
    }

    public List<ProjectDto> getAllProjects() {
        return repository.findAll().stream().map(p -> {
            ProjectDto d = new ProjectDto();
            d.setId(p.getId());
            d.setName(p.getProjectName());
            d.setLocation(p.getLocation());
            d.setReduction(p.getEstimatedReduction());
            d.setStartDate(p.getStartDate());
            d.setEndDate(p.getEndDate());
            d.setType(p.getProjectType() != null ? p.getProjectType().name() : "");
            d.setStatus(p.getProjectStatus() != null ? p.getProjectStatus().name() : "");
            return d;
        }).collect(Collectors.toList());
    }

    public ProjectDto updateStatus(Long id, String status) {
        CarbonProject p = repository.findById(id).orElseThrow();
        p.setProjectStatus(ProjectStatus.valueOf(status.toUpperCase()));
        repository.save(p);
        ProjectDto d = new ProjectDto();
        d.setId(p.getId());
        d.setStatus(p.getProjectStatus().name());
        return d;
    }
}