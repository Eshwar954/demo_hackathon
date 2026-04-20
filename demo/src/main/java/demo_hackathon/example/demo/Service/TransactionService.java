package demo_hackathon.example.demo.Service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

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
}