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

    public ListingResponseDTO create(ListingRequestDTO dto) {

        CarbonCredit credit = creditRepo.findById(dto.getCreditId())
                .orElseThrow(() -> new RuntimeException("Credit not found"));

        if (dto.getQuantity() > credit.getAvailableCredits()) {
            throw new RuntimeException("Listing quantity exceeds available credits");
        }

        CreditListing listing = new CreditListing();
        listing.setCarbonCredit(credit);
        listing.setListedQuantity(dto.getQuantity());
        listing.setPricePerCredit(dto.getPrice());
        listing.setListingStatus(ListingStatus.ACTIVE);
        listing.setListingDate(LocalDate.now());

        CreditListing saved = listingRepo.save(listing);

        return mapToResponse(saved);
    }

    public List<ListingResponseDTO> getAll() {
        return listingRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<ListingResponseDTO> getActiveListings() {
        return listingRepo.findByListingStatus(ListingStatus.ACTIVE)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public void cancelListing(Long listingId) {

        CreditListing listing = listingRepo.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        if (listing.getListingStatus() != ListingStatus.ACTIVE) {
            throw new RuntimeException("Only active listings can be cancelled");
        }

        listing.setListingStatus(ListingStatus.CANCELLED);
        listingRepo.save(listing);
    }

    private ListingResponseDTO mapToResponse(CreditListing l) {
        return new ListingResponseDTO(
                l.getId(),
                l.getCarbonCredit().getId(),
                l.getListedQuantity(),
                l.getPricePerCredit(),
                l.getListingStatus()
        );
    }
}