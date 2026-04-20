package demo_hackathon.example.demo.Controller;

import java.util.List;
import demo_hackathon.example.demo.Dto.TransactionDto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import demo_hackathon.example.demo.Dto.TransactionRequestDTO;
import demo_hackathon.example.demo.Dto.TransactionResponseDTO;
import demo_hackathon.example.demo.Service.TransactionService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    public ResponseEntity<TransactionResponseDTO> purchaseCredits(@RequestBody TransactionRequestDTO dto) {
        return ResponseEntity.ok(transactionService.purchase(dto));
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponseDTO>> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAll());
    }
}