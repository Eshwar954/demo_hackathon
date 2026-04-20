package demo_hackathon.example.demo.Service;

import java.util.List;
import java.util.Objects;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import demo_hackathon.example.demo.Dto.UserRequestDTO;
import demo_hackathon.example.demo.Dto.UserResponseDTO;
import demo_hackathon.example.demo.model.Roles;
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
                saved.getRole(),
                saved.getCreatedAt()
        );
    }

    public List<UserResponseDTO> getAll() {
        return userRepo.findAll().stream()
                .map(u -> new UserResponseDTO(
                        u.getId(),
                        u.getName(),
                        u.getEmail(),
                        u.getOrganizationName(),
                        u.getRole(),
                        u.getCreatedAt()
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
                        u.getRole(),
                        u.getCreatedAt()
                ))
                .toList();
    }

        public UserResponseDTO authenticate(String email, String password) {
                User user = userRepo.findByEmailIgnoreCase(email.trim())
                                .orElseThrow(() -> new ResponseStatusException(UNAUTHORIZED, "Invalid credentials"));

                if (!Objects.equals(user.getPassword(), password)) {
                        throw new ResponseStatusException(UNAUTHORIZED, "Invalid credentials");
                }

                return new UserResponseDTO(
                                user.getId(),
                                user.getName(),
                                user.getEmail(),
                                user.getOrganizationName(),
                                user.getRole(),
                                user.getCreatedAt()
                );
        }
}