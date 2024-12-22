package com.bloodbank.bloodBank.service.serviceImplementation;

import java.util.List;
import java.util.stream.Collectors;

import com.bloodbank.bloodBank.exception.ResourceNotFoundExceptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;





import com.bloodbank.bloodBank.dto.BloodRequestDTO;
import com.bloodbank.bloodBank.dto.DoctorDTO;
import com.bloodbank.bloodBank.exception.ResourceNotFoundException;
import com.bloodbank.bloodBank.entity.Doctor;
import com.bloodbank.bloodBank.repository.DoctorRepository;
import com.bloodbank.bloodBank.service.DoctorService;


@Service
public class DoctorServiceImpl implements DoctorService{

	 @Autowired
	 DoctorRepository doctorRepository;
	 
		public List<DoctorDTO> getAllDoctor() {
			return doctorRepository.findAll().stream().map(this::convertEntityToDTO).collect(Collectors.toList());
		}

		private DoctorDTO convertEntityToDTO(Doctor doctor) {
			DoctorDTO doctorDTO = new DoctorDTO();

			doctorDTO.setDoctorName(doctor.getDoctorName());
			doctorDTO.setDoctorId(doctor.getDoctorId());

			List<BloodRequestDTO> bloodRequestDTOs = doctor.getBloodRequest().stream().map(bloodRequest -> {
				BloodRequestDTO bloodRequestDTO = new BloodRequestDTO();
				
				bloodRequestDTO.setRequestId(bloodRequest.getRequestId()); // Set requestId here
				//bloodRequestDTO.setPatientName(bloodRequest.getPatientName());
				bloodRequestDTO.setBloodGroup(bloodRequest.getBloodGroup());
				bloodRequestDTO.setRequiredUnits(bloodRequest.getRequiredUnits());
				bloodRequestDTO.setRequestDate(bloodRequest.getRequestDate());
				bloodRequestDTO.setRequiredDate(bloodRequest.getRequiredDate());
				bloodRequestDTO.setStatus(bloodRequest.getStatus());
				bloodRequestDTO.setContactInformation(bloodRequest.getContactInformation());

				return bloodRequestDTO;
			}).collect(Collectors.toList());

			doctorDTO.setBloodRequest(bloodRequestDTOs);

			return doctorDTO;
		}

		public DoctorDTO createDoctor(DoctorDTO doctorDTO) {

			Doctor doctor = new Doctor();
			doctor.setDoctorName(doctorDTO.getDoctorName());
			doctor.setDoctorId(doctorDTO.getDoctorId());

			Doctor savedDoctor = doctorRepository.save(doctor);

			DoctorDTO savedDoctorDTO = convertEntityToDTO(savedDoctor);

			return savedDoctorDTO;
		}

		public DoctorDTO doctorById(int id) {
			Doctor doctor = doctorRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundExceptions("Doctor not found with id: " + id));
			return convertEntityToDTO(doctor);
		}

		public DoctorDTO updateDoctorById(int id, DoctorDTO doctorDTO) {
			Doctor existingDoctor = doctorRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundExceptions("Doctor not found with id: " + id));

			existingDoctor.setDoctorName(doctorDTO.getDoctorName());

			Doctor doctor = doctorRepository.save(existingDoctor);

			return convertEntityToDTO(doctor);
		}

		public void deleteDoctorById(int id) {
			Doctor doctor = doctorRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundExceptions("DoctorDoctorDTO not found with id: " + id));
			doctorRepository.delete(doctor);
		}
	
}
