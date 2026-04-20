package demo_hackathon.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import demo_hackathon.example.demo.model.CreditListing;
import demo_hackathon.example.demo.model.ListingStatus;

public interface CreditListingRepository extends JpaRepository<CreditListing, Long> {

    List<CreditListing> findByListingStatus(ListingStatus status);

    List<CreditListing> findByCarbonCredit_Id(Long creditId);
}