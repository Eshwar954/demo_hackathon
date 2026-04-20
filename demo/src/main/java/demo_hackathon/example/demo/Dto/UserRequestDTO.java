package demo_hackathon.example.demo.Dto;

import demo_hackathon.example.demo.model.Roles;
import lombok.Data;

@Data
public class UserRequestDTO {

    private String name;
    private String email;
    private String password;
    private String organizationName;
    private Roles role;
}