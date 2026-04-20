package demo_hackathon.example.demo.Service;

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
}