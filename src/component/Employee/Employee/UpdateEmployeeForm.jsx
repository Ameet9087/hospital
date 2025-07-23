import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import './AddEmployeeForm.css';

const UpdateEmployeeForm = ({ onClose }) => {
  const [employeeData, setEmployeeData] = useState({
    salutation: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: '',
    kmpdcNo: '',
    knncNo: '',
    knhpcNo: '',
    contactNumber: '',
    email: '',
    signatureShort: '',
    signatureLong: '',
    department: '',
    role: '',
    type: '',
    dateOfJoining: '',
    contactAddress: '',
    kraPin: '',
    taxPercentage: '',
    incentiveApplicable: false,
    extension: '',
    speedDial: '',
    officeHour: '',
    roomNo: '',
    bloodGroup: '',
    drivingLicenseNo: '',
    isActive: false,
    radiologySignature: '',
    displaySequence: '',
    signatureImage: null,
  });
  const [showTable, setShowTable] = useState(false); // State to manage table visibility

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (name === 'appointmentApplicable') {
      setShowTable(checked);
    }
  };

  const handleFileChange = (e) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      signatureImage: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Employee Data:', employeeData);
    onClose();
    
  };

  return (
    <div className="add-employee-modal-overlay">
     
      <div className="add-employee-form">
       
        <form onSubmit={handleSubmit}>
        <div className="add-employee-form-header">
  <h2>Update Employee</h2>
  <Button onClick={onClose} className="emp-cancel-button">X</Button>
  </div>
       
          <div className="add-employee-grid">
            <div className='emp-form-add'>
            <div className="add-employee-group">
              <label className="emp-input">Salutation:</label>
              <select  className="emp-input" name="salutation" value={employeeData.salutation} onChange={handleChange}>
                <option value="">--select--</option>
                <option>Mr</option>
                <option>Ms</option>
                <option>Mrs</option>
                <option>Dr</option>
              </select>
            </div>
            <div className="add-employee-group">
              <label className="emp-input">First Name*:</label>
              <input className="emp-input" type="text" name="firstName" value={employeeData.firstName} onChange={handleChange}  required />
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Middle Name:</label>
              <input  className="emp-input" type="text" name="middleName" value={employeeData.middleName} onChange={handleChange}  />
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Last Name*:</label>
              <input className="emp-input" type="text" name="lastName" value={employeeData.lastName} onChange={handleChange}  required />
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Date Of Birth*:</label>
              <input  className="emp-input" type="date" name="dob" value={employeeData.dob} onChange={handleChange} required />
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Gender*:</label>
              <select className="emp-input" name="gender" value={employeeData.gender} onChange={handleChange} required>
                <option value="">--select--</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="add-employee-group">
              <label className="emp-input">KMPDC NO:</label>
              <input className="emp-input" type="text" name="kmpdcNo" value={employeeData.kmpdcNo} onChange={handleChange}  />
            </div>
            <div className="add-employee-group">
              <label className="emp-input">KNNC NO:</label>
              <input className="emp-input" type="text" name="knncNo" value={employeeData.knncNo} onChange={handleChange} />
            </div>
            <div className="add-employee-group">
              <label className="emp-input">KNHPC NO:</label>
              <input className="emp-input" type="text" name="knhpcNo" value={employeeData.knhpcNo} onChange={handleChange}  />
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Contact Number:</label>
              <input className="emp-input" type="text" name="contactNumber" value={employeeData.contactNumber} onChange={handleChange} />
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Email Id:</label>
              <input className="emp-input" type="email" name="email" value={employeeData.email} onChange={handleChange}  />
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Signature(Short):</label>
              <textarea name="signatureShort" value={employeeData.signatureShort} onChange={handleChange}></textarea>
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Signature(Long):</label>
              <textarea name="signatureLong" value={employeeData.signatureLong} onChange={handleChange}></textarea>
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Is Active:</label>
              <input  className="emp-input" type="checkbox" name="isActive" checked={employeeData.isActive} onChange={handleChange} />
            </div>
            </div>
            <div className='emp-depart'>
            <div className="add-employee-group">
              <label className="emp-input">Employee Department*:</label>
              <select  className="emp-input" name="department" value={employeeData.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                <option>Account</option>
                {/* Add other department options */}
              </select>
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Employee Role:</label>
              <select  className="emp-input" name="role" value={employeeData.role} onChange={handleChange}>
                <option value="">Select Role</option>
                {/* Add role options */}
              </select>
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Employee Type:</label>
              <select  className="emp-input" name="type" value={employeeData.type} onChange={handleChange}>
                <option value="">Select Type</option>
                <option>Full Time</option>
                {/* Add other type options */}
              </select>
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Date Of Joining:</label>
              <input className="emp-input" type="date" name="dateOfJoining" value={employeeData.dateOfJoining} onChange={handleChange} />
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Contact Address:</label>
              <textarea name="contactAddress" value={employeeData.contactAddress} onChange={handleChange}></textarea>
            </div>
            <div className="add-employee-group">
              <label className="emp-input">KRA PIN:</label>
              <input className="emp-input" type="text" name="kraPin" value={employeeData.kraPin} onChange={handleChange}  />
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Tax percentage:</label>
              <input  className="emp-input" type="number" name="taxPercentage" value={employeeData.taxPercentage} onChange={handleChange}  />
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Is Incentive Applicable:</label>
              <input className="emp-input" type="checkbox" name="incentiveApplicable" checked={employeeData.incentiveApplicable} onChange={handleChange} />
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Extension:</label>
              <input  className="emp-input" type="text" name="extension" value={employeeData.extension} onChange={handleChange}  />
            </div>
            <div className="add-employee-group">
              <label className="emp-input">SpeedDial:</label>
              <input className="emp-input" type="text" name="speedDial" value={employeeData.speedDial} onChange={handleChange}  />
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Office Hour:</label>
              <textarea name="officeHour" value={employeeData.officeHour} onChange={handleChange}></textarea>
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Room No.:</label>
              <input  className="emp-input" type="text" name="roomNo" value={employeeData.roomNo} onChange={handleChange}  />
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Blood Group:</label>
              <select className="emp-input" name="bloodGroup" value={employeeData.bloodGroup} onChange={handleChange}>
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>O+</option>
                <option>B+</option>
                <option>AB+</option>
                <option>A-</option>
                <option>O-</option>
                <option>B-</option>
                <option>AB-</option>
              </select>
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Driving License No:</label>
              <input className="emp-input" type="text" name="drivingLicenseNo" value={employeeData.drivingLicenseNo} onChange={handleChange}  />
            </div>
            </div>
         
           
            <div className='emp-radio-sign'>
              <div className='emp-radio-sign'>
            <div className="add-employee-group">
              <label className="emp-input">Radiology Signature:</label>
              <textarea name="radiologySignature" value={employeeData.radiologySignature} onChange={handleChange}></textarea>
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Display Sequence:</label>
              <input className="emp-input" type="text" name="displaySequence" value={employeeData.displaySequence} onChange={handleChange}/>
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Signature Image:</label>
              <input   type="file" name="signatureImage" onChange={handleFileChange} className="emp-choose-file" />
            </div>
          </div>
         
         
          </div>
            </div>
            <div className='emp-app'>
            <div className="add-employee-groups">
            <label className="emp-input">Appointment Applicable?</label>
            <input  className="emp-input" type="checkbox" name="appointmentApplicable" checked={employeeData.appointmentApplicable} onChange={handleChange} />
          </div>
          {showTable && (
                <table className="service-table">
                  <thead>
                    <tr>
                      <th>Service Name  </th>
                      <th>Service Item Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <label>
                          <input type="checkbox" name="serviceName1"  />
                          OPD (New Patient)
                        </label>
                      </td>
                      <td><input type="text" name="serviceItem1" /></td>
                    </tr>
                    <tr>
                      <td>
                        <label>
                          <input type="checkbox" name="serviceName2" />
                          OPD (Followup Patient)
                        </label>
                      </td>
                      <td><input type="text" name="serviceItem2" /></td>
                    </tr>
                    <tr>
                      <td>
                        <label>
                          <input type="checkbox" name="serviceName3" />
                          OPD (Old Patient)
                        </label>
                      </td>
                      <td><input type="text" name="serviceItem3" /></td>
                    </tr>
                    <tr>
                      <td>
                        <label>
                          <input type="checkbox" name="serviceName4" />
                          OPD (Referral Patient)
                        </label>
                      </td>
                      <td><input type="text" name="serviceItem4" /></td>
                    </tr>
                  </tbody>
                </table>
              )}
          <div className="add-employee-buttons">
            <button type="submit" className="add-employee-button">Add</button>
          </div>
            </div>
        </form>
      </div>
      </div>
   
  );
};


export default UpdateEmployeeForm;
