import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './LocationMaster.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function LocationMaster() {

  const location = useLocation();
  const { selectedSocName } = location.state || {};

  const [socName, setSocName] = useState(selectedSocName || '');


  useEffect(() => {
    if (selectedSocName) {
      setSocName(selectedSocName); // Set the selected socName on page load
    }
  }, [selectedSocName]);

  const handleChangeSOC = (e) => {
    setSocName(e.target.value); // Update the input field value when the user types
  };

  const [locationData, setLocationData] = useState({
    locationName: '',
    socName: '',
    currentDiscountPolicy: '',
    locationCode: '',
    hospitalName: '',
    locationAddress: '',
    phone: '',
    drugLicenseNo: '',
    squareFeetNo: '',
    dhcpSequence: '',
    toAddress: '',
    importNormalRangesFromLocation: false,
    parametersCount: 0,
    providentFundCode: '',
    employeeNoStartsWith: '',
    description: '',
    emailId: '',
    helpMessage: '',
    nonEmerStartTmeg: '',
    nonEmerEndTmeg: '',
    slotsOpenForWaitingList: '',
    transitDeptForOnlineIssues: '',
    stateCode: '',
    gstNo: '',
    treatAsSeparateCompany: false,
    socId: 10,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocationData({
      ...locationData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.0.101:8086/api/location-masters', locationData);
      console.log('Location saved:', response.data);
      alert('Location data saved successfully.');
    } catch (error) {
      console.error('Error saving location:', error);
      alert('Failed to save location data.');
    }
  };

  const navigate = useNavigate();

  // Function to handle icon click
  const handleSearchClick = () => {
    // Navigate to a different page, e.g., '/search-page'
    navigate('/display-SocMaster');
  };

  return (
    <div className="location-master">
      {/* Header */}
      <div className="location-master__header">
        <h3>Location Master</h3>
      </div>
      
      {/* Form Container */}
      <form onSubmit={handleSubmit} className="location-master__form-container">
        {/* Left Column */}
        <div className="location-master__left-column">
          <div className="location-master__form-group">
            <label>Location Name: *</label>
            <input type="text" name="locationName" value={locationData.locationName} onChange={handleChange} required />
          </div>
          <div className="location-master__form-group">
            <label>SOC Name: *</label>
            <input type="text" name="socName" value={socName} onChange={handleChangeSOC} required />
            <button
              type="button"
              className="search-icon-button"
              onClick={handleSearchClick}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <div className="location-master__form-group">
            <label style={{width:"100px"}}>Current Discount Policy:</label>
            <input type="text" name="currentDiscountPolicy" value={locationData.currentDiscountPolicy} onChange={handleChange} />
          </div>
          <div className="location-master__form-group">
            <label>Location Code:</label>
            <input type="text" name="locationCode" value={locationData.locationCode} onChange={handleChange} />
          </div>
          <div className="location-master__form-group">
            <label>Hospital Name:</label>
            <input type="text" name="hospitalName" value={locationData.hospitalName} onChange={handleChange} />
          </div>
          <div className="location-master__form-group">
            <label>Location Address:</label>
            <textarea name="locationAddress" value={locationData.locationAddress} onChange={handleChange}></textarea>
          </div>
          <div className="location-master__form-group">
            <label>Phone:</label>
            <input type="text" name="phone" value={locationData.phone} onChange={handleChange} />
          </div>
          <div className="location-master__form-group">
            <label>Drug License No:</label>
            <input type="text" name="drugLicenseNo" value={locationData.drugLicenseNo} onChange={handleChange} />
          </div>
          <div className="location-master__form-group">
            <label>Square Feet No:</label>
            <input type="text" name="squareFeetNo" value={locationData.squareFeetNo} onChange={handleChange} />
          </div>
          <div className="location-master__form-group">
            <label>DHCP Sequence:</label>
            <input type="text" name="dhcpSequence" value={locationData.dhcpSequence} onChange={handleChange} placeholder="Enter First 9 Integers of IP Address" />
          </div>
          <div className="location-master__form-group">
            <label>To Address:</label>
            <input type="text" name="toAddress" value={locationData.toAddress} onChange={handleChange} />
          </div>
          <div className="location-master__form-group">
            <label style={{width:"165px"}}>Import Normal Ranges From Location:</label>
            <select name="importNormalRangesFromLocation" value={locationData.importNormalRangesFromLocation} onChange={handleChange}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
          <div className="location-master__form-group">
            <label>Parameters Count:</label>
            <input type="text" name="parametersCount" value={locationData.parametersCount} readOnly />
          </div>
          <div className="location-master__form-group">
            <label style={{width:"100px"}}>Provident Fund Code:</label>
            <input type="text" name="providentFundCode" value={locationData.providentFundCode} onChange={handleChange} />
          </div>
        </div>

        {/* Right Column */}
        <div className="location-master__right-column">
          <div className="location-master__form-group">
            <label style={{width:"100px"}}>Employee No. Starts With:</label>
            <input type="text" name="employeeNoStartsWith" value={locationData.employeeNoStartsWith} onChange={handleChange} />
          </div>
          <div className="location-master__form-group">
            <label>Description:</label>
            <input type="text" name="description" value={locationData.description} onChange={handleChange} />
          </div>
          <div className="location-master__form-group">
            <label>Email Id:</label>
            <input type="email" name="emailId" value={locationData.emailId} onChange={handleChange} />
          </div>
          
          {/* Online Appointment Desk */}
          <div className="location-master__appointment-desk">
            <div className='location-master-headers'>Online Appointment Desk</div>
            <div className="location-master__form-group">
              <label>Help Message:</label>
              <input type="text" name="helpMessage" value={locationData.helpMessage} onChange={handleChange} />
            </div>
            <div className="location-master__form-group">
              <label>Non Emer Start Tm:</label>
              <input type="text" name="nonEmerStartTmeg" value={locationData.nonEmerStartTmeg} onChange={handleChange} placeholder="eg(0900)" />
            </div>
            <div className="location-master__form-group">
              <label>Non Emer End Tm:</label>
              <input type="text" name="nonEmerEndTmeg" value={locationData.nonEmerEndTmeg} onChange={handleChange} placeholder="eg(1800)" />
            </div>
            <div className="location-master__form-group">
              <label style={{width:"100px"}}>No Of Slots Open For Waiting List In Doctor Appointments:</label>
              <input type="text" name="slotsOpenForWaitingList" value={locationData.slotsOpenForWaitingList} onChange={handleChange} />
            </div>
            <div className="location-master__form-group">
              <label style={{width:"100px"}}>Transit Dept For Online Issues: *</label>
              <input type="text" name="transitDeptForOnlineIssues" value={locationData.transitDeptForOnlineIssues} onChange={handleChange} required />
            </div>
          </div>

          <div className="location-master__form-group">
            <label>State Code:</label>
            <input type="text" name="stateCode" value={locationData.stateCode} onChange={handleChange} />
          </div>
          <div className="location-master__form-group">
            <label>GST No:</label>
            <input type="text" name="gstNo" value={locationData.gstNo} onChange={handleChange} />
          </div>

          <div className="location-master__checkbox-group">
            <label>
              <input type="checkbox" name="treatAsSeparateCompany" checked={locationData.treatAsSeparateCompany} onChange={handleChange} />
              Treat this location as Separate Company
            </label>
          </div>
          <div className="location-master__form-group">
            <a href="#" className="location-master__link">Create View for income</a>
          </div>

          <button type="submit" className="location-master__submit-button">Save</button>
        </div>
        
        
      </form>

      {/* Footer */}
      <div className="location-master__footer">
        <span>Address: Level 5, Kirabo Complex, Plot 5 Old Kira Road</span>
      </div>
    </div>
  );
}

export default LocationMaster;
