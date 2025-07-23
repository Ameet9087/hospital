import React, { useState } from 'react';
import './AddNewPateint.css';

const AddNewPatient = () => {
  const [formData, setFormData] = useState({
    name: '',
    middleName: '',
    badhe: '',
    dob: '',
    religion: '',
    age: '',
    gender: '',
    phoneNo: '',
    address: '',
    email: '',
    careOfPerson: '',
    relationWithPatient: '',
    careOfPersonContact: '',
    department: '',
    doctor: '',
    referredBy: '',
    visitDate: '',
    visitTime: '',
    external: false,
    discountPercentage: 0,
    discountAmount: 0,
    tender: 0,
    changeReturn: 0,
    paymentOptions: 'Cash',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const calculateSubtotal = () => {
    return 1000;
  };

  const calculateTotalAmount = () => {
    return calculateSubtotal() - formData.discountAmount;
  };

  const handlePrintInvoice = () => {
    // Implement the print invoice functionality
  };

  return (
    <div className="add-new-patient-container">
      {/* Patient Information */}
      <div className="add-new-patient-info">
        <h2>Patient Information</h2>
        <div className="add-new-patient-form-group">
          <label htmlFor="name">Name*</label>
          <div className="add-new-patient-name-fields">
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
            <input type="text" id="middleName" name="middleName" value={formData.middleName} onChange={handleInputChange} />
            <input type="text" id="badhe" name="badhe" value={formData.badhe} onChange={handleInputChange} />
          </div>
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="dob">Have DOB?</label>
          <input type="text" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} />
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="religion">Religion*</label>
          <select id="religion" name="religion" value={formData.religion} onChange={handleInputChange}>
            <option value="">Select Religion</option>
            {/* Add more religion options */}
          </select>
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="age">Age*</label>
          <div className="age-fields">
            <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} />
            <span>Years</span>
          </div>
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="gender">Gender*</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="phoneNo">Phone No.*</label>
          <input type="text" id="phoneNo" name="phoneNo" value={formData.phoneNo} onChange={handleInputChange} />
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="address">Address*</label>
          <div className="address-fields">
            <select id="address" name="address" value={formData.address} onChange={handleInputChange}>
              <option value="">Select Country</option>
              {/* Add more country options */}
            </select>
            <input type="text" id="addressLine" name="addressLine" value={formData.addressLine} onChange={handleInputChange} />
            <input type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} />
          </div>
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="careOfPerson">Care of Person</label>
          <input type="text" id="careOfPerson" name="careOfPerson" value={formData.careOfPerson} onChange={handleInputChange} />
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="relationWithPatient">Relation With Patient</label>
          <select id="relationWithPatient" name="relationWithPatient" value={formData.relationWithPatient} onChange={handleInputChange}>
            <option value="">Select Relation</option>
            {/* Add more relation options */}
          </select>
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="careOfPersonContact">Care of Person Contact</label>
          <input type="text" id="careOfPersonContact" name="careOfPersonContact" value={formData.careOfPersonContact} onChange={handleInputChange} />
        </div>
      </div>

      {/* Visit Information */}
      <div className="add-new-patient-visit-info">
        <h2>Visit Information</h2>
        <div className="add-new-patient-form-group">
          <label htmlFor="department">Department*</label>
          <input type="text" id="department" name="department" value={formData.department} onChange={handleInputChange} />
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="doctor">Doctor*</label>
          <input type="text" id="doctor" name="doctor" value={formData.doctor} onChange={handleInputChange} />
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="referredBy">Referred By</label>
          <input type="text" id="referredBy" name="referredBy" value={formData.referredBy} onChange={handleInputChange} />
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="visitDate">Visit Date*</label>
          <input type="date" id="visitDate" name="visitDate" value={formData.visitDate} onChange={handleInputChange} />
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="visitTime">Visit Time*</label>
          <input type="time" id="visitTime" name="visitTime" value={formData.visitTime} onChange={handleInputChange} />
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="external">External?</label>
          <input type="checkbox" id="external" name="external" checked={formData.external} onChange={handleInputChange} />
        </div>
      </div>

      {/* Billing Information */}
      <div className="billing-info">
        <h2>Billing Information</h2>
        <div className="add-new-patient-form-group">
          <label htmlFor="consultationCharges">Consultation Charges</label>
          <input type="text" id="consultationCharges" name="consultationCharges" value={1000} readOnly />
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="discountPercentage">Discount %</label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleInputChange}
          />
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="discountAmount">Discount Amount</label>
          <input
            type="number"
            id="discountAmount"
            name="discountAmount"
            value={formData.discountAmount}
            onChange={handleInputChange}
          />
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="subTotal">Subtotal</label>
          <input type="text" id="subTotal" name="subTotal" value={calculateSubtotal()} readOnly />
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="totalAmount">Total Amount</label>
          <input type="text" id="totalAmount" name="totalAmount" value={calculateTotalAmount()} readOnly />
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="tender">Tender</label>
          <input
            type="number"
            id="tender"
            name="tender"
            value={formData.tender}
            onChange={handleInputChange}
          />
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="changeReturn">Change/Return</label>
          <input
            type="text"
            id="changeReturn"
            name="changeReturn"
            value={formData.changeReturn}
            readOnly
          />
        </div>
        <div className="add-new-patient-form-group">
          <label htmlFor="paymentOptions">Payment Options</label>
          <select
            id="paymentOptions"
            name="paymentOptions"
            value={formData.paymentOptions}
            onChange={handleInputChange}
          >
            <option value="cash">Cash</option>
            {/* Add more payment options */}
          </select>
        </div>
        <button className="print-invoice-btn" onClick={handlePrintInvoice}>
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default AddNewPatient;