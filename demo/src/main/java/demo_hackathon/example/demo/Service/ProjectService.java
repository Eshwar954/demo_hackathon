package demo_hackathon.example.demo.Service;

<<<<<<< HEAD
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
=======
import java.util.List;

import org.springframework.stereotype.Service;

import demo_hackathon.example.demo.Dto.ProjectRequestDTO;
import demo_hackathon.example.demo.Dto.ProjectResponseDTO;
import demo_hackathon.example.demo.model.CarbonProject;
import demo_hackathon.example.demo.model.ProjectStatus;
import demo_hackathon.example.demo.model.User;
import demo_hackathon.example.demo.repository.CarbonProjectRepository;
import demo_hackathon.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class ProjectService {

    private final CarbonProjectRepository projectRepo;
    private final UserRepository userRepo;

    public ProjectResponseDTO create(ProjectRequestDTO dto) {

        User user = userRepo.findById(dto.getCreatedBy())
                .orElseThrow(() -> new RuntimeException("User not found"));

        CarbonProject project = new CarbonProject();
        project.setProjectName(dto.getProjectName());
        project.setProjectType(dto.getProjectType());
        project.setLocation(dto.getLocation());
        project.setEstimatedReduction(dto.getEstimatedReduction());
        project.setCreatedBy(user);
        project.setProjectStatus(ProjectStatus.CREATED);

        CarbonProject saved = projectRepo.save(project);

        return new ProjectResponseDTO(
                saved.getId(),
                saved.getProjectName(),
                saved.getProjectType(),
                saved.getLocation(),
                saved.getEstimatedReduction(),
                saved.getStartDate(),
                saved.getEndDate(),
                saved.getProjectStatus(),
                saved.getCreatedBy().getId(),
                saved.getCreatedAt()
        );
    }

    public List<ProjectResponseDTO> getAll() {
        return projectRepo.findAll().stream()
                .map(p -> new ProjectResponseDTO(
                        p.getId(),
                        p.getProjectName(),
                        p.getProjectType(),
                        p.getLocation(),
                        p.getEstimatedReduction(),
                        p.getStartDate(),
                        p.getEndDate(),
                        p.getProjectStatus(),
                        p.getCreatedBy().getId(),
                        p.getCreatedAt()
                )).toList();
>>>>>>> 3981bd96691c64f342d56bbc0a0b027313d67fec
    }
}