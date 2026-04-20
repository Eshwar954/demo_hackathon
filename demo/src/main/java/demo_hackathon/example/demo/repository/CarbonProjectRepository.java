package demo_hackathon.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import demo_hackathon.example.demo.model.CarbonProject;
import demo_hackathon.example.demo.model.ProjectStatus;

public interface CarbonProjectRepository extends JpaRepository<CarbonProject, Long> {

    List<CarbonProject> findByCreatedBy_Id(Long userId);

    List<CarbonProject> findByProjectStatus(ProjectStatus status);
}
