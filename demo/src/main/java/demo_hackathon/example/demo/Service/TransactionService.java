package demo_hackathon.example.demo.Service;

<<<<<<< HEAD
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
=======
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import demo_hackathon.example.demo.Dto.TransactionRequestDTO;
import demo_hackathon.example.demo.Dto.TransactionResponseDTO;
import demo_hackathon.example.demo.model.CarbonCredit;
import demo_hackathon.example.demo.model.CreditLedger;
import demo_hackathon.example.demo.model.CreditListing;
import demo_hackathon.example.demo.model.CreditStatus;
import demo_hackathon.example.demo.model.CreditTransaction;
import demo_hackathon.example.demo.model.ListingStatus;
import demo_hackathon.example.demo.model.TransactionStatus;
import demo_hackathon.example.demo.model.TransactionType;
import demo_hackathon.example.demo.repository.CarbonCreditRepository;
import demo_hackathon.example.demo.repository.CreditLedgerRepository;
import demo_hackathon.example.demo.repository.CreditListingRepository;
import demo_hackathon.example.demo.repository.CreditTransactionRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final CreditTransactionRepository txRepo;
    private final CreditListingRepository listingRepo;
    private final CarbonCreditRepository creditRepo;
    private final CreditLedgerRepository ledgerRepo;

    public TransactionResponseDTO purchase(TransactionRequestDTO dto) {

        CreditListing listing = listingRepo.findById(dto.getListingId())
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        CarbonCredit credit = listing.getCarbonCredit();

        if (dto.getQuantity() > listing.getListedQuantity()) {
            throw new RuntimeException("Not enough credits");
        }

        Long totalPrice = dto.getQuantity() * listing.getPricePerCredit();

        listing.setListedQuantity(listing.getListedQuantity() - dto.getQuantity());
        if (listing.getListedQuantity() == 0) {
            listing.setListingStatus(ListingStatus.CLOSED);
        }
        listingRepo.save(listing);

        credit.setAvailableCredits(credit.getAvailableCredits() - dto.getQuantity());
        credit.setCreditStatus(
                credit.getAvailableCredits() == 0
                        ? CreditStatus.SOLD
                        : CreditStatus.PARTIALLY_SOLD
        );
        creditRepo.save(credit);

        CreditTransaction tx = new CreditTransaction();
        tx.setCreditListing(listing);
        tx.setPurchasedQuantity(dto.getQuantity());
        tx.setTotalPrice(totalPrice);
        tx.setTransactionStatus(TransactionStatus.SUCCESS);
        tx.setBuyer(dto.getBuyerId());
        tx.setTransactionDate(LocalDateTime.now());

        CreditTransaction saved = txRepo.save(tx);

        CreditLedger ledger = new CreditLedger();
        ledger.setCarbonCredit(credit);
        ledger.setTransactionType(TransactionType.PURCHASED);
        ledger.setQuantity(dto.getQuantity());
        ledger.setBalanceAfterTransaction(credit.getAvailableCredits());
        ledger.setTransactionDate(LocalDateTime.now());

        ledgerRepo.save(ledger);

        return new TransactionResponseDTO(
                saved.getId(),
                saved.getPurchasedQuantity(),
                saved.getTotalPrice(),
                saved.getTransactionStatus()
        );
    }
    public List<TransactionResponseDTO> getAll() {
    return txRepo.findAll()
            .stream()
            .map(t -> new TransactionResponseDTO(
                    t.getId(),
                    t.getPurchasedQuantity(),
                    t.getTotalPrice(),
                    t.getTransactionStatus()
            ))
            .toList();
}

>>>>>>> 3981bd96691c64f342d56bbc0a0b027313d67fec
}