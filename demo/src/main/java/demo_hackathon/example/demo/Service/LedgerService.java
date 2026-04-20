package demo_hackathon.example.demo.Service;

import demo_hackathon.example.demo.Dto.LedgerDto;
import demo_hackathon.example.demo.repository.CreditLedgerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LedgerService {
    private final CreditLedgerRepository repository;

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
    }
}