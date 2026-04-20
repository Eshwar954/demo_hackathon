package demo_hackathon.example.demo.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import demo_hackathon.example.demo.model.CarbonCredit;
import demo_hackathon.example.demo.model.CreditLedger;
import demo_hackathon.example.demo.repository.CreditLedgerRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LedgerService {

    private final CreditLedgerRepository ledgerRepo;

    public List<LedgerResponseDTO> getAll() {
        return ledgerRepo.findAll().stream()
                .map(l -> new LedgerResponseDTO(
                        l.getId(),
                        l.getQuantity(),
                        l.getBalanceAfterTransaction(),
                        l.getTransactionType()
                )).toList();
    }
}