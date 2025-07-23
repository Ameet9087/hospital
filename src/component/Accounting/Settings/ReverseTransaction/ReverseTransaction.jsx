import React, { useState } from "react";
import "./ReverseTransaction.css";
import { useNavigate } from "react-router-dom";

const ReverseTransaction = () => {
  const [transactionDate, setTransactionDate] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="reverseTransaction">
      <div className="reverseTransaction__modal">
        <h2 className="reverseTransaction__title">
          UNDO ACCOUNTING TRANSACTION
        </h2>
        <p className="reverseTransaction__alert">
          !!Alert : after reverse transaction you can't get detail again.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="reverseTransaction__field">
            <label htmlFor="transactionDate">Transaction Date*</label>
            <div className="reverseTransaction__dateInput">
              <select>
                <option value="">Select</option>
              </select>
              <input
                type="date"
                id="transactionDate"
                value={transactionDate}
                onChange={(e) => setTransactionDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="reverseTransaction__field">
            <label htmlFor="selectModule">Select Module*</label>
            <select
              id="selectModule"
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Inventory">Inventory</option>
            </select>
          </div>
          <div className="reverseTransaction__field">
            <label htmlFor="reason">Reason*</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="enter proper reason(min 20 char) for undo/reverse transaction"
              required
            />
          </div>
          <button type="submit" className="reverseTransaction__submit">
            Save
          </button>
        </form>
        <button
          className="reverseTransaction-close-btn"
          onClick={() => navigate("/accounting/settings/COAList")}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default ReverseTransaction;
