package demo_hackathon.example.demo.Controller;

import java.util.List;
import demo_hackathon.example.demo.Dto.LedgerDto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import demo_hackathon.example.demo.Dto.LedgerResponseDTO;
import demo_hackathon.example.demo.Service.LedgerService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ledger")
@RequiredArgsConstructor
public class LedgerController {

    private final LedgerService ledgerService;

    @GetMapping
    public ResponseEntity<List<LedgerResponseDTO>> getLedger() {
        return ResponseEntity.ok(ledgerService.getAll());
    }

    @GetMapping("/credit/{creditId}")
    public ResponseEntity<List<LedgerResponseDTO>> getByCredit(@PathVariable Long creditId) {
        return ResponseEntity.ok(ledgerService.getByCredit(creditId));
    }
}
