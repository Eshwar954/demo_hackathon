package demo_hackathon.example.demo.Service;
<<<<<<< HEAD

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
=======

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import demo_hackathon.example.demo.Dto.VerificationRequestDTO;
import demo_hackathon.example.demo.model.CarbonCredit;
import demo_hackathon.example.demo.model.CarbonProject;
import demo_hackathon.example.demo.model.CreditStatus;
import demo_hackathon.example.demo.model.CreditVerification;
import demo_hackathon.example.demo.model.ProjectStatus;
import demo_hackathon.example.demo.model.VerificationStatus;
import demo_hackathon.example.demo.repository.CarbonCreditRepository;
import demo_hackathon.example.demo.repository.CarbonProjectRepository;
import demo_hackathon.example.demo.repository.CreditVerificationRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VerificationService {

    private final CreditVerificationRepository verificationRepo;
    private final CarbonProjectRepository projectRepo;
    private final CarbonCreditRepository creditRepo;

    public void verify(VerificationRequestDTO dto) {

        CarbonProject project = projectRepo.findById(dto.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        CreditVerification verification = new CreditVerification();
        verification.setCarbonProject(project);
        verification.setVerifiedReduction(dto.getVerifiedReduction());
        verification.setVerificationStatus(dto.getStatus());
        verification.setVerificationDate(LocalDate.now());

        if (dto.getStatus() == VerificationStatus.APPROVED) {

            project.setProjectStatus(ProjectStatus.VERIFIED);

            CarbonCredit credit = new CarbonCredit();
            credit.setCarbonProject(project);
            credit.setTotalCredits(dto.getVerifiedReduction());
            credit.setAvailableCredits(dto.getVerifiedReduction());
            credit.setCreditStatus(CreditStatus.AVAILABLE);
            credit.setIssueDate(LocalDate.now());

            creditRepo.save(credit);

        } else {
            project.setProjectStatus(ProjectStatus.REJECTED);
        }

        projectRepo.save(project);
        verificationRepo.save(verification);
>>>>>>> 3981bd96691c64f342d56bbc0a0b027313d67fec
    }
}