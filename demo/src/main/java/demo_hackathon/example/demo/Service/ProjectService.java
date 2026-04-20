package demo_hackathon.example.demo.Service;

import java.util.List;

import org.springframework.stereotype.Service;

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
                saved.getProjectStatus(),
                saved.getCreatedBy().getId()
        );
    }

    public List<ProjectResponseDTO> getAll() {
        return projectRepo.findAll().stream()
                .map(p -> new ProjectResponseDTO(
                        p.getId(),
                        p.getProjectName(),
                        p.getProjectStatus(),
                        p.getCreatedBy().getId()
                )).toList();
    }
}