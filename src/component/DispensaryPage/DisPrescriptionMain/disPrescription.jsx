
// export default DisPrescription;
import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../DisPrescriptionMain/disPrescription.css";
import PrescriptionDetails from "../DisPrescriptionMain/viewAvailability";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
import * as XLSX from "xlsx";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";

import CustomModal from '../../../CustomModel/CustomModal';
import { useFilter } from "../../ShortCuts/useFilter";
const DisPrescription = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [groupedPrescriptions, setGroupedPrescriptions] = useState({});

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    if (!showModal) {
      fetchPrescriptions();
    }
  }, [showModal]);

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/medications`);
      const data = response.data; // Assuming this is the JSON you provided
      console.log("requested data", data);
      setPrescriptions(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch prescriptions");
      setLoading(false);
    }
  };

  const filterByDate = (data) => {
    if (!dateFrom || !dateTo) return data; // If no dates, return all data
    return data.filter((item) => {
      const consumptionDate = new Date(item.medicationDate);
      const startDate = new Date(dateFrom);
      const endDate = new Date(dateTo);
      return consumptionDate >= startDate && consumptionDate <= endDate;
    });
  };

  // const filteredPrescriptions = filterByDate(
  //   prescriptions.filter(prescription => {
  //     const searchStr = searchTerm.toLowerCase();
  //     const patient = prescription.newPatientVisitDTO || {};
  //     return (
  //       prescription.medicationName?.toLowerCase().includes(searchStr) ||
  //       patient.firstName?.toLowerCase().includes(searchStr) ||
  //       patient.lastName?.toLowerCase().includes(searchStr)
  //     );
  //   })
  // );

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const searchStr = searchTerm.toLowerCase();
    const patient = prescription.newPatientVisitDTO || {};
    return (
      prescription.medicationName?.toLowerCase().includes(searchStr) ||
      patient.firstName?.toLowerCase().includes(searchStr) ||
      patient.lastName?.toLowerCase().includes(searchStr)
    );
  });

  const handleViewAvailabilityClick = (prescription) => {
    const patientMedications = prescriptions.filter(
      (med) =>
        med.newPatientVisitDTO?.outPatientId ===
        prescription.newPatientVisitDTO?.outPatientId
    );

    setSelectedPrescription({
      ...prescription,
      medications: patientMedications,
    });
    setShowModal(true);
  };

  const handleCloseDetails = () => {
    setShowModal(false);
    setSelectedPrescription(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };



  const handlePrint = () => {
    const printContent = tableRef.current;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <h4>Lit Of Precription</h4>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;

            }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();

  };
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "DisPrrescription"); // Appends worksheet to workbook
    XLSX.writeFile(wb, "DisPrrescription.xlsx"); // Downloads the Excel file
  };
  const filteredPrescription = useFilter(filteredPrescriptions, searchTerm);
  const filteredItems = useFilter(filterByDate(prescriptions), searchTerm);



  const filteredGroups = Object.keys(groupedPrescriptions).filter(
    (patientId) => {
      const group = groupedPrescriptions[patientId];
      const searchStr = searchTerm.toLowerCase();
      return group.some(
        (prescription) =>
          prescription.status !== "completed" && // Filter out completed prescriptions
          (prescription.newPatientVisitDTO?.firstName
            ?.toLowerCase()
            .includes(searchStr) ||
            prescription.medicationId.toString().includes(searchStr))
      );
    }
  );

  return (
    <div className="disPrescription-list-requisition">
      <div className="disPrescription-controls">

        <FloatingInput
          label="From *"
          type="date"
          required
          defaultValue="2024-08-09"
        />
        <FloatingInput
          label="To *"
          type="date"
          required
          defaultValue="2024-08-16"
        />
      </div>
      <div className="disPrescription-search-N-result">
        <div className="disPrescription-search-bar">


          <FloatingInput
            label="Search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}

          />
        </div>
        <div className="disPrescription-results-info">
          <span>
            Showing {filteredGroups.length} /{" "}
            {Object.keys(groupedPrescriptions).length} results
          </span>
          <button
            className="disPrescription-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="disPrescription-print-button" onClick={handlePrint}>
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="disPrescription-table-N-paginationDiv">
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Patient ID", "Patient Name", "Medicine Name", "Date", "Status", "Actions"].map((header, index) => (
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
          <tbody className="disPrescription-requisition-tableBody">
            {filteredItems.map((prescription, index) => {
              const patient = prescription.newPatientVisitDTO || {};

              const patientName = `${patient.firstName || ""} ${patient.lastName || ""
                }`.trim();
              return (
                <tr key={index}>
                  <td>{patient.outPatientId || "Unknown"}</td>
                  <td>{patient?.patient?.firstName || "Unknown"}</td>
                  <td>{prescription.medicationName || "Unknown"}</td>
                  <td>{prescription.medicationDate || "Unknown"}</td>
                  <td>{prescription.status}</td>
                  <td className="disPrescription-action-column">
                    <button
                      className="doctor-blocking-table-btn"
                      onClick={() => handleViewAvailabilityClick(prescription)}
                    >
                      View Availability
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>


      <CustomModal isOpen={showModal} onClose={handleCloseDetails}>
        <PrescriptionDetails prescription={selectedPrescription} onClose={handleCloseDetails} />
      </CustomModal>



    </div>
  );
};

export default DisPrescription;
