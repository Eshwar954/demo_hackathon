package demo_hackathon.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import demo_hackathon.example.demo.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
}
