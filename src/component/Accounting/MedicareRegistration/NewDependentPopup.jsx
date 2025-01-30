import React from "react";
import "./NewDependentPopup.css";

function NewDependentPopup({ onClose }) {
  return (
    <div className="ndp-overlay">
      <div className="ndp">
        <h2>Add New Medicare Dependent</h2>
        <form className="ndp-form">
          <div className="ndp-row">
            <label>
              Staff Medicare No :
              <input type="text" />
            </label>
            <label>
              Staff Name :
              <input type="text" />
            </label>
            <label>
              Relation :<select></select>
            </label>
          </div>
          <h3>Dependent Information</h3>
          <div className="ndp-row">
            <label>
              Hospital No :
              <input type="text" />
            </label>
            <label>
              Name :
              <input type="text" />
            </label>
            <label>
              Age : <input type="text" />
            </label>
            <label>
              Gender : <input type="text" />
            </label>
            <label>
              Insurance policy :{" "}
              <select>
                <option value={""}>--please select insurance provider--</option>
                <option value={"NHIF"}>NHIF</option>
              </select>
            </label>
          </div>
          <div className="ndp-row">
            <label>
              Institute :
              <select>
                <option>select Institute</option>
              </select>
            </label>
            <label>
              Medicare Start Date(Parent) :
              <input type="date" />
            </label>
            <label>
              Category :
              <select>
                <option>select Category</option>
              </select>
            </label>
          </div>
          <div className="ndp-row">
            <label>
              Remark :
              <textarea rows={5} />
            </label>
            <label>
              <input type="checkbox" />
              isActive
            </label>
          </div>
          <div className="ndp-actions">
            <button type="submit">Submit</button>
            <button type="button" className="ndp-close-btn" onClick={onClose}>
              X
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewDependentPopup;
