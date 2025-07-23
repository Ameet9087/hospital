import React, { useState } from 'react';
import './CheckIn.css';

import { useNavigate } from 'react-router-dom';

const CheckIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    firstName: '',

    middleName: '',

    lastName: '',

    // haveDOB: false,

    religion: '',

    age: '',

    gender: '',

    phoneNumber: '',

    landlineNumber: '',

    address: '',

    email: '',

    careOfPerson: '',

    relationWithPatient: '',

    careOfPersonContact: '',

    visitType: 'Routine',

    visitDate: '',

    visitTime: '',

    referredBy: '',

    isExternal: 'No',

    discount: 0,

    discountPercentage: 0,

    discountAmount: 0,

    subTotal: 0,

    totalAmount: 0,

    changeReturn: 0,

    tender: 0,

    paymentOptions: 'Cash',

    employeeId: '', // Employee ID field

});

const handleChange = (e) => {

  const { name, value, type, checked } = e.target;

  setFormData(prevState => ({

      ...prevState,

      [name]: type === 'checkbox' ? checked : value,

  }));

};
const handleSubmit = async (e) => {

  e.preventDefault();



  const apiUrl = 'http://192.168.1.34:1415/api/new-patient-visits/save-new-patient';



  try {

      const response = await fetch(apiUrl, {

          method: 'POST',

          headers: {

              'Content-Type': 'application/json',

          },

          body: JSON.stringify({

              firstName: formData.firstName,

              middleName: formData.middleName,

              lastName: formData.lastName,

              // haveDOB: formData.haveDOB,

              religion: formData.religion,

              age: parseInt(formData.age, 10),

              gender: formData.gender,

              phoneNumber: formData.phoneNumber,

              landlineNumber: formData.landlineNumber,

              address: formData.address,

              email: formData.email,

              careOfPerson: formData.careOfPerson,

              relationWithPatient: formData.relationWithPatient,

              careOfPersonContact: formData.careOfPersonContact,

              visitType: formData.visitType,

              visitDate: formData.visitDate,

              visitTime: formData.visitTime,

              referredBy: formData.referredBy,

              isExternal: formData.isExternal,

              discount: parseFloat(formData.discount),

              discountPercentage: parseFloat(formData.discountPercentage),

              discountAmount: parseFloat(formData.discountAmount),

              subTotal: parseFloat(formData.subTotal),

              totalAmount: parseFloat(formData.totalAmount),

              changeReturn: parseFloat(formData.changeReturn),

              tender: parseFloat(formData.tender),

              paymentOptions: formData.paymentOptions,

              employeeDTO: {

                  employeeId: parseInt(formData.employeeId, 10),

              },

          }),

      });
      if (response.ok) {

        alert('Appointment added successfully!');

        navigate('/book-appointment');

        setFormData({

            firstName: '',

            middleName: '',

            lastName: '',

            // haveDOB: false,

            religion: '',

            age: '',

            gender: '',

            phoneNumber: '',

            landlineNumber: '',

            address: '',

            email: '',

            careOfPerson: '',

            relationWithPatient: '',

            careOfPersonContact: '',

            visitType: 'Routine',

            visitDate: '',

            visitTime: '',

            referredBy: '',

            isExternal: 'No',

            discount: 0,

            discountPercentage: 0,

            discountAmount: 0,

            subTotal: 0,

            totalAmount: 0,

            changeReturn: 0,

            tender: 0,

            paymentOptions: 'Cash',

            employeeId: '',

        });

    } else {

        alert('Failed to add appointment. Please try again.');

    }

} catch (error) {

    console.error('Error:', error);

    alert('An error occurred. Please try again.');

}

};
  
  return (



    <form onSubmit={handleSubmit}>
    <div className="checkIn__container">
     
      <div className="checkIn__header">
        <h2>New Visit</h2>
      </div>

      <div className="checkIn__topbar">
        <div className="checkIn__field">
          <label>Membership <span className="checkIn__required">*</span></label>
          <select className="checkIn__dropdown">
            <option>General</option>
          </select>
        </div>
        <div className="checkIn__field">
          <label>Price Category:</label>
          <select className="checkIn__dropdown">
            <option>Normal</option>
          </select>
        </div>
      </div>

    <div className="checkIn__content">
    
       <div className="checkIn__section checkIn__section--patient">
      <h3 className="checkIn__section-title">
        <span className="checkIn__section-icon">👤</span> Patient Information
      </h3>
      <div className="checkIn__form">
        <div className="checkIn__form-group">
          <label className="checkIn__label">
           First Name <span className="checkIn__required">*</span>
          </label>
          <div className="checkIn__name-inputs">
            <input
              className="checkIn__input"
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              className="checkIn__input"
              type="text"
              placeholder="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
            <input
              className="checkIn__input"
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* <div className=" checkIn__form-group--dob">
          <label className="checkIn__label">Have DOB?</label>
          <input
                    type="checkbox"
                    name="haveDOB"
                    checked={formData.haveDOB}
                    onChange={handleChange}

                />
        </div> */}
        <div className="checkIn__form-group">
          <label className="checkIn__label">
            Religion <span className="checkIn__required">*</span>
          </label>
          <input className="checkIn__input" type="text"  name="religion"
                    value={formData.religion}
                    onChange={handleChange} />
        </div>
        <div className="checkIn__form-group">
          <label className="checkIn__label">
            Age <span className="checkIn__required">*</span>
          </label>
          <div className="checkIn__age-inputs">
            <input
              className="checkIn__input checkIn__input--age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <select className="checkIn__form-group-years" >
              <option>Years</option>
            </select>
          </div>
        </div>
        <div className="checkIn__form-group">
          <label className="checkIn__label">
            Gender <span className="checkIn__required">*</span>
          </label>
          <select className="checkIn__select"  name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required>
            <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
          </select>
        </div>
        <div className="checkIn__form-group">
          <label className="checkIn__label">
            Phone No. <span className="checkIn__required">*</span>
          </label>
          <div className="checkIn__phone-inputs">
            <input
              className="checkIn__input"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <input
              className="checkIn__input"
              type="text"
              placeholder="LandLine Number"
              name="landlineNumber"
              value={formData.landlineNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="checkIn__form-group">
          <label className="checkIn__label">
            Address <span className="checkIn__required">*</span>
          </label>
          <select className="checkIn__select">
            <option>India</option>
          </select>
          <input
            className="checkIn__input checkIn__input--address"
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="checkIn__form-group">
          <label className="checkIn__label">Email</label>
          <input
            className="checkIn__input"
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="checkIn__form-group">
          <label className="checkIn__label">Care of Person</label>
          <input
            className="checkIn__input"
            type="text"
            placeholder="Care Taker Person"
            name="careOfPerson"
            value={formData.careOfPerson}
            onChange={handleChange}
          />
        </div>
        <div className="checkIn__form-group">
          <label className="checkIn__label">Relation With Patient</label>
          <input className="checkIn__input" type="text" name="relationWithPatient"
                    value={formData.relationWithPatient}
                    onChange={handleChange}/>
        </div>
        <div className="checkIn__form-group">
          <label className="checkIn__label">Care of Person Contact</label>
          <input
            className="checkIn__input"
            type="text"
            placeholder="Care Takers Contact"
            name="careOfPersonContact"
            value={formData.careOfPersonContact}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
      <div className='checkIn-visit-billing'>
        <div className="checkIn__section checkIn__section--visit">
          <h3 className="checkIn__section-title">Visit Information</h3>
          <div className="checkIn__form">
            <div className="checkIn__form-group">
              <label>Department <span className="checkIn__required">*</span></label>
              <input type="text" value="Dental" />
            </div>
            <div className="checkIn__form-group">
              <label>Doctor <span className="checkIn__required">*</span></label>
              <input type="text" placeholder="Doctor's Name" />
            </div>
            <div className="checkIn__form-group">
              <label>Referred By</label>
              <input type="text" placeholder="Enter Name" name='referedBy' value={formData.referredBy} onChange={handleChange}/>
            </div>
            <div className="checkIn__form-group">
              <label>Visit Date <span className="checkIn__required">*</span></label>
              <input type="date" value={formData.visitDate} name='visitDate'  onChange={handleChange}/>
            </div>
            <div className="checkIn__form-group">
              <label>Visit Time <span className="checkIn__required">*</span></label>
              <input type="time" value={formData.visitTime}  onChange={handleChange}/>
            </div>
            <div className=" checkIn__form-group--external">
              <label>External?</label>
              <select
                    name="isExternal"
                    value={formData.isExternal}
                    onChange={handleChange}
                >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
              {/* <button className="checkIn__add-button">+</button> */}
            </div>
          </div>
        </div>

        <div className="checkIn__section checkIn__section--billing">
          <h3 className="checkIn__section-title">Billing Information</h3>
          <div className="checkIn__form">
            <div className="checkIn__billing-item">
              <span>Particular(s)</span>
              <input type="text" value="Admission Fees" disabled />
            </div>
            <div className="checkIn__billing-summary">
              <div className="checkIn__billing-item">
                <span>Discount %</span>
                <input type="number"  name="discount"
                    value={formData.discount}
                    onChange={handleChange} />
              </div>
              <div className="checkIn__billing-item">
                <span>Discount Amount</span>
                <input type="number" name="discountAmount"
                    value={formData.discountAmount}
                    onChange={handleChange}/>
              </div>
              <div className="checkIn__billing-item">
                <span>SubTotal</span>
                <input type="text" name="subTotal"
                    value={formData.subTotal}
                    onChange={handleChange} disabled />
              </div>
              <div className="checkIn__billing-item">
                <span>Total Amount</span>
                <input type="text"  name="totalAmount"
                    value={formData.totalAmount}
                    onChange={handleChange}  disabled />
              </div>
            </div>
            <div className="checkIn__billing-item">
              <span>Tender</span>
              <input type="number" name="tender"
                    value={formData.tender}
                    onChange={handleChange} />
            </div>
            <div className="checkIn__billing-item">
              <span>Change/Return</span>
              <input type="number"  name="changeReturn"
                    value={formData.changeReturn}
                    onChange={handleChange} disabled />
            </div>
            <div className="checkIn__billing-item">
              <span>Payment Options</span>
              <select
                    name="paymentOptions"
                    value={formData.paymentOptions}
                    onChange={handleChange}
                >
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div>
                <label>Employee ID:</label>
                <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type='submit' className="checkIn__print-btn">Print Invoice</button>
          </div>
        </div>
      </div>
      
      </div>
    </div>
    </form>
  );
};

export default CheckIn;
