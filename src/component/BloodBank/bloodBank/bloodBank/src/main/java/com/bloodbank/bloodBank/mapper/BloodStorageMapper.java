package com.bloodbank.bloodBank.mapper;

import com.bloodbank.bloodBank.entity.BloodStorage;
import com.bloodbank.bloodBank.dto.BloodStorageDTO;

public class BloodStorageMapper {

    // Convert BloodStorage to BloodStorageDTO
    public static BloodStorageDTO toDTO(BloodStorage bloodStorage) {
        if (bloodStorage == null) {
            return null;
        }

        BloodStorageDTO dto = new BloodStorageDTO();
        dto.setStorage_id(bloodStorage.getStorage_id()); // Assuming this is the ID field
        dto.setStoragedate(bloodStorage.getStoragedate());
        dto.setBloodgroup(bloodStorage.getBloodgroup());
        dto.setVolume(bloodStorage.getVolume());
        dto.setExpirydate(bloodStorage.getExpirydate());
        dto.setStoragelocation(bloodStorage.getStoragelocation());
        dto.setStatus(bloodStorage.getStatus());

        return dto;
    }

    // Convert BloodStorageDTO to BloodStorage
    public static BloodStorage toEntity(BloodStorage dto) {
        if (dto == null) {
            return null;
        }

        BloodStorage bloodStorage = new BloodStorage();
        bloodStorage.setStorage_id(dto.getStorage_id()); // Assuming this is the ID field
        bloodStorage.setStoragedate(dto.getStoragedate());
        bloodStorage.setBloodgroup(dto.getBloodgroup());
        bloodStorage.setVolume(dto.getVolume());
        bloodStorage.setExpirydate(dto.getExpirydate());
        bloodStorage.setStoragelocation(dto.getStoragelocation());
        bloodStorage.setStatus(dto.getStatus());

        return bloodStorage;
    }
}
