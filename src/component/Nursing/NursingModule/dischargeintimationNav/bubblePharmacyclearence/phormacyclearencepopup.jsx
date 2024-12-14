import React, { useState } from 'react';
import './PharmacyClearence.css';

const PharmacyClearence = () => {
    const [isFormVisible, setIsFormVisible] = useState(true);
  const [formData, setFormData] = useState({
    ipNo: '',
    patientName: '',
    doa: '',
    uhid: '',
    ward: '',
    address: '',
    patientClearedDues: false,
    noReturns: false,
    implant: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleClose = () => {
    setIsFormVisible(false); // Hide the form when the close button is clicked
  };

  if (!isFormVisible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="pharmacy-clearence__overlay">
      <div className="pharmacy-clearence">
        <div className="pharmacy-clearence__header">
          <h2 className="pharmacy-clearence__title">Pharmacy Clearance</h2>
          <div className="pharmacy-clearence__header-buttons">
            
            <button onClick={handleClose} className="pharmacy-clearence__close-btn">×</button>
          </div>
        </div>

        <form className="pharmacy-clearence__form" onSubmit={handleSubmit}>
          {/* Left section for fields */}
          <div className="pharmacy-clearence__content">
            <div className="pharmacy-clearence__fields-section">
              <div className="pharmacy-clearence__form-grid">
                <div className="pharmacy-clearence__form-group">
                  <label className="pharmacy-clearence__label" htmlFor="ipNo">IP No *</label>
                  <input
                    className="pharmacy-clearence__input"
                    type="text"
                    id="ipNo"
                    name="ipNo"
                    value={formData.ipNo}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="pharmacy-clearence__form-group">
                  <label className="pharmacy-clearence__label" htmlFor="patientName">Patient Name *</label>
                  <input
                    className="pharmacy-clearence__input"
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="pharmacy-clearence__form-group">
                  <label className="pharmacy-clearence__label" htmlFor="doa">DOA</label>
                  <input
                    className="pharmacy-clearence__input"
                    type="text"
                    id="doa"
                    name="doa"
                    value={formData.doa}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="pharmacy-clearence__form-group">
                  <label className="pharmacy-clearence__label" htmlFor="uhid">UHID</label>
                  <input
                    className="pharmacy-clearence__input"
                    type="text"
                    id="uhid"
                    name="uhid"
                    value={formData.uhid}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="pharmacy-clearence__form-group">
                  <label className="pharmacy-clearence__label" htmlFor="ward">Ward</label>
                  <input
                    className="pharmacy-clearence__input"
                    type="text"
                    id="ward"
                    name="ward"
                    value={formData.ward}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="pharmacy-clearence__form-group">
                  <label className="pharmacy-clearence__label" htmlFor="address">Address</label>
                  <input
                    className="pharmacy-clearence__input"
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Right section for checkboxes */}
            <div className="pharmacy-clearence__checkbox-section">
              <div className="pharmacy-clearence__checkbox-container">
                <div className="pharmacy-clearence__checkbox-group">
                  <input
                    className="pharmacy-clearence__checkbox"
                    type="checkbox"
                    id="patientClearedDues"
                    name="patientClearedDues"
                    checked={formData.patientClearedDues}
                    onChange={handleInputChange}
                  />
                  <label className="pharmacy-clearence__checkbox-label" htmlFor="patientClearedDues">
                    Patient Cleared Dues
                  </label>
                </div>

                <div className="pharmacy-clearence__checkbox-group">
                  <input
                    className="pharmacy-clearence__checkbox"
                    type="checkbox"
                    id="noReturns"
                    name="noReturns"
                    checked={formData.noReturns}
                    onChange={handleInputChange}
                  />
                  <label className="pharmacy-clearence__checkbox-label" htmlFor="noReturns">
                    No Returns
                  </label>
                </div>

                <div className="pharmacy-clearence__checkbox-group">
                  <input
                    className="pharmacy-clearence__checkbox"
                    type="checkbox"
                    id="implant"
                    name="implant"
                    checked={formData.implant}
                    onChange={handleInputChange}
                  />
                  <label className="pharmacy-clearence__checkbox-label" htmlFor="implant">
                    Implant
                  </label>
                </div>

                <a href="#" className="pharmacy-clearence__pending-link">
                  Pending Initial Details
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PharmacyClearence;