import React, { useState, useEffect, useRef } from "react";
import "./MaternityList.css";
import NewPatientRegistrationForm from "./NewPatientRegistrationForm";
import { API_BASE_URL } from "../api/api";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import MaternityANCPopUp from "./MaternityANC/MaternityANCPopUp";
import MaternityRegisterPopUp from "./MaternityANC/MaternityRegisterPopUp";
import MaternityUploadFilesPopUp from "./MaternityANC/MaternityUploadFilesPopUp";
import CustomModal from "../../CustomModel/CustomModal";
import * as XLSX from "xlsx";

const MaternityList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isANCModalOpen, setIsANCModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const openPopup = () => {
    setShowPopup(true);
  };
  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/patients/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Patient Data:prachi", data); // Log the fetched data
        setPatients(data);
        setFilteredPatients(data);
      })
      .catch((error) => console.error("Error fetching patient data:", error));
  }, []);

  const handleInputClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleANCClick = (patient) => {
    setSelectedPatient(patient);
    setIsANCModalOpen(true);
  };

  const handleCloseANCModal = () => {
    setIsANCModalOpen(false);
    setSelectedPatient(null);
  };

  const handleRegisterClick = (patient) => {
    setSelectedPatient(patient);
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
    setSelectedPatient(null);
  };

  const handleUploadClick = (patient) => {
    setSelectedPatient(patient);
    setIsUploadPopupOpen(true);
  };

  const handleCloseUploadPopup = () => {
    setIsUploadPopupOpen(false);
    setSelectedPatient(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange({ ...dateRange, [name]: value });
  };

  useEffect(() => {
    let filtered = patients;

    if (searchQuery) {
      filtered = filtered.filter((patient) =>
        `${patient?.inPatientDTO?.firstName} ${patient?.inPatientDTO?.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter((patient) => {
        const lmpDate = new Date(patient.firstDayOfMenstruation);
        const fromDate = new Date(dateRange.from);
        const toDate = new Date(dateRange.to);
        return lmpDate >= fromDate && lmpDate <= toDate;
      });
    }

    setFilteredPatients(filtered);
  }, [searchQuery, dateRange, patients]);

  const printList = () => {
    if (tableRef.current) {
      const printContents = tableRef.current.innerHTML;

      // Create an iframe element
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";

      // Append the iframe to the body
      document.body.appendChild(iframe);

      // Write the table content into the iframe's document
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
        <head>
          
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            button, .admit-actions, th:nth-child(10), td:nth-child(10) {
              display: none; /* Hide action buttons and Action column */
            }
          </style>
        </head>
        <body>
          <table>
            ${printContents}
          </table>
        </body>
        </html>
      `);
      doc.close();

      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      document.body.removeChild(iframe);
    }
  };

  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "PurchaseOrderReport");
    XLSX.writeFile(wb, "PurchaseOrderReport.xlsx");
  };

  return (
    <div className="maternity-component">
      <div className="maternity-list">
        <div className="matern-content">
          <div className="matern-edit-info">
            <button className="mater-print-btn" onClick={handleInputClick}>
              + Add New Patient Registration
            </button>
            <a href="#" className="matern-view-all">
              View all Maternity Patients
            </a>
          </div>

          <div className="mater-date-range">
            <label>From:</label>
            <input
              type="date"
              name="from"
              value={dateRange.from}
              onChange={handleDateChange}
            />
            <label>To:</label>
            <input
              type="date"
              name="to"
              value={dateRange.to}
              onChange={handleDateChange}
            />
          </div>

          <div className="mater-search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="mater-results">
            <span className="mater-span">
              Showing {filteredPatients.length} / {patients.length} results
            </span>
            <button className="mater-print-btn" onClick={handleExport}>
              Export
            </button>
            <button className="mater-print-btn" onClick={printList}>
              Print
            </button>
          </div>

          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Name",
                  "Age/Sex",
                  "Address",
                  "Phone No",
                  "Husband's Name",
                  "Ht",
                  "Wt",
                  "LMP",
                  "EDD",
                  "Action",
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
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td className="mater-name-col">
                      {patient?.inPatientDTO?.patient?.firstName}{" "}
                      {patient?.inPatientDTO?.patient?.lastName}
                    </td>
                    <td className="mater-age-col">
                      {patient?.inPatientDTO?.patient?.age}/
                      {patient?.inPatientDTO?.patient?.gender}
                    </td>
                    <td className="mater-address-col">
                      {patient?.inPatientDTO?.patient?.address}
                    </td>
                    <td className="mater-phone-col">
                      {patient?.inPatientDTO?.patient?.contactNumber}
                    </td>
                    <td className="mater-husband-col">{patient.husbandName}</td>
                    <td className="mater-h-col">{patient.patientHeight} cm</td>
                    <td className="mater-w-col">{patient.patientWeight} kg</td>
                    <td className="mater-lmp-col">
                      {patient.firstDayOfMenstruation}
                    </td>
                    <td className="mater-edd-col">
                      {patient.expectedDateOfDelivery}
                    </td>
                    <td className="mater-action-col">
                      <button
                        className="mater-delete-btn"
                        onClick={() => handleANCClick(patient)}
                      >
                        ANC
                      </button>
                      <button
                        className="mater-delete-btn"
                        onClick={() => handleRegisterClick(patient)}
                      >
                        Mat-Register
                      </button>
                      <button
                        className="mater-delete-btn"
                        onClick={() => handleUploadClick(patient)}
                      >
                        Upload
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="mater-no-rows">
                    No Rows To Show
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <NewPatientRegistrationForm />
        </CustomModal>
      )}

      {isANCModalOpen && (
        <CustomModal isOpen={isANCModalOpen} onClose={handleCloseANCModal}>
          <MaternityANCPopUp patientData={selectedPatient} />
        </CustomModal>
      )}

      {isRegisterModalOpen && (
        <CustomModal
          isOpen={isRegisterModalOpen}
          onClose={handleCloseRegisterModal}
        >
          <MaternityRegisterPopUp patientData={selectedPatient} />
        </CustomModal>
      )}

      {isUploadPopupOpen && (
        <CustomModal
          isOpen={isUploadPopupOpen}
          onClose={handleCloseUploadPopup}
        >
          <MaternityUploadFilesPopUp patientData={selectedPatient} />
        </CustomModal>
      )}
    </div>
  );
};

export default MaternityList;
