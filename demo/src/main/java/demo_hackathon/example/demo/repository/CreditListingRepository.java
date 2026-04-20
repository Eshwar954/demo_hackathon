package demo_hackathon.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import demo_hackathon.example.demo.model.CreditListing;

public interface CreditListingRepository extends JpaRepository<CreditListing, Long> {
    
}
