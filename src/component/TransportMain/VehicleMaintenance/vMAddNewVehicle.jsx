 /* Ajhar Tamboli vMAddNewVehicle.jsx 25-09-24 */

import React from 'react';
import "../VehicleMaintenance/vMAddNewVehicle.css"

const LabVenderAddNewLV = ({ onClose }) => {
  return (
    <>
    {/* <div className="vMAddNewVehicle-container"> */}
      <div className="vMAddNewVehicle-header">
        <h3>Add New Vehicle</h3>
        {/* <button className="vMAddNewVehicle-close-btn"onClick={onClose}>x</button> */}
      </div>

      <div className="vMAddNewVehicle-form">
        <div className="vMAddNewVehicle-form-row">

          <div className="vMAddNewVehicle-form-group-1row">
          <div className="vMAddNewVehicle-form-group">
            <label>Vehicle Id<span>*</span></label>
            <input type="text" placeholder="Vehicle Id" />
          </div>
          <div className="vMAddNewVehicle-form-group">
            <label>Vehicle Type<span>*</span></label>
            <input type="text" placeholder="Vehicle Type" />
          </div>
          </div>
          
          <div className="vMAddNewVehicle-form-group-1row">
          <div className="vMAddNewVehicle-form-group">
            <label>Vehicle Number</label>
            <input type="text" placeholder="Vehicle Number" />
          </div>
          <div className="vMAddNewVehicle-form-group">
            <label>Vehicel Company Name<span>*</span></label>
            <input type="text"  placeholder='Vehicel Company Name'/>

          </div>
          </div>
          <div className="vMAddNewVehicle-form-group-1row">
          <div className="vMAddNewVehicle-form-group">
            <label>Year Of Manufactur</label>
            <input type="text" placeholder="Year Of Manufactur" />
          </div>
          <div className="vMAddNewVehicle-form-group">
            <label>Fuel Type<span>*</span></label>
            <input type="text"  placeholder='Fuel Type'/>

          </div>
          </div>
           

          <div className="vMAddNewVehicle-form-group-1row">
          {/* <div className="vMAddNewVehicle-form-group-sub"> */}
         
          
          
          </div>
          {/* </div> */}
        </div>
        {/* <div className='vMAddNewVehicle-AddNew'>
            <a href="#" className="add-new-specimen">Add New Specimen</a>
            </div> */}

      </div>



      <div className="vMAddNewVehicle-form-actions">
        <button className="vMAddNewVehicle-add-btn">Add </button>
        {/* <button className="vMAddNewVehicle-close-btn">Close</button> */}
      </div>
    {/* </div> */}
    </>
  );
};

export default LabVenderAddNewLV;
