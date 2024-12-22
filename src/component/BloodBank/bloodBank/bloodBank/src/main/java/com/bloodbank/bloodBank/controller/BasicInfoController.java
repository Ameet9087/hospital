package com.bloodbank.bloodBank.controller;
//
//import com.BloodDonation.bloodCollection.dto.BasicInfoDTO;
//import com.BloodDonation.bloodCollection.entity.BasicInfo;
//import com.BloodDonation.bloodCollection.service.BasicInfoService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/basic-info")
//public class BasicInfoController {
//
//
//
//    @Autowired
//    public BasicInfoController(BasicInfoService basicInfoService) {
//        this.basicInfoService = basicInfoService;
//    }
//
//    @Autowired
//    private BasicInfoService basicInfoService;
//
//    @PostMapping("/save")
//    public ResponseEntity<BasicInfo> saveBasicInfo(@RequestBody BasicInfoDTO basicInfoDTO) {
//        BasicInfo basicInfo = basicInfoService.saveBasicInfo(basicInfoDTO);
//        return ResponseEntity.ok(basicInfo);
//    }
//
//    @GetMapping("/all")
//    public List<BasicInfo> getAllBasicInfo() {
//        return basicInfoService.getAllBasicInfo();
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<BasicInfo> getBasicInfoById(@PathVariable int id) {
//        Optional<BasicInfo> basicInfo = basicInfoService.getBasicInfoById(id);
//        return basicInfo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//
//
//}


import com.bloodbank.bloodBank.dto.BasicInfoDTO;
import com.bloodbank.bloodBank.service.BasicInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/basic-info")
public class BasicInfoController {

    @Autowired
    private BasicInfoService basicInfoService;

    @PostMapping
    public ResponseEntity<BasicInfoDTO> saveBasicInfo(@RequestBody BasicInfoDTO basicInfoDTO) {
        BasicInfoDTO savedBasicInfo = basicInfoService.saveBasicInfo(basicInfoDTO);
        return new ResponseEntity<>(savedBasicInfo, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BasicInfoDTO> getBasicInfoById(@PathVariable int id) {
        BasicInfoDTO basicInfoDTO = basicInfoService.getBasicInfoById(id);
        return new ResponseEntity<>(basicInfoDTO, HttpStatus.OK);
    }
}
