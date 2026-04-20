package demo_hackathon.example.demo.Service;

<<<<<<< HEAD
import demo_hackathon.example.demo.Dto.ListingDto;
import demo_hackathon.example.demo.model.CreditListing;
import demo_hackathon.example.demo.model.ListingStatus;
import demo_hackathon.example.demo.repository.CreditListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ListingService {
    private final CreditListingRepository repository;

    public ListingDto createListing(ListingDto dto) {
        CreditListing listing = new CreditListing();
        listing.setPricePerCredit(dto.getPrice());
        listing.setQuantity(dto.getQuantity() != null ? dto.getQuantity().intValue() : 0);
        listing.setStatus(ListingStatus.ACTIVE);
        repository.save(listing);
        dto.setId(listing.getId());
        dto.setStatus("ACTIVE");
        return dto;
    }

    public List<ListingDto> getAllListings() {
        return repository.findAll().stream().map(l -> {
            ListingDto d = new ListingDto();
            d.setId(l.getId());
            d.setPrice(l.getPricePerCredit());
            d.setQuantity(l.getQuantity() != null ? l.getQuantity().longValue() : 0L);
            d.setStatus(l.getStatus() != null ? l.getStatus().name() : "");
            return d;
        }).collect(Collectors.toList());
    }
=======
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import demo_hackathon.example.demo.Dto.ListingRequestDTO;
import demo_hackathon.example.demo.Dto.ListingResponseDTO;
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
            l.getCarbonCredit().getId(),   // creditId
            l.getListedQuantity(),         // quantity
            l.getPricePerCredit(),         // price
            l.getListingDate(),            // date
            l.getListingStatus()           // status
    );
}
>>>>>>> 3981bd96691c64f342d56bbc0a0b027313d67fec
}