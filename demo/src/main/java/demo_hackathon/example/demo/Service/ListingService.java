package demo_hackathon.example.demo.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import demo_hackathon.example.demo.model.CarbonCredit;
import demo_hackathon.example.demo.model.CreditListing;
import demo_hackathon.example.demo.model.ListingStatus;
import demo_hackathon.example.demo.repository.CarbonCreditRepository;
import demo_hackathon.example.demo.repository.CreditListingRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ListingService {

    private final CreditListingRepository listingRepo;
    private final CarbonCreditRepository creditRepo;

    public CreditListing create(Long creditId, Long quantity, Long price) {

        CarbonCredit credit = creditRepo.findById(creditId)
                .orElseThrow(() -> new RuntimeException("Credit not found"));

        if (quantity > credit.getAvailableCredits()) {
            throw new RuntimeException("Not enough credits");
        }

        CreditListing listing = new CreditListing();
        listing.setCarbonCredit(credit);
        listing.setListedQuantity(quantity);
        listing.setPricePerCredit(price);
        listing.setListingStatus(ListingStatus.ACTIVE);
        listing.setListingDate(LocalDate.now());

        return listingRepo.save(listing);
    }

    public List<CreditListing> getAll() {
        return listingRepo.findAll();
    }
}