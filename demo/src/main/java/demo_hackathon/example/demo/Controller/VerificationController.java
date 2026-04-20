package demo_hackathon.example.demo.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import demo_hackathon.example.demo.Dto.VerificationDto;
import demo_hackathon.example.demo.Service.VerificationService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/verifications")
@RequiredArgsConstructor
public class VerificationController {

    private final VerificationService verificationService;

    @PostMapping
    public ResponseEntity<VerificationDto> verifyProject(@RequestBody VerificationDto dto) {
        return ResponseEntity.ok(verificationService.verifyProject(dto));
    }

    @GetMapping
    public ResponseEntity<List<VerificationDto>> getAll() {
        return ResponseEntity.ok(verificationService.getAll());
    }
}