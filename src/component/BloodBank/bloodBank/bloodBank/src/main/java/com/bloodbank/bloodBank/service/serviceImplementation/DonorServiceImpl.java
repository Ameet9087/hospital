package com.bloodbank.bloodBank.service.serviceImplementation;
import com.bloodbank.bloodBank.entity.Donor;
import com.bloodbank.bloodBank.dto.DonorDto;
import com.bloodbank.bloodBank.exception.ResourceNotFoundException;
import com.bloodbank.bloodBank.repository.DonorRepository;
import com.bloodbank.bloodBank.service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;



@Service
public class DonorServiceImpl implements DonorService {

    @Autowired
    private DonorRepository donorRepository;

    @Override
    public DonorDto registerDonor(DonorDto donorDto) {
        Donor donor = mapToEntity(donorDto);
        Donor newDonor = donorRepository.save(donor);
        return mapToDto(newDonor);
    }

    @Override
    public DonorDto getDonorById(Long id) {
        Donor donor = donorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Donor", "id", id));
        return mapToDto(donor);
    }

    @Override
    public List<DonorDto> getAllDonors() {
        return donorRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteDonorById(Long id) {
        Donor donor = donorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Donor", "id", id));
        donorRepository.delete(donor);
    }

    // Helper methods to convert between DTO and Entity
    private Donor mapToEntity(DonorDto donorDto) {
        Donor donor = new Donor();
        donor.setFullName(donorDto.getFullName());
        donor.setDob(donorDto.getDob());
        donor.setGender(donorDto.getGender());
        donor.setBloodGroup(donorDto.getBloodGroup());
        donor.setPhoneNumber(donorDto.getPhoneNumber());
        donor.setEmail(donorDto.getEmail());
        donor.setAddress(donorDto.getAddress());
        donor.setCity(donorDto.getCity());
        donor.setState(donorDto.getState());
        donor.setPostalCode(donorDto.getPostalCode());
        donor.setWeight(donorDto.getWeight());
        donor.setLastDonationDate(donorDto.getLastDonationDate());
        donor.setMedication(donorDto.getMedication());
        donor.setSurgeries(donorDto.getSurgeries());
        donor.setChronicIllness(donorDto.getChronicIllness());
        donor.setTravelHistory(donorDto.getTravelHistory());
        donor.setInfectiousDisease(donorDto.getInfectiousDisease());
        donor.setHealthComments(donorDto.getHealthComments());
        donor.setDonationDate(donorDto.getDonationDate());
        donor.setDonationType(donorDto.getDonationType());
        donor.setDonationCenter(donorDto.getDonationCenter());
        donor.setTimeSlot(donorDto.getTimeSlot());
        donor.setConsent(donorDto.isConsent());
        donor.setShareInfo(donorDto.isShareInfo());
        return donor;
    }

    private DonorDto mapToDto(Donor donor) {
        DonorDto donorDto = new DonorDto();
        donorDto.setFullName(donor.getFullName());
        donorDto.setDob(donor.getDob());
        donorDto.setGender(donor.getGender());
        donorDto.setBloodGroup(donor.getBloodGroup());
        donorDto.setPhoneNumber(donor.getPhoneNumber());
        donorDto.setEmail(donor.getEmail());
        donorDto.setAddress(donor.getAddress());
        donorDto.setCity(donor.getCity());
        donorDto.setState(donor.getState());
        donorDto.setPostalCode(donor.getPostalCode());
        donorDto.setWeight(donor.getWeight());
        donorDto.setLastDonationDate(donor.getLastDonationDate());
        donorDto.setMedication(donor.getMedication());
        donorDto.setSurgeries(donor.getSurgeries());
        donorDto.setChronicIllness(donor.getChronicIllness());
        donorDto.setTravelHistory(donor.getTravelHistory());
        donorDto.setInfectiousDisease(donor.getInfectiousDisease());
        donorDto.setHealthComments(donor.getHealthComments());
        donorDto.setDonationDate(donor.getDonationDate());
        donorDto.setDonationType(donor.getDonationType());
        donorDto.setDonationCenter(donor.getDonationCenter());
        donorDto.setTimeSlot(donor.getTimeSlot());
        donorDto.setConsent(donor.isConsent());
        donorDto.setShareInfo(donor.isShareInfo());
        return donorDto;
    }
}
