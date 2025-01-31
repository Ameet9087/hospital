import React from "react";
import "./NewMemberPopup.css";

function NewMemberPopup({ onClose }) {
  return (
    <div className="nmp-overlay">
      <div className="nmp">
        <h2>Add New Medicare Member</h2>
        <form className="nmp-form">
          <div className="nmp-row">
            <label>
              Hospital Number:
              <input
                type="text"
                placeholder="Search By HospitalNo/Patient Name"
              />
            </label>
            <label>
              Designation:
              <select></select>
            </label>
            <label>
              Department:
              <select></select>
            </label>
          </div>
          <div className="nmp-row">
            <label>
              Name :
              <input type="text" />
            </label>
            <label>
              Age :<input type="text" />
            </label>
            <label>
              Gender:
              <input type="text" />
            </label>
            <label>
              Member No :
              <input type="text" value={0} />
            </label>
          </div>
          <div className="nmp-row">
            <label>
              Insurance :
              <input type="text" />
            </label>
            <label>
              Medicare Start Date :<input type="text" />
            </label>
            <label>
              Category:
              <select>
                <option>select Category</option>
              </select>
            </label>
          </div>
          <div className="nmp-row">
            <label>
              Insurance provider :
              <select>
                <option>select provider</option>
              </select>
            </label>
            <label>
              Insurance No:
              <input type="text" />
            </label>
          </div>
          <div className="nmp-row">
            <label>
              Remarks :
              <textarea rows={3} />
            </label>
            <label>
              <input type="checkbox" />
              isActive
            </label>
          </div>
          <div className="nmp-actions">
            <button type="submit">Submit</button>
            <button type="button" className="nmp-close-btn" onClick={onClose}>
              X
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewMemberPopup;
