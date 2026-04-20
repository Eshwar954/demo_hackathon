package demo_hackathon.example.demo.Dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String org;
    private String password;
    private String role;
}
