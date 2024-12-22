package com.bloodbank.bloodBank.service;

import java.util.List;



import com.bloodbank.bloodBank.dto.BloodIssueDTO;
public interface BloodIssueService {

	public List<BloodIssueDTO> getAllBloodIssue();
	public BloodIssueDTO createBloodIssue(BloodIssueDTO bloodIssueDTO);
	
	public BloodIssueDTO bloodIssueById(int id);
	public BloodIssueDTO updateBloodIssueById(int id, BloodIssueDTO bloodIssueDetails);
	public void deleteBloodIssueById(int id);
}