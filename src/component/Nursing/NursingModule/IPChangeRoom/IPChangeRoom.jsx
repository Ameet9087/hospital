// AjharTamboli 20-11-24 iPChangeRoom.jsx
import React, { useState } from 'react';
import './IPChangeRoom.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const IPChangeRoom = () => {
  const [selectedTab, setSelectedTab] = useState('services');
  const [activePopup, setActivePopup] = useState(null);


  const handleDeleteRow = (snToDelete) => {
    const updatedData = servicesData.filter(row => row.sn !== snToDelete)
      .map((row, index) => ({ ...row, sn: index + 1 }));
    setServicesData(updatedData);
  };


  return (
    <div className="iPChangeRoom-master">
      <div className="iPChangeRoom-title-bar">
        <div className="iPChangeRoom-header">
          <span>IP Change Room</span>
          </div>
      </div><div className="iPChangeRoom-content-wrapper">
        <div className="iPChangeRoom-main-section">
          <div className="iPChangeRoom-panel operation-details">
            <div className="iPChangeRoom-panel-header">Patient Details</div>
            <div className="iPChangeRoom-panel-content">
              <div className="iPChangeRoom-form-row">
                <label>IP No: *</label>
                <div className="iPChangeRoom-input-with-search">
                  <input type="text" value="C SECTION" />
                  <FontAwesomeIcon
                  className='iPChangeRoom-magnifier-btn'
                    icon={faSearch}
                  />
                </div>
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Admission Date:</label>
                <input type="date" value="12" />
              </div>

              <div className="iPChangeRoom-form-row">
                <label>Admission Time:</label>
                <input type="time" value="12" />
              </div>
              
              <div className="iPChangeRoom-form-row">
                <label>Patient Name:</label>
                <input type="text" value="Ajhar" />
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Age:</label>
                <input type="text" value="24" />
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Gender:</label>
                <select>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Change Date:</label>
                <input type="date" value="" />
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Change Time:</label>
                <input type="time" value="" />
              </div>           
              
            </div>
          </div>
          <div className="iPChangeRoom-panel operation-details">
              <div className="iPChangeRoom-panel-header">Current Room Details</div> 
            <div className="iPChangeRoom-panel-content">
            <div className="iPChangeRoom-form-row">
            <label>Current Pay Type:</label>
              <input type="text" value="" />
              
            </div>
            <div className="iPChangeRoom-form-row">
            <label>Current Room Type:</label>
              <input type="text" value="" />
            </div>
            <div className="iPChangeRoom-form-row">
            <label>Current Room No:</label>
              <input type="text" value="" />
            </div>
            <div className="iPChangeRoom-form-row">
            <label>Current Bed No:</label>
              <input type="text" value="" />
            </div>
            <div className="iPChangeRoom-form-row">
            <label>Current Floor No:</label>
              <input type="text" value="" />
            </div>
            <div className="iPChangeRoom-form-row">
            <label>Current Entitlement:</label>
              <input type="text" value="" />
            </div>
            
          </div>
            </div>
          <div className="iPChangeRoom-panel dis-templates">
            <div className="iPChangeRoom-panel-header">Change Room Details</div>
            <div className="iPChangeRoom-panel-content">
              <div className="iPChangeRoom-form-row">
                <label>Pay Type:</label>
                <div className="iPChangeRoom-input-with-search">
                  <input type="text" />
                  <FontAwesomeIcon
                  className='iPChangeRoom-magnifier-btn'
                    icon={faSearch}
                  />
                </div>
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Bed No:</label>
                <div className="iPChangeRoom-input-with-search">
                  <input type="text" />
                  <FontAwesomeIcon
                  className='iPChangeRoom-magnifier-btn'
                    icon={faSearch}
                  />
                </div>
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Room Type:</label>
                <div className="iPChangeRoom-input-with-search">
                  <input type="text" />
                  <FontAwesomeIcon
                  className='iPChangeRoom-magnifier-btn'
                    icon={faSearch}
                  />
                </div>
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Room No:</label>
                <div className="iPChangeRoom-input-with-search">
                  <input type="text" />
                  <FontAwesomeIcon
                  className='iPChangeRoom-magnifier-btn'
                    icon={faSearch}
                  />
                </div>
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Floor No:</label>
                <div className="iPChangeRoom-input-with-search">
                  <input type="text" />
                  <FontAwesomeIcon
                  className='iPChangeRoom-magnifier-btn'
                    icon={faSearch}
                  />
                  <div className="iPChangeRoom-action-buttons">         
        </div>
                </div>
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Change Entitlement:</label>
                <div className="iPChangeRoom-input-with-search">
                  <input type="text" />
                  <FontAwesomeIcon
                  className='iPChangeRoom-magnifier-btn'
                    icon={faSearch}
                  />
                </div>
              </div>
              <div className="iPChangeRoom-form-row">
            <label>Remarks:</label>
              {/* <input type="text" value="" /> */}
              <textarea name="" id=""></textarea>
            </div>
            </div>
          </div>
          
        </div>
        <div>
        <button className="ipchangeroom-btn-blue">Save</button>
        </div>
      </div>
    </div>
  );
};

export default IPChangeRoom;

// AjharTamboli 22-11-24 iPChangeRoom.jsx