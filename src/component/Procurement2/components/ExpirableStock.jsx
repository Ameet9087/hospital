import React from "react";
import "./ExpirableStock.css";

const ExpirableStock = () => {
  return (
    <div className="ExpirableStocks-container">
      <div className="ExpirableStocks-content">
        <h2 className="ExpirableStocks-title">
          <i className="ExpirableStocks-icon">&#128202;</i> Expirable Stock
          Ledger
        </h2>
        <div className="ExpirableStocks-filters">
          <select className="ExpirableStocks-select">
            <option>2024</option>
          </select>
          <div className="ExpirableStocks-date-range">
            <label>From:</label>
            <input
              type="date"
              value="2024-08-23"
              className="ExpirableStocks-date-input"
            />
          </div>
          <div className="ExpirableStocks-date-range">
            <label>To:</label>
            <input
              type="date"
              value="2024-08-23"
              className="ExpirableStocks-date-input"
            />
          </div>
          <button className="ExpirableStocks-star-btn">&#9733;</button>
          <div className="ExpirableStocks-select-group">
            <label>Category:</label>
            <select className="ExpirableStocks-select">
              <option>All</option>
            </select>
          </div>
          <div className="ExpirableStocks-select-group">
            <label>Sub Category:</label>
            <select className="ExpirableStocks-select">
              <option>---Select Subcategory Name---</option>
            </select>
          </div>
        </div>
        <div className="ExpirableStocks-search-bar">
          <input
            type="text"
            placeholder="Search"
            className="ExpirableStocks-search-input"
          />
          <span className="ExpirableStocks-results">Showing 8 / 8 results</span>
        </div>
        <table className="ExpirableStocks-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Type</th>
              <th>Subcategory Name</th>
              <th>Item Code</th>
              <th>Unit</th>
              <th>Is Act...</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "Towel",
                type: "Capital Goods",
                subCategory: "some sub category",
                code: "0001001",
                unit: "Piece",
                isAct: "true",
              },
              {
                name: "tissue",
                type: "Consumables",
                subCategory: "tissue",
                code: "0002001",
                unit: "Piece",
                isAct: "true",
              },
              {
                name: "napkins",
                type: "Consumables",
                subCategory: "cotton",
                code: "0003001",
                unit: "Piece",
                isAct: "true",
              },
              {
                name: "Soap",
                type: "Consumables",
                subCategory: "soap",
                code: "0004001",
                unit: "Piece",
                isAct: "true",
              },
              {
                name: "Chair",
                type: "Capital Goods",
                subCategory: "Furniture",
                code: "0005001",
                unit: "Piece",
                isAct: "true",
              },
              {
                name: "syringes",
                type: "Consumables",
                subCategory: "cotton",
                code: "0003002",
                unit: "Piece",
                isAct: "true",
              },
              {
                name: "wheelchair",
                type: "Capital Goods",
                subCategory: "Furniture",
                code: "0005002",
                unit: "Piece",
                isAct: "true",
              },
              {
                name: "catheter",
                type: "Consumables",
                subCategory: "pharmacy",
                code: "0007001",
                unit: "Piece",
                isAct: "true",
              },
            ].map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.subCategory}</td>
                <td>{item.code}</td>
                <td>{item.unit}</td>
                <td>{item.isAct}</td>
                <td>
                  <button className="ExpirableStocks-view-btn">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="ExpirableStocks-pagination">
          <span>1 to 8 of 8</span>
          <button className="ExpirableStocks-page-btn">First</button>
          <button className="ExpirableStocks-page-btn">Previous</button>
          <span>Page 1 of 1</span>
          <button className="ExpirableStocks-page-btn">Next</button>
          <button className="ExpirableStocks-page-btn">Last</button>
        </div>
      </div>
    </div>
  );
};

export default ExpirableStock;
