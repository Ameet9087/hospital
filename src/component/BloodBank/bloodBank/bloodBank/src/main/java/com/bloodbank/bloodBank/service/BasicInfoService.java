package com.bloodbank.bloodBank.service;
//
//import com.BloodDonation.bloodCollection.dto.BasicInfoDTO;
//import com.BloodDonation.bloodCollection.entity.BasicInfo;
//
//import java.util.List;
//import java.util.Optional;
//
//public interface BasicInfoService {
//
//    BasicInfo saveBasicInfo(BasicInfoDTO basicInfoDTO);
//    List<BasicInfo> getAllBasicInfo();
//    Optional<BasicInfo> getBasicInfoById(int id);
//}




import com.bloodbank.bloodBank.dto.BasicInfoDTO;

public interface BasicInfoService {
    BasicInfoDTO saveBasicInfo(BasicInfoDTO basicInfoDTO);
    BasicInfoDTO getBasicInfoById(int id);
}
