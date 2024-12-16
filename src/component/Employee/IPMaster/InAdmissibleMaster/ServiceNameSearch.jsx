import React from "react";
import "./ServiceNameSearch.css";

function ServiceNameSearch() {
  return (
    <div className="ServiceNameSearch-container">
      {/* Search Bar */}
      <div className="ServiceNameSearch-search-bar">
        <div className="ServiceNameSearch-search-left">
          <label htmlFor="searchHere">Search Here</label>
          <input
            type="text"
            id="searchHere"
            className="ServiceNameSearch-input"
            placeholder="Type Here To Search"
          />
        </div>
        <div className="ServiceNameSearch-search-right">
          <label htmlFor="searchWith">Search With</label>
          <select id="searchWith" className="ServiceNameSearch-select">
            <option value="SERVICENM">SERVICENM</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="ServiceNameSearch-table">
        <thead>
          <tr>
            <th className="ServiceNameSearch-header">SERVICENM</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Surgeon Charges</td>
          </tr>
          <tr>
            <td>Injection Charges</td>
          </tr>
          <tr>
            <td>Dialysis Charges</td>
          </tr>
          <tr>
            <td>Consumable Charges</td>
          </tr>
          <tr>
            <td>ECG</td>
          </tr>
          <tr>
            <td>Plasmapheresis</td>
          </tr>
          <tr>
            <td>RF Resurfacing</td>
          </tr>
          <tr>
            <td>Skin Biopsy - Facial</td>
          </tr>
          <tr>
            <td>Whole Blood</td>
          </tr>
          <tr>
            <td>SDP</td>
          </tr>
          <tr>
            <td>RDP Platlet Concentrate</td>
          </tr>
          <tr>
            <td>Pre Donation Tests</td>
          </tr>
          <tr>
            <td>Skin Biopsy - Non Facial</td>
          </tr>
          <tr>
            <td>Skin Peeling Glycolic Acid-Gla</td>
          </tr>
          <tr>
            <td>Electro Cautery (Local Anaest.)</td>
          </tr>
          <tr>
            <td>Intra Lesional Inj. (E.V, and P)</td>
          </tr>
          <tr>
            <td>Scar and Keloid Surgery</td>
          </tr>
          <tr>
            <td>Chemical Cautery</td>
          </tr>
          <tr>
            <td>Vitiligo Surgery Package</td>
          </tr>
          <tr>
            <td>Glycolic Acid</td>
          </tr>
        </tbody>
      </table>

      {/* Pagination */}
      <div className="ServiceNameSearch-pagination">
        <div className="ServiceNameSearch-pagination-left">
          <button>{"<<"}</button>
          <button>{"<"}</button>
          <span>Page</span>
          <input
            type="number"
            value="1"
            readOnly
            className="ServiceNameSearch-page-input"
          />
          <span>of 15</span>
          <button>{">"}</button>
          <button>{">>"}</button>
        </div>
        <div className="ServiceNameSearch-pagination-right">
          <span>View</span>
          <select className="ServiceNameSearch-page-size">
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>View 1 - 20 of 293</span>
        </div>
      </div>
    </div>
  );
}

export default ServiceNameSearch;
