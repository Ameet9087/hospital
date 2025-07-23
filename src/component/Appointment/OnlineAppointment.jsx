// AppointmentList.js
import React, { useState, useRef } from "react";
import "./OnlineAppointment.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";

const OnlineAppointment = () => {
  const [activeTab, setActiveTab] = useState("Initiated");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Initiated":
        return <InitiatedAppointments />;
      case "Completed":
        return <CompletedAppointments />;
      default:
        return null;
    }
  };

  return (
    <div className="onlineAppointment-list">
      <div className="onlineAppointment-tab-header">
        <div
          className={`onlineAppointment-tab ${activeTab === "Initiated" ? "active" : ""
            }`}
          onClick={() => setActiveTab("Initiated")}
        >
          Initiated Appointment
        </div>
        <div
          className={`onlineAppointment-tab ${activeTab === "Completed" ? "active" : ""
            }`}
          onClick={() => setActiveTab("Completed")}
        >
          Completed Appointment
        </div>
      </div>
      <div className="onlineAppointment-tab-content">{renderTabContent()}</div>
    </div>
  );
};

const InitiatedAppointments = () => {
  const [fromDate, setFromDate] = useState("08-08-2024");
  const [toDate, setToDate] = useState("08-08-2024");
  const [paymentStatus, setPaymentStatus] = useState("All");
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  return (
    <>
      <div className="onlineAppointment-filters">
        <div className="onlineAppointment-date-range">
          <label>From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <label>To:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          {/* <button className="onlineAppointment-star-btn">☆</button>
          <button className="onlineAppointment-minus-btn">-</button> */}
        </div>
        <div className="onlineAppointment-filter-row">
          <div className="onlineAppointment-filter-item">
            <label>Payment Status:</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <option value="All">All</option>
            </select>
          </div>
          <div className="onlineAppointment-filter-item">
            <label>Department:</label>
            <input
              type="text"
              placeholder="Department Name"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <div className="onlineAppointment-filter-item">
            <label>Doctor:</label>
            <input
              type="text"
              placeholder="Doctor's Name"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button className="onlineAppointment-reload-btn">↻ Reload Data</button>
      <div className="onlineAppointment-searchContainer">
        <div className="onlineAppointment-search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i class="fas fa-search"></i>
        </div>
        <div className="onlineAppointment-results-actions">
          <span>Showing 0 / 0 results </span>
          <button className="onlineAppointment-export-btn">Export</button>
          <button className="onlineAppointment-print-btn">Print</button>
        </div>
      </div>
      <div className="onlineAppointment-table-container">
        <table className="onlineAppointment-patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Status",
                "Date/Time",
                "Patient Name",
                "Age/Gender",
                "Phone N...",
                "Address",
                "Department",
                "Doctor",
                "Payment St...",
                "Payment M...",
                "Actions",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="onlineAppointment-resizable-th"
                >
                  <div className="onlineAppointment-header-content">
                    <span>{header}</span>
                    <div
                      className="onlineAppointment-resizer"
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
            <tr>
              <td colSpan="11" className="onlineAppointment-loading">
                No Data Found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

const CompletedAppointments = () => {
  const [fromDate, setFromDate] = useState("08-08-2024");
  const [toDate, setToDate] = useState("08-08-2024");
  const [paymentStatus, setPaymentStatus] = useState("All");
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  return (
    <>
      <div className="onlineAppointment-filters">
        <div className="onlineAppointment-date-range">
          <label>From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <label>To:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          {/* <button className="onlineAppointment-star-btn">☆</button>
          <button className="onlineAppointment-minus-btn">-</button> */}
        </div>
      </div>
      <button className="onlineAppointment-reload-btn">↻ Reload Data</button>
      <div className="onlineAppointment-searchContainer">
        <div className="onlineAppointment-search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i class="fas fa-search"></i>
        </div>
        <div className="onlineAppointment-results-actions">
          <span>Showing 0 / 0 results </span>
          <button className="onlineAppointment-export-btn">Export</button>
          <button className="onlineAppointment-print-btn">Print</button>
        </div>
      </div>
      <div className="onlineAppointment-table-container">
        <table className="onlineAppointment-patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Status",
                "Date/Time",
                "Patient Name",
                "Age/Gender",
                "Phone N...",
                "Address",
                "Department",
                "Doctor",
                "Payment St...",
                "Payment M...",
                "Actions",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="onlineAppointment-resizable-th"
                >
                  <div className="onlineAppointment-header-content">
                    <span>{header}</span>
                    <div
                      className="onlineAppointment-resizer"
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
            <tr>
              <td colSpan="11" className="onlineAppointment-loading">
                Loading...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OnlineAppointment;
