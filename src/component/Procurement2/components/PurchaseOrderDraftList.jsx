import React, { useState } from "react";
import PurchaseOrderStartNewDraft from "../components/PurchaseOrderStartNewDraft.jsx"; // Ensure correct component name
import "./PurchaseOrderDraftList.css"; // Assuming you have a CSS file for styling

const PurchaseOrderDraftList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDiscarded, setShowDiscarded] = useState(false);
  const [startNewDraft, setStartNewDraft] = useState(false);

  const handleStartNewDraft = () => {
    setStartNewDraft(true);
  };

  return (
    <div className="PurchaseOrderDraftList">
      <h1>Purchase Order Draft List</h1>

      <div className="PurchaseOrderDraftList-actions-bar">
        <button
          className="PurchaseOrderDraftList-start-new-draft"
          onClick={handleStartNewDraft}
        >
          + Start New Draft
        </button>
        <label className="PurchaseOrderDraftList-discarded-draft-checkbox">
          <input
            type="checkbox"
            checked={showDiscarded}
            onChange={(e) => setShowDiscarded(e.target.checked)}
          />
          Discarded Draft
        </label>
      </div>

      <div className="PurchaseOrderDraftList-search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="PurchaseOrderDraftList-search-button">🔍</button>
      </div>

      <div className="PurchaseOrderDraftList-results-info">
        Showing 0 / 0 results
        <button className="PurchaseOrderDraftList-export-button">Export</button>
        <button className="PurchaseOrderDraftList-print-button">Print</button>
      </div>

      <table className="PurchaseOrderDraftList-draft-table">
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Vendor...</th>
            <th>Vendor Con...</th>
            <th>Draft S...</th>
            <th>Draft C...</th>
            <th>Last U...</th>
            <th>Last U...</th>
            <th>Total A...</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="10" className="PurchaseOrderDraftList-no-rows">
              No Rows To Show
            </td>
          </tr>
        </tbody>
      </table>

      {/* Render PurchaseOrderStartNewDraft directly if the button is clicked */}
      {startNewDraft && <PurchaseOrderStartNewDraft />}
    </div>
  );
};

export default PurchaseOrderDraftList;
