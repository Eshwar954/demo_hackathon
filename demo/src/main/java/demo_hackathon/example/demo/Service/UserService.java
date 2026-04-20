package demo_hackathon.example.demo.Service;

<<<<<<< HEAD
import demo_hackathon.example.demo.Dto.UserDto;
import demo_hackathon.example.demo.model.User;
import demo_hackathon.example.demo.model.Roles;
import demo_hackathon.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
=======
import java.util.List;

import org.springframework.stereotype.Service;

import demo_hackathon.example.demo.Dto.UserRequestDTO;
import demo_hackathon.example.demo.Dto.UserResponseDTO;
import demo_hackathon.example.demo.model.Roles;
import demo_hackathon.example.demo.model.User;
import demo_hackathon.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
>>>>>>> 3981bd96691c64f342d56bbc0a0b027313d67fec

@Service
@RequiredArgsConstructor
public class UserService {

<<<<<<< HEAD
    private final UserRepository userRepository;

    public UserDto createUser(UserDto dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setOrganizationName(dto.getOrg());
        user.setPassword(dto.getPassword());
        try {
            user.setRole(Roles.valueOf(dto.getRole().toUpperCase()));
        } catch(Exception e) {
            // Default fallback
        }
        userRepository.save(user);
        dto.setId(user.getId());
        return dto;
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(u -> {
            UserDto d = new UserDto();
            d.setId(u.getId());
            d.setName(u.getName());
            d.setEmail(u.getEmail());
            d.setOrg(u.getOrganizationName());
            d.setRole(u.getRole() != null ? u.getRole().name() : "");
            return d;
        }).collect(Collectors.toList());
    }

    public List<UserDto> getUsersByRole(String role) {
        return getAllUsers().stream().filter(u -> u.getRole().equalsIgnoreCase(role)).collect(Collectors.toList());
    }
}
=======
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
}
>>>>>>> 3981bd96691c64f342d56bbc0a0b027313d67fec
