import React, { useState, useEffect } from 'react';
import './UpdateDepartmentForm.css';
import axios from 'axios';
import { API_BASE_URL } from '../api/api';

const UpdateDepartmentForm = ({ department, onClose }) => {
  const [departmentCode, setDepartmentCode] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [parentDepartment, setParentDepartment] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');
  const [departmentNoticeText, setDepartmentNoticeText] = useState('');
  const [departmentHead, setDepartmentHead] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [isActive, setIsActive] = useState('Yes');
  const [isAppointmentApplicable, setIsAppointmentApplicable] = useState('No');

  // Populate form fields when department data is passed for editing
  useEffect(() => {
    if (department) {
      setDepartmentCode(department.departmentCode || '');
      setDepartmentName(department.departmentName || '');
      setParentDepartment(department.parentDepartmentName || '');
      setDepartmentDescription(department.description || '');
      setDepartmentNoticeText(department.noticeText || '');
      setDepartmentHead(department.departmentHead || '');
      setRoomNumber(department.roomNumber || '');
      setIsActive(department.isActive === 'Yes' ? 'Yes' : 'No');
      setIsAppointmentApplicable(department.isAppointmentApplicable === 'Yes' ? 'Yes' : 'No');
    }
  }, [department]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const departmentData = {
      departmentCode,
      departmentName,
      parentDepartmentName: parentDepartment,
      description: departmentDescription,
      noticeText: departmentNoticeText,
      departmentHead,
      roomNumber,
      isActive,
      isAppointmentApplicable,
    };

    try {
      console.log(departmentData);
      
        await axios.put(`${API_BASE_URL}/departments/update-department/${department.departmentId}`, departmentData);
        console.log('Department Updated successfully');
      onClose(); // Close modal after successful operation
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="update-setting-department-form-container">
      <form className="update-setting-department-form" onSubmit={handleSubmit}>
        <h2>{department && department.departmentCode ? 'Update Department' : 'Add Department'}</h2>

        <div className="update-setting-form-group">
          <label>Department Code<span>*</span></label>
          <span>:</span>
          <input
            type="text"
            value={departmentCode}
            onChange={(e) => setDepartmentCode(e.target.value)}
          />
        </div>

        <div className="update-setting-form-group">
          <label>Department Name<span>*</span></label>
          <span>:</span>
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
        </div>

        <div className="update-setting-form-group">
          <label>Parent Department Name</label>
          <span>:</span>
          <select
            name="parentDepartment"
            value={parentDepartment}
            onChange={(e) => setParentDepartment(e.target.value)}
          >
            <option value="">--select--</option>
            <option value="Administration">Administration</option>
            <option value="Account">Account</option>
            <option value="Anesthesia">Anesthesia</option>
            <option value="Billing">Billing</option>
            <option value="BrainOperations">Brain operations</option>
            <option value="CSSD">CSSD</option>
            <option value="CTMRI">CT/MRI</option>
            <option value="CTVS">CTVS</option>
            <option value="CabinSuite">Cabin/Deluxe/Suite</option>
            <option value="Cardiology">Cardiology</option>
            <option value="CathLab">Cath lab</option>
            <option value="CleaningDepartment">Cleaning Department</option>
            <option value="Dental">Dental</option>
            <option value="Dermatology">Dermatology & Cosmatology</option>
            <option value="Dialysis">Dialysis</option>
            <option value="Dietary">Dietary</option>
            <option value="Dispensary">Dispensary</option>
            <option value="EmergencyCasualty">Emergency/Casualty</option>
            <option value="ENT">Ear-Nose-Throat</option>
            <option value="Gynecology">Gynecology</option>
            <option value="MaternityWard">Maternity Ward</option>
            <option value="MedicalRecords">Medical Record Department</option>
            <option value="Medicine">Medicine</option>
            <option value="Neurosurgery">Neurosurgery</option>
            <option value="NST">NST</option>
            <option value="NursingStation">Nursing Station</option>
            <option value="NICU">Neonatal Intensive Care Unit</option>
            <option value="Nephrology">Nephrology</option>
            <option value="Nursing">Nursing</option>
            <option value="ObstetricGynaecology">
              Obstetric & Gynaecology
            </option>
            <option value="Oncologist">Oncologist</option>
            <option value="OperationTheatre">Operation Theatre</option>
            <option value="OperationsDepartment">Operations Department</option>
            <option value="Ophthalmology">Ophthalmology</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="OrthopedicSpine">Orthopedic/Spine</option>
            <option value="OutPatientDepartment">Out Patient Department</option>
            <option value="PediatricNeonatology">Pediatric Neonatology</option>
            <option value="PlasticSurgeon">Plastic Surgeon</option>
            <option value="PostOp">Post-Op</option>
            <option value="Pathology">Pathology</option>
            <option value="Pediatric">Pediatric</option>
            <option value="PediatricSurgeon">Pediatric Surgeon</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Physiotherapy">Physiotherapy</option>
            <option value="Psychiatry">Psychiatry</option>
            <option value="Pulmonary">Pulmonary</option>
            <option value="Radiology">Radiology</option>
            <option value="Reception">Reception</option>
            <option value="RheumatoidArthritis">Rheumatoid Arthritis</option>
            <option value="Security">Security</option>
            <option value="SSF">Social Security Fund</option>
            <option value="Surgery">Surgery</option>
            <option value="TravelMedicine">Travel Medicine</option>
            <option value="Urology">Urology</option>
            <option value="XRayDepartment">X-Ray Department</option>
          </select>
        </div>

        <div className="update-setting-form-group">
          <label>Department Description</label>
          <span>:</span>
          <textarea
            value={departmentDescription}
            onChange={(e) => setDepartmentDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="update-setting-form-group">
          <label>Department Notice Text</label>
          <span>:</span>
          <textarea
            value={departmentNoticeText}
            onChange={(e) => setDepartmentNoticeText(e.target.value)}
          ></textarea>
        </div>

        <div className="update-setting-form-group">
          <label>Department Head</label>
          <span>:</span>
          <input
            type="text"
            value={departmentHead}
            onChange={(e) => setDepartmentHead(e.target.value)}
          />
        </div>

        <div className="update-setting-form-group">
          <label>Room Number</label>
          <span>:</span>
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
        </div>

        <div className="update-setting-form-group">
          <label>Is Active</label>
          <span>:</span>
          <select
            value={isActive}
            onChange={(e) => setIsActive(e.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="update-setting-form-group">
          <label>Is Appointment Applicable</label>
          <span>:</span>
          <select
            value={isAppointmentApplicable}
            onChange={(e) => setIsAppointmentApplicable(e.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="update-setting-form-group submit-btn">
          <button type="submit">{department && department.departmentCode ? 'Update' : 'Add'}</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDepartmentForm;
