/* Ravindra_Sanap_BloodStorageDTO.java_24_09_2024_Start */


package com.bloodbank.bloodBank.dto;

import java.util.Date;

public class BloodStorageDTO {
	private int storage_id;
    private Date storagedate;
    private String bloodgroup;
    private int volume;
    private Date expirydate;
    private String storagelocation;
    private String status;
    private int test_id; // This is the ID of the associated BloodTesting

    // Getters and Setters
    public Date getStoragedate() {
        return storagedate;
    }

    public int getStorage_id() {
		return storage_id;
	}

	public void setStorage_id(int storage_id) {
		this.storage_id = storage_id;
	}

	public int getTest_id() {
		return test_id;
	}

	public void setTest_id(int test_id) {
		this.test_id = test_id;
	}

	public void setStoragedate(Date storagedate) {
        this.storagedate = storagedate;
    }

    public String getBloodgroup() {
        return bloodgroup;
    }

    public void setBloodgroup(String bloodgroup) {
        this.bloodgroup = bloodgroup;
    }

    public int getVolume() {
        return volume;
    }

    public void setVolume(int volume) {
        this.volume = volume;
    }

    public Date getExpirydate() {
        return expirydate;
    }

    public void setExpirydate(Date expirydate) {
        this.expirydate = expirydate;
    }

    public String getStoragelocation() {
        return storagelocation;
    }

    public void setStoragelocation(String storagelocation) {
        this.storagelocation = storagelocation;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

 
}

/* Ravindra_Sanap_BloodStorageDTO.java_24_09_2024_End */

