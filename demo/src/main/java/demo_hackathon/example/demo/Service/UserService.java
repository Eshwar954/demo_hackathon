package demo_hackathon.example.demo.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import demo_hackathon.example.demo.model.User;
import demo_hackathon.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepo;

    public UserResponseDTO create(UserRequestDTO dto) {

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setOrganizationName(dto.getOrganizationName());
        user.setRole(dto.getRole());

        User saved = userRepo.save(user);

        return new UserResponseDTO(
                saved.getId(),
                saved.getName(),
                saved.getEmail(),
                saved.getOrganizationName(),
                saved.getRole()
        );
    }

    public List<UserResponseDTO> getAll() {
        return userRepo.findAll().stream()
                .map(u -> new UserResponseDTO(
                        u.getId(),
                        u.getName(),
                        u.getEmail(),
                        u.getOrganizationName(),
                        u.getRole()
                ))
                .toList();
    }

    public List<UserResponseDTO> getByRole(Roles role) {
        return userRepo.findByRole(role).stream()
                .map(u -> new UserResponseDTO(
                        u.getId(),
                        u.getName(),
                        u.getEmail(),
                        u.getOrganizationName(),
                        u.getRole()
                ))
                .toList();
    }
}