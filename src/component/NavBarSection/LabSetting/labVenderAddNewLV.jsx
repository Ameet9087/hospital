import React from 'react';
// import './AddLabTest.css';
import "../LabSetting/labVenderAddNewLV.css"
const LabVenderAddNewLV = ({ onClose }) => {
  return (
    <div className="labVenderAddNewLV-container">
      <div className="labVenderAddNewLV-header">
        <h3>Add Lab External Vendor</h3>
        <button className="labVenderAddNewLV-close-btn"onClick={onClose}>x</button>
      </div>

      <div className="labVenderAddNewLV-form">
        <div className="labVenderAddNewLV-form-row">

          <div className="labVenderAddNewLV-form-group-1row">
          <div className="labVenderAddNewLV-form-group">
            <label>Vendor Name<span>*</span></label>
            <input type="text" placeholder="Vendor Name" />
          </div>
          <div className="labVenderAddNewLV-form-group">
            <label>Vendor Code <span>*</span></label>
            <input type="text" placeholder="Vendor Code " />
          </div>
          </div>
          
          <div className="labVenderAddNewLV-form-group-1row">
          <div className="labVenderAddNewLV-form-group">
            <label>Contact Address</label>
            <input type="text" placeholder="Contact Address" />
          </div>
          <div className="labVenderAddNewLV-form-group">
            <label>Report Template Type<span>*</span></label>
            <input type="text"  placeholder='Contact Number'/>

          </div>
          </div>
           
          <div className="labVenderAddNewLV-form-group-1row">
         
            <div className="labVenderAddNewLV-form-group labVenderAddNewLV-full-width">
              <label>Email:</label>
<input type="text" placeholder='Email' />            </div>
          
          </div>
          <div className="labVenderAddNewLV-form-group-1row">
          {/* <div className="labVenderAddNewLV-form-group-sub"> */}
         
          
          
          </div>
          {/* </div> */}
        </div>
        {/* <div className='labVenderAddNewLV-AddNew'>
            <a href="#" className="add-new-specimen">Add New Specimen</a>
            </div> */}

      </div>



      <div className="labVenderAddNewLV-form-actions">
        <button className="labVenderAddNewLV-add-btn">Add </button>
        {/* <button className="labVenderAddNewLV-close-btn">Close</button> */}
      </div>
    </div>
  );
};

export default LabVenderAddNewLV;
