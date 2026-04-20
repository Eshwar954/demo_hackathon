package demo_hackathon.example.demo.Service;

import demo_hackathon.example.demo.Dto.TransactionDto;
import demo_hackathon.example.demo.model.CreditTransaction;
import demo_hackathon.example.demo.model.TransactionStatus;
import demo_hackathon.example.demo.repository.CreditTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final CreditTransactionRepository repository;

    public TransactionDto purchase(TransactionDto dto) {
        CreditTransaction tx = new CreditTransaction();
        tx.setQuantity(dto.getQuantity() != null ? dto.getQuantity().intValue() : 0);
        tx.setPricePerCredit(dto.getTotalPrice() != null && dto.getQuantity() != null && dto.getQuantity() > 0 ? dto.getTotalPrice() / dto.getQuantity() : 0.0);
        tx.setStatus(TransactionStatus.SUCCESS);
        repository.save(tx);
        dto.setId(tx.getId());
        dto.setStatus("SUCCESS");
        return dto;
    }

    public List<TransactionDto> getAll() {
        return repository.findAll().stream().map(t -> {
            TransactionDto d = new TransactionDto();
            d.setId(t.getId());
            d.setQuantity(t.getQuantity() != null ? t.getQuantity().longValue() : 0L);
            d.setTotalPrice((t.getPricePerCredit() != null ? t.getPricePerCredit() : 0.0) * (t.getQuantity() != null ? t.getQuantity() : 0));
            d.setStatus(t.getStatus() != null ? t.getStatus().name() : "");
            return d;
        }).collect(Collectors.toList());
    }
}