package demo_hackathon.example.demo.Service;

import demo_hackathon.example.demo.Dto.VerificationDto;
import demo_hackathon.example.demo.model.CreditVerification;
import demo_hackathon.example.demo.model.VerificationStatus;
import demo_hackathon.example.demo.repository.CreditVerificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VerificationService {
    private final CreditVerificationRepository repository;

    public VerificationDto verifyProject(VerificationDto dto) {
        CreditVerification v = new CreditVerification();
        v.setVerificationStatus(VerificationStatus.APPROVED);
        repository.save(v);
        dto.setId(v.getId());
        dto.setStatus("APPROVED");
        return dto;
    }

    public List<VerificationDto> getAll() {
        return repository.findAll().stream().map(v -> {
            VerificationDto d = new VerificationDto();
            d.setId(v.getId());
            d.setStatus(v.getVerificationStatus() != null ? v.getVerificationStatus().name() : "");
            return d;
        }).collect(Collectors.toList());
    }
}