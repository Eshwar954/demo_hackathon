package demo_hackathon.example.demo.Service;

<<<<<<< HEAD
import demo_hackathon.example.demo.Dto.LedgerDto;
import demo_hackathon.example.demo.repository.CreditLedgerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
=======
import java.util.List;

import org.springframework.stereotype.Service;

import demo_hackathon.example.demo.Dto.LedgerResponseDTO;
import demo_hackathon.example.demo.model.CreditLedger;
import demo_hackathon.example.demo.repository.CreditLedgerRepository;
import lombok.RequiredArgsConstructor;
>>>>>>> 3981bd96691c64f342d56bbc0a0b027313d67fec

@Service
@RequiredArgsConstructor
public class LedgerService {
    private final CreditLedgerRepository repository;

<<<<<<< HEAD
    public List<LedgerDto> getAll() {
        return repository.findAll().stream().map(l -> {
            LedgerDto d = new LedgerDto();
            d.setCreditId(l.getId());
            d.setType(l.getTransactionType() != null ? l.getTransactionType().name() : "");
            d.setQuantity(""+l.getQuantity());
            d.setBalance(""+l.getBalanceAfter());
            d.setDate(l.getTimestamp() != null ? l.getTimestamp().toString() : "");
            return d;
        }).collect(Collectors.toList());
    }

    public List<LedgerDto> getByCredit(Long creditId) {
        return getAll();
=======
    private final CreditLedgerRepository ledgerRepo;

    public List<LedgerResponseDTO> getAll() {
        return ledgerRepo.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public List<LedgerResponseDTO> getByCredit(Long creditId) {
        return ledgerRepo.findByCarbonCredit_Id(creditId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // 🔁 Centralized mapping (so you don’t repeat mistakes everywhere)
    private LedgerResponseDTO mapToDTO(CreditLedger l) {
        return new LedgerResponseDTO(
                l.getId(),
                l.getCarbonCredit().getId(),      // creditId
                l.getTransactionType(),           // type
                l.getQuantity(),                  // quantity
                l.getBalanceAfterTransaction(),   // balance
                l.getTransactionDate()            // timestamp
        );
>>>>>>> 3981bd96691c64f342d56bbc0a0b027313d67fec
    }
}