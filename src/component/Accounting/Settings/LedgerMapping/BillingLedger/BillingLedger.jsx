import React, { useState, useRef } from "react";
import "./BillingLedger.css"; // Import your CSS for styling
import { startResizing } from "../../../../../TableHeadingResizing/ResizableColumns";

const BillingLedger = () => {
  const [data, setData] = useState([
    {
      id: 1,
      itemCode: "53",
      itemName: "ADMISSION FEE",
      mainLedger: "Doctor OPD",
      actions: true,
      serviceDept: "OPD",
      ledger: "1028",
      isActive: true,
    },
    {
      id: 2,
      itemCode: "01",
      itemName: "Admission Fees",
      mainLedger: "Admission Fees",
      actions: true,
      serviceDept: "Admission Fees",
      ledger: "1095",
      isActive: true,
    },
  ]);

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (item) => {
    setModalData(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  return (
    <div className="billing-ledger-container">
      <div className="filters">
        <input type="checkbox" id="all" checked />
        <label htmlFor="all">All (79)</label>
        <input type="checkbox" id="ledgerWithAcHead" />
        <label htmlFor="ledgerWithAcHead">Ledger with A/c Head (63)</label>
        <input type="checkbox" id="ledgerWithoutAcHead" />
        <label htmlFor="ledgerWithoutAcHead">
          Ledger without A/c Head (16)
        </label>
        <div className="radio-buttons">
          <input type="radio" id="outpatient" name="patientType" />
          <label htmlFor="outpatient">OutPatient</label>
          <input type="radio" id="inpatient" name="patientType" />
          <label htmlFor="inpatient">InPatient</label>
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Item Code",
                "Item Name",
                "Main Ledger",
                "Actions",
                "Service Dept",
                "Ledger",
                "Is Active",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.itemCode}</td>
                <td>{item.itemName}</td>
                <td>{item.mainLedger}</td>
                <td>
                  <button className="map-btn" onClick={() => openModal(item)}>
                    Map
                  </button>
                  <button className="disable-btn">
                    {item.isActive ? "Disable" : "Enable"}
                  </button>
                </td>
                <td>{item.serviceDept}</td>
                <td>{item.ledger}</td>
                <td>{item.isActive ? "True" : "False"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="billing-modal-overlay">
          <div className="billing-modal-content">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <h2>Ledger Mapping of Billing Service Item</h2>
            <p>
              <strong>Service Department:</strong> {modalData.serviceDept}
            </p>
            <p>
              <strong>Item Code:</strong> {modalData.itemCode}
            </p>
            <p>
              <strong>Item Name:</strong> {modalData.itemName}
            </p>

            <div className="ledger-mapping">
              <p>
                <strong>Primary Group:</strong> Revenue
              </p>
              <p>
                <strong>COA:</strong> Direct Income
              </p>
              <p>
                <strong>Ledger Group:</strong> Sales
              </p>
              <div>
                <label htmlFor="mainLedger">Select Main Ledger:</label>
                <input
                  type="text"
                  id="mainLedger"
                  value={modalData.mainLedger}
                  readOnly
                />
              </div>
              <p>
                <strong>Ledger Code:</strong> {modalData.ledger}
              </p>
              <button className="update-btn">Update LedgerMapping</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingLedger;
