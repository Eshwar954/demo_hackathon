package demo_hackathon.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import demo_hackathon.example.demo.model.Roles;
import demo_hackathon.example.demo.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByRole(Roles role);

    Optional<User> findByEmail(String email);

    Optional<User> findByEmailIgnoreCase(String email);
}
