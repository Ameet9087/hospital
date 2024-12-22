package com.bloodbank.bloodBank.service;
import com.bloodbank.bloodBank.dto.DonorDto;
import java.util.List;

public interface DonorService {
    DonorDto registerDonor(DonorDto donorDto);
    DonorDto getDonorById(Long id);
    List<DonorDto> getAllDonors();
    void deleteDonorById(Long id);
}
