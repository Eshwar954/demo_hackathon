package demo_hackathon.example.demo.Service;

<<<<<<< HEAD
import demo_hackathon.example.demo.Dto.CreditDto;
import demo_hackathon.example.demo.repository.CarbonCreditRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

=======
import java.util.List;

import org.springframework.stereotype.Service;

import demo_hackathon.example.demo.Dto.CreditResponseDTO;
import demo_hackathon.example.demo.model.CarbonCredit;
import demo_hackathon.example.demo.repository.CarbonCreditRepository;
import lombok.RequiredArgsConstructor;
>>>>>>> 3981bd96691c64f342d56bbc0a0b027313d67fec
@Service
@RequiredArgsConstructor
public class CreditService {
    private final CarbonCreditRepository repository;

<<<<<<< HEAD
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
=======
    private final CarbonCreditRepository creditRepo;

    public List<CreditResponseDTO> getAll() {
        return creditRepo.findAll().stream()
                .map(c -> new CreditResponseDTO(
                        c.getId(),
                        c.getCarbonProject().getId(),
                        c.getTotalCredits(),
                        c.getAvailableCredits(),
                        c.getCreatedAt(),
                        c.getIssueDate(),
                        c.getCreditStatus()
                )).toList();
    }

    public CreditResponseDTO getByProject(Long projectId) {
        CarbonCredit c = creditRepo.findByCarbonProject_Id(projectId);

        return new CreditResponseDTO(
                c.getId(),
                c.getCarbonProject().getId(),
                c.getTotalCredits(),
                c.getAvailableCredits(),
                c.getCreatedAt(),
                c.getIssueDate(),
                c.getCreditStatus()
        );
>>>>>>> 3981bd96691c64f342d56bbc0a0b027313d67fec
    }
}