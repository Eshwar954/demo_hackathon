package demo_hackathon.example.demo.Service;

import demo_hackathon.example.demo.Dto.CreditDto;
import demo_hackathon.example.demo.repository.CarbonCreditRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CreditService {
    private final CarbonCreditRepository repository;

    public List<CreditDto> getAllCredits() {
        return repository.findAll().stream().map(c -> {
            CreditDto d = new CreditDto();
            d.setId(c.getId());
            d.setTotalCredits(c.getTotalCredits());
            d.setAvailableCredits(c.getAvailableCredits());
            d.setStatus(c.getCreditStatus() != null ? c.getCreditStatus().name() : "");
            return d;
        }).collect(Collectors.toList());
    }

    public CreditDto getByProject(Long projectId) {
        return null; // Mock integration
    }
}