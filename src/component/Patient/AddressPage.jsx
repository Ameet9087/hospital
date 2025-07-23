 //prachi parab patientRegisteration css 13/9

import React, { useEffect, useState } from "react";
import "./AddressPage.css";

const AddressPage = ({ sendaddressdata, addressData }) => {
  const [addressDataPatient, setAddressDataPatinet] = useState({
    addressType: "Temporary",
    street1: "",
    street2: "",
    birthCountry: "USA",
    state: "New York",
    city: "",
    zipCode: "",
  });

  useEffect(() => {
    setAddressDataPatinet({
      addressType: addressData?.addressType || "",
      street1: addressData?.street1 || "",
      street2: addressData?.street2 || "",
      birthCountry: addressData?.birthCountry || "",
      state: addressData?.state || "",
      city: addressData?.city || "",
      zipCode: addressData?.birthCountry || "",
    });
  }, [addressData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressDataPatinet((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    sendaddressdata({ ...addressDataPatient, [name]: value });
  };

  return (
    <div className="address-page-container">
      <div className="address-page-main-content">
        <h5>Address Information</h5>
        <form className='address-page-form'>
          <div className="address-page-form-row">
            <div className="address-page-form-group">
              <label htmlFor="addressType">Address Type<span className="mandatory">*</span> :</label>
              <select
                id="addressType"
                name="addressType"
                value={addressDataPatient.addressType}
                onChange={handleChange}
                required
              >
                <option value="Temporary">Temporary</option>
                <option value="Permanent">Permanent</option>
              </select>
            </div>
            <div className="address-page-form-group">
              <label htmlFor="street1">Street 1<span className="mandatory">*</span> :</label>
              <input
                type="text"
                id="street1"
                name="street1"
                value={addressDataPatient.street1}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="address-page-form-row">
            <div className="address-page-form-group">
              <label htmlFor="street2">Street 2:</label>
              <input
                type="text"
                id="street2"
                name="street2"
                value={addressDataPatient.street2}
                onChange={handleChange}
              />
            </div>

            <div className="address-page-form-group">
              <label htmlFor="birthCountry">Birth Country<span className="mandatory">*</span>:</label>
              <select
                id="birthCountry"
                name="birthCountry"
                value={addressDataPatient.birthCountry}
                onChange={handleChange}
                required
              >
                <option value="country"> Birth Country</option>
                <option value="India">India</option>
                <option value="Kenya">Kenya</option>
                <option value="Japan">Japan</option>
                <option value="France">France</option>
                {/* Add more country options */}
              </select>
            </div>
          </div>
          <div className="address-page-form-row">
            <div className="address-page-form-group">
              <label htmlFor="state">State<span className="mandatory">*</span> :</label>
              <select
                id="state"
                name="state"
                value={addressDataPatient.state}
                onChange={handleChange}
                required
              >
                <option value="State"> Current State</option>
                <option value="India">India</option>
                <option value="Kenya">Kenya</option>
                <option value="Japan">Japan</option>
                <option value="France">France</option>
              </select>
            </div>
            <div className="address-page-form-group">
              <label htmlFor="city">City<span className="mandatory">*</span> :</label>
              <input
                type="text"
                id="city"
                name="city"
                value={addressDataPatient.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="address-page-form-row">
            <div className="address-page-form-group">
              <label htmlFor="zipCode">Zip Code:</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={addressDataPatient.zipCode}
                onChange={handleChange}
              />
            </div>
            <div className="address-page-form-group"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressPage;
