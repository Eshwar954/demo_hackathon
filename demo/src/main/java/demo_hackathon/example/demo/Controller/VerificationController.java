package demo_hackathon.example.demo.Controller;

<<<<<<< HEAD
import java.util.List;
import demo_hackathon.example.demo.Dto.VerificationDto;

=======
>>>>>>> 3981bd96691c64f342d56bbc0a0b027313d67fec
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import demo_hackathon.example.demo.Dto.VerificationRequestDTO;
import demo_hackathon.example.demo.Service.VerificationService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/verifications")
@RequiredArgsConstructor
public class VerificationController {

    private final VerificationService verificationService;

    @PostMapping
    public ResponseEntity<String> verifyProject(@RequestBody VerificationRequestDTO dto) {
        verificationService.verify(dto);
        return ResponseEntity.ok("Verification completed");
    }
}