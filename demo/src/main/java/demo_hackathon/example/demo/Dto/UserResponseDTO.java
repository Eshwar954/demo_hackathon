package demo_hackathon.example.demo.Dto;

import java.time.LocalDateTime;

import demo_hackathon.example.demo.model.Roles;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponseDTO {

    private Long id;
    private String name;
    private String email;
    private String organizationName;
    private Roles role;
    private LocalDateTime createdAt;
}