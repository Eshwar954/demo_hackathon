package demo_hackathon.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import demo_hackathon.example.demo.model.CarbonProject;

public interface CarbonProjectRepository extends JpaRepository<CarbonProject, Long> {
    
}
