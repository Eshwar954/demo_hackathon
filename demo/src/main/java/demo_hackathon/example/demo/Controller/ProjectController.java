package demo_hackathon.example.demo.Controller;

import java.util.List;
import demo_hackathon.example.demo.Dto.ProjectDto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import demo_hackathon.example.demo.Dto.ProjectRequestDTO;
import demo_hackathon.example.demo.Dto.ProjectResponseDTO;
import demo_hackathon.example.demo.Service.ProjectService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectResponseDTO> createProject(@RequestBody ProjectRequestDTO dto) {
        return ResponseEntity.ok(projectService.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponseDTO>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAll());
    }
}