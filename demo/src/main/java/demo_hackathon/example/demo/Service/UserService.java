package demo_hackathon.example.demo.Service;

import demo_hackathon.example.demo.Dto.UserDto;
import demo_hackathon.example.demo.model.User;
import demo_hackathon.example.demo.model.Roles;
import demo_hackathon.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

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
