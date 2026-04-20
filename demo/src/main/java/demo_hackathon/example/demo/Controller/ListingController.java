package demo_hackathon.example.demo.Controller;

import java.util.List;
import demo_hackathon.example.demo.Dto.ListingDto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import demo_hackathon.example.demo.Dto.ListingRequestDTO;
import demo_hackathon.example.demo.Dto.ListingResponseDTO;
import demo_hackathon.example.demo.Service.ListingService;
import lombok.RequiredArgsConstructor;
@RestController
@RequestMapping("/api/listings")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService listingService;

    @PostMapping
    public ResponseEntity<ListingResponseDTO> createListing(@RequestBody ListingRequestDTO dto) {
        return ResponseEntity.ok(listingService.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<ListingResponseDTO>> getAllListings() {
        return ResponseEntity.ok(listingService.getAll());
    }

    @GetMapping("/active")
    public ResponseEntity<List<ListingResponseDTO>> getActive() {
        return ResponseEntity.ok(listingService.getActiveListings());
    }
}