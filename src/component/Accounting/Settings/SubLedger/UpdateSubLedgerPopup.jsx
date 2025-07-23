import React from "react";
import "./UpdateSubLedgerPopup.css";

function UpdateSubLedgerPopup({ data, closeupdate }) {
  console.log(data);

  return (
    <>
      <div className="update-subledger-popup-overlay">
        <div className="update-subledger-popup-content">
          <button className="uslp-close-btn" onClick={closeupdate}>
            &times;
          </button>
          <h2>Update SubLedger</h2>
          <form>
            <div className="uslp-form-row">
              <div className="uslp-form-group">
                <label>
                  Ledger<span className="required">*</span>:
                </label>
                <select disabled defaultValue={data.ledgerName}>
                  <option>{data.ledgerName}</option>
                </select>
              </div>
              <div className="uslp-form-group">
                <label>
                  SubLedger Name<span className="required">*</span>:
                </label>
                <input type="text" defaultValue={data.subLedgerName} />
              </div>
            </div>
            <div className="uslp-form-row">
              <div className="uslp-form-group">
                <label>Opening Balance:</label>
                <input type="number" defaultValue={data.openingBalance} />
              </div>
              <div className="uslp-form-group">
                <label>Opening BalanceType:</label>
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={data.openingBalanceType === "Dr"}
                  />{" "}
                  Dr
                </label>
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={data.openingBalanceType === "Cr"}
                  />{" "}
                  Cr
                </label>
              </div>
            </div>
            <div className="uslp-form-row">
              <div className="uslp-form-group">
                <label>Description:</label>
                <input type="text" defaultValue={data.description} />
              </div>
            </div>
            <div className="uslp-button-row">
              <button type="submit" className="uslp-save-btn">
                Update SubLedger
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateSubLedgerPopup;
