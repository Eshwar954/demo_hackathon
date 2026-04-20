package demo_hackathon.example.demo.Controller;

import java.util.List;
import demo_hackathon.example.demo.Dto.CreditDto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import demo_hackathon.example.demo.Service.CreditService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/credits")
@RequiredArgsConstructor
public class CreditController {

    private final CreditService creditService;

    @GetMapping
    public ResponseEntity<List<CreditDto>> getAllCredits() {
        return ResponseEntity.ok(creditService.getAllCredits());
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<CreditDto> getByProject(@PathVariable Long projectId) {
        return ResponseEntity.ok(creditService.getByProject(projectId));
    }
}