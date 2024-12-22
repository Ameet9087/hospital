/* Ravindra_Sanap_BloodStorageController.java_24_09_2024_Start */


package com.bloodbank.bloodBank.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.bloodbank.bloodBank.dto.BloodStorageDTO;
import com.bloodbank.bloodBank.entity.BloodStorage;
import com.bloodbank.bloodBank.service.serviceImplementation.BloodStorageServiceImpl;

@RestController
@CrossOrigin(value="*")
@RequestMapping("/api/bloodstorage")
public class BloodStorageController {

	
	@Autowired
	BloodStorageServiceImpl bloodstorageserviceimpl;
	
	@PostMapping("/add")
	public BloodStorageDTO addbloodstorage(@RequestBody BloodStorageDTO bloodstorage)
	{
		return bloodstorageserviceimpl.addToBloodStorage(bloodstorage);
	}
	
	@PutMapping("/update/{storage_id}")
	public BloodStorageDTO updatebloodstorage(@RequestBody BloodStorageDTO bloodstorage, @PathVariable int storage_id) {
	    return bloodstorageserviceimpl.updateBloodStorage(bloodstorage, storage_id);
	}
	
	@GetMapping("/getall")
    public List<BloodStorageDTO> getAllBloodStorage() {
        return bloodstorageserviceimpl.allBloodStorage();
    }
	
	 @GetMapping("/get/{storage_id}")
	    public BloodStorageDTO getBloodStorageById(@PathVariable int storage_id) {
	        return bloodstorageserviceimpl.getBloodStorage(storage_id);
	    }
	 
	 @DeleteMapping("/delete/{storage_id}")
	 public void deletebyId(@PathVariable int storage_id)
	 {
		 bloodstorageserviceimpl.deletebyid(storage_id);
	 }
	
}


/* Ravindra_Sanap_BloodStorageController.java_24_09_2024_End */

