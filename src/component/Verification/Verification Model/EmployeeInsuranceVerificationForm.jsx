/* Mohini_Verification Model_EmployeeInsuranceVerificationForm_14/10/24 */
import React, { useState } from 'react';
import './EmployeeVerification.css';

const EmployeeInsuranceVerificationForm = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    email: '',
    insuranceProvider: '',
    policyNumber: '',
    groupNumber: '',
    effectiveDate: '',
    expirationDate: '',
    typeOfPlan: '',
    coverageType: '',
    coPayAmount: '',
    deductibleAmount: '',
    coverageDetails: '',
    preAuthRequirements: '',
    department: '',
    jobTitle: '',
    employmentStatus: '',
    supervisorName: '',
    hireDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <form className="employee-verification-form" onSubmit={handleSubmit}>
      <div className="employee-verification-form-container">
        <div className="employee-verification-left">
          <div className="employee-verification-form-group">
            <label>Employee ID:</label>
            <input
              type="text"
              name="employeeId"
              className="employee-verification-input"
              value={formData.employeeId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              className="employee-verification-input"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              className="employee-verification-input"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Gender:</label>
            <select name="gender" className="employee-verification-select" value={formData.gender} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="employee-verification-form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              className="employee-verification-input"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className="employee-verification-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Insurance Provider:</label>
            <input
              type="text"
              name="insuranceProvider"
              className="employee-verification-input"
              value={formData.insuranceProvider}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Policy Number:</label>
            <input
              type="text"
              name="policyNumber"
              className="employee-verification-input"
              value={formData.policyNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Group Number:</label>
            <input
              type="text"
              name="groupNumber"
              className="employee-verification-input"
              value={formData.groupNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Effective Date:</label>
            <input
              type="date"
              name="effectiveDate"
              className="employee-verification-input"
              value={formData.effectiveDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Expiration Date:</label>
            <input
              type="date"
              name="expirationDate"
              className="employee-verification-input"
              value={formData.expirationDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Type of Plan:</label>
            <input
              type="text"
              name="typeOfPlan"
              className="employee-verification-input"
              value={formData.typeOfPlan}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Coverage Type:</label>
            <input
              type="text"
              name="coverageType"
              className="employee-verification-input"
              value={formData.coverageType}
              onChange={handleChange}
              required
            />
          </div>

        

        
          </div>

        
          <div className="employee-verification-right">
          <div className="employee-verification-form-group">
            <label>Co-Pay Amount:</label>
            <input
              type="number"
              name="coPayAmount"
              className="employee-verification-input"
              value={formData.coPayAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="employee-verification-form-group">
            <label>Deductible Amount:</label>
            <input
              type="number"
              name="deductibleAmount"
              className="employee-verification-input"
              value={formData.deductibleAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="employee-verification-form-group">
            <label>Coverage Details:</label>
            <textarea
              name="coverageDetails"
              className="employee-verification-textarea"
              value={formData.coverageDetails}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Pre-Authorization Requirements:</label>
            <textarea
              name="preAuthRequirements"
              className="employee-verification-textarea"
              value={formData.preAuthRequirements}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Department:</label>
            <input
              type="text"
              name="department"
              className="employee-verification-input"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Job Title:</label>
            <input
              type="text"
              name="jobTitle"
              className="employee-verification-input"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Employment Status:</label>
            <input
              type="text"
              name="employmentStatus"
              className="employee-verification-input"
              value={formData.employmentStatus}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Supervisor Name:</label>
            <input
              type="text"
              name="supervisorName"
              className="employee-verification-input"
              value={formData.supervisorName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Hire Date:</label>
            <input
              type="date"
              name="hireDate"
              className="employee-verification-input"
              value={formData.hireDate}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="employee-verification-submit">Submit</button>

          </div>
          
       
      </div>
    </form>
  );
};

export default EmployeeInsuranceVerificationForm;
/* Mohini_Verification Model_EmployeeInsuranceVerificationForm_14/10/24 */
