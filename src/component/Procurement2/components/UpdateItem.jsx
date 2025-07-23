import React from "react";
import "./UpdateItem.css";

const UpdateItem = (terms) => {
  return (
    <div className="UpdateItem-form-container-updates">
      <h2 className="UpdateItem-heading">Update Item</h2>
      <form className="UpdateItem-item-form-updates">
        <div className="UpdateItem-form-row-updates">
          <label>
            Item Category<span className="UpdateItem-required-updates">*</span>:
          </label>
          <select className="UpdateItem-input-field-updates">
            <option value=""></option>
          </select>

          <label>Item Code:</label>
          <input
            type="text"
            className="UpdateItem-input-field-updates"
            disabled
          />
        </div>

        <div className="UpdateItem-form-row-updates">
          <label>
            Item Name<span className="UpdateItem-required-updates">*</span>:
          </label>
          <input
            type="text"
            className="UpdateItem-input-field-updates"
            placeholder="ItemName"
          />

          <label>Inventory:</label>
          <div className="UpdateItem-radio-buttons-updates">
            <label>
              <input type="radio" name="inventory" value="common" checked />{" "}
              Common
            </label>
            <label>
              <input type="radio" name="inventory" value="general" />{" "}
              GENERAL-INVENTORY
            </label>
          </div>
        </div>

        <div className="UpdateItem-form-row-updates">
          <label>
            Item Sub Category
            <span className="UpdateItem-required-updates">*</span>:
          </label>
          <input type="text" className="UpdateItem-input-field-updates" />

          <label>
            Item Company<span className="UpdateItem-required-updates">*</span>:
          </label>
          <input type="text" className="UpdateItem-input-field-updates" />
        </div>

        <div className="UpdateItem-form-row-updates">
          <label>
            Unit of Measurement
            <span className="UpdateItem-required-updates">*</span>:
          </label>
          <input type="text" className="UpdateItem-input-field-updates" />

          <label>ReOrder Quantity:</label>
          <input
            type="number"
            className="UpdateItem-input-field-updates"
            defaultValue="0"
          />
        </div>

        <div className="UpdateItem-form-row-updates">
          <label>
            MinStock Quantity
            <span className="UpdateItem-required-updates">*</span>:
          </label>
          <input type="number" className="UpdateItem-input-field-updates" />

          <label>Unit Quantity:</label>
          <input type="text" className="UpdateItem-input-field-updates" />
        </div>

        <div className="UpdateItem-form-row-updates">
          <label>Is VAT Applicable:</label>
          <input type="checkbox" className="UpdateItem-checkbox-updates" />

          <label>Packaging Type:</label>
          <input type="text" className="UpdateItem-input-field-updates" />
        </div>

        <div className="UpdateItem-form-row-updates">
          <label>Description:</label>
          <textarea className="UpdateItem-input-field-updates UpdateItem-description-field-updates"></textarea>

          <label>Vendor Name:</label>
          <input type="text" className="UpdateItem-input-field-updates" />
        </div>

        <div className="UpdateItem-form-row-updates">
          <label>Standard Rate:</label>
          <input
            type="number"
            className="UpdateItem-input-field-updates"
            defaultValue="0"
          />

          <label>Is CSSD Applicable:</label>
          <input type="checkbox" className="UpdateItem-checkbox-updates" />
        </div>

        <div className="UpdateItem-form-row-updates">
          <label>Is Cold Storage Applicable:</label>
          <input type="checkbox" className="UpdateItem-checkbox-updates" />

          <label>Is Patient Consumption Applicable:</label>
          <input type="checkbox" className="UpdateItem-checkbox-updates" />
        </div>

        <div className="UpdateItem-form-row-updates">
          <label>Is Active:</label>
          <input
            type="checkbox"
            className="UpdateItem-checkbox-updates"
            defaultChecked
          />
        </div>

        <button type="submit" className="UpdateItem-save-button-updates">
          Save Item
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
