package com.bloodbank.bloodBank.service.serviceImplementation;
//
//import com.BloodDonation.bloodCollection.dto.BasicInfoDTO;
//import com.BloodDonation.bloodCollection.entity.*;
//import com.BloodDonation.bloodCollection.repository.BasicInfoRepository;
//import com.BloodDonation.bloodCollection.service.BasicInfoService;
//import org.springframework.stereotype.Service;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class BasicInfoServiceImpl implements BasicInfoService {
//
//    private final BasicInfoRepository basicInfoRepository;
//
//    @Autowired
//    public BasicInfoServiceImpl(BasicInfoRepository basicInfoRepository) {
//        this.basicInfoRepository = basicInfoRepository;
//    }
//
//    @Override
//    public BasicInfo saveBasicInfo(BasicInfoDTO basicInfoDTO) {
//        BasicInfo basicInfo = new BasicInfo();
//        basicInfo.setFullName(basicInfoDTO.getFullName());
//        basicInfo.setDateOfBirth(basicInfoDTO.getDateOfBirth());
//        basicInfo.setGender(basicInfoDTO.getGender());
//        basicInfo.setContactNumber(basicInfoDTO.getContactNumber());
//        basicInfo.setEmailAddress(basicInfoDTO.getEmailAddress());
//        basicInfo.setAddress(basicInfoDTO.getAddress());
//        basicInfo.setNationalId(basicInfoDTO.getNationalId());
//
//        // Map and save related data
//        HealthAndEligibility healthEligibilityInfo = new HealthAndEligibility();
//        healthEligibilityInfo.setDateOfLastDonation(basicInfoDTO.getHealthEligibilityInfo().getDateOfLastDonation());
//        healthEligibilityInfo.setWeight(basicInfoDTO.getHealthEligibilityInfo().getWeight());
//        // Set other fields for HealthEligibilityInfo
//
//        basicInfo.setHealthEligibilityInfo(healthEligibilityInfo);
//
//        BloodTypeInfo bloodTypeInfo = new BloodTypeInfo();
//        bloodTypeInfo.setBloodGroup(basicInfoDTO.getBloodTypeInfo().getBloodGroup());
//        bloodTypeInfo.setRhFactor(basicInfoDTO.getBloodTypeInfo().getRhFactor());
//        bloodTypeInfo.setCrossMatchingInfo(basicInfoDTO.getBloodTypeInfo().getCrossMatchingInfo());
//
//        basicInfo.setBloodTypeInfo(bloodTypeInfo);
//
//        ConsentAndCompliance consentInfo = new ConsentAndCompliance();
//        consentInfo.setInformedConsent(basicInfoDTO.getConsentInfo().isInformedConsent());
//
//        basicInfo.setConsentInfo(consentInfo);
//
//        BloodCollectionDetails bloodCollectionDetails = new BloodCollectionDetails();
//        bloodCollectionDetails.setCollectionDateTime(basicInfoDTO.getBloodCollectionDetails().getCollectionDateTime());
//        bloodCollectionDetails.setCollectionSite(basicInfoDTO.getBloodCollectionDetails().getCollectionSite());
//        bloodCollectionDetails.setCollectionMethod(basicInfoDTO.getBloodCollectionDetails().getCollectionMethod());
//        bloodCollectionDetails.setVolumeCollected(basicInfoDTO.getBloodCollectionDetails().getVolumeCollected());
//        bloodCollectionDetails.setCollectionBagNumber(basicInfoDTO.getBloodCollectionDetails().getCollectionBagNumber());
//        bloodCollectionDetails.setBarcodeOrQrCode(basicInfoDTO.getBloodCollectionDetails().getBarcodeOrQrCode());
//
//        basicInfo.setBloodCollectionDetails(bloodCollectionDetails);
//
//        return basicInfoRepository.save(basicInfo);
//    }
//
//    @Override
//    public List<BasicInfo> getAllBasicInfo() {
//        return basicInfoRepository.findAll();
//    }
//
//    @Override
//    public Optional<BasicInfo> getBasicInfoById(int id) {
//        return basicInfoRepository.findById(id);
//    }
//    }




import com.bloodbank.bloodBank.dto.BasicInfoDTO;
import com.bloodbank.bloodBank.entity.BasicInfo;
import com.bloodbank.bloodBank.repository.BasicInfoRepository;
import com.bloodbank.bloodBank.service.BasicInfoService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BasicInfoServiceImpl implements BasicInfoService {

    @Autowired
    private BasicInfoRepository basicInfoRepository;

   @Autowired
   private ModelMapper modelMapper;

    @Override
    public BasicInfoDTO saveBasicInfo(BasicInfoDTO basicInfoDTO) {
        BasicInfo basicInfo = modelMapper.map(basicInfoDTO, BasicInfo.class);
        BasicInfo savedBasicInfo = basicInfoRepository.save(basicInfo);
        return modelMapper.map(savedBasicInfo, BasicInfoDTO.class);
    }

    @Override
    public BasicInfoDTO getBasicInfoById(int id) {
        Optional<BasicInfo> optionalBasicInfo = basicInfoRepository.findById(id);
        if (optionalBasicInfo.isPresent()) {
            return modelMapper.map(optionalBasicInfo.get(), BasicInfoDTO.class);
        } else {
            throw new RuntimeException("BasicInfo not found for ID: " + id);
        }
    }
}
