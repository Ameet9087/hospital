import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./NewVisitedList.css";
import AddNewPateint from "./AddNewPateint";
import { useNavigate } from "react-router-dom";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";

const NewVisitedList = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [showPatientVisitForm, setShowPatientVisitForm] = useState(false);
  const navigate = useNavigate();
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/appointments/fetch-all-appointment`
        );
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleNewPatient = () => {
    navigate("/checkIn");
  };
  const handleUpdatePatient = (patient) => {
    navigate("/checkIn", { state: { patient: patient } });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClosePatientVisitForm = () => {
    setShowPatientVisitForm(false);
  };

  const handlePrint = () => {
    const tableToPrint = tableRef.current;

    // Create an iframe dynamically
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";

    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document.open();
    doc.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            table, th, td {
              border: 1px solid black;
            }
            th, td {
              padding: 8px;
              text-align: left;
            }
            @media print {
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          ${tableToPrint.outerHTML}
        </body>
      </html>
    `);
    doc.close();

    // Use the iframe to print
    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    // Clean up after printing
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000); // Delay for printing to finish before removal
  };

  if (showPatientVisitForm) {
    return (
      <div className="newPatient-visit-form-modal">
        <div className="newPatient-visit-form-container">
          <button
            className="newPatient-close-btn"
            onClick={handleClosePatientVisitForm}
          >
            X
          </button>
          <AddNewPateint />
        </div>
      </div>
    );
  }

  return (
    <div className="newPatient-list">
      <div className="newPatient-header">
        <h5>Patient List</h5>
        <button className="newPatient-new-patient" onClick={handleNewPatient}>
          + New Patient
        </button>
      </div>
      <div className="newPatient-searchContainer">
        <div className="newPatient-search-bar">
          <input
            type="text"
            placeholder="Search (Atleast 3 characters)"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          Show {patients?.length} / {patients?.length} results
          <button onClick={handlePrint} className="newPatientVisitPrint">
            Print
          </button>
        </div>
      </div>
      <table className="newPatient-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "Patient Number",
              "Patient Name",
              "Age/Sex",
              "Phone",
              "Actions",
            ].map((header, index) => (
              <th
                key={index}
                style={{ width: columnWidths[index] }}
                className={`resizable-th ${header === "Actions" ? "no-print" : ""
                  }`}
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
          {patients
            .filter(
              (patient) =>
                (patient?.firstName || patient?.middleName || patient?.lastName)
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                patient?.appointmentId?.toString().includes(search)
            )
            ?.map((patient, index) => (
              <tr key={index}>
                <td>{patient.appointmentId}</td>
                <td>
                  {patient.firstName} {patient.middleName} {patient.lastName}
                </td>
                <td>
                  {patient.age} {patient.ageUnit} / {patient.gender}
                </td>
                {/* <td>{patient.address}</td> */}
                <td>{patient.contactNumber}</td>
                <td className="no-print">
                  <button
                    className="newPatient-action-button"
                    onClick={() => handleUpdatePatient(patient)}
                  >
                    Check In
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewVisitedList;
