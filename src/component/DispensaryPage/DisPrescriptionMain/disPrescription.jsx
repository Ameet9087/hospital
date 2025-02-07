import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../DisPrescriptionMain/disPrescription.css";
import PrescriptionDetails from "../DisPrescriptionMain/viewAvailability";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { API_BASE_URL } from '../../api/api';
import * as XLSX from 'xlsx';
import { startResizing } from "../../TableHeadingResizing/resizableColumns";
import { useFilter } from '../../ShortCuts/useFilter';

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
      console.log("requested data", data)
      setPrescriptions(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch prescriptions');
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

  const handleViewAvailabilityClick = (prescription) => {
    const patientMedications = prescriptions.filter(
      med => med.newPatientVisitDTO?.outPatientId === prescription.newPatientVisitDTO?.outPatientId
    );

    setSelectedPrescription({
      ...prescription,
      medications: patientMedications
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

  const handleExportToExcel = () => {
    const exportData = prescriptions.map(prescription => ({
      'Patient ID': prescription.newPatientVisitDTO?.newPatientVisitId || 'Unknown ID',
      'Patient Name': `${prescription.newPatientVisitDTO?.firstName || ''} ${prescription.newPatientVisitDTO?.middleName || ''} ${prescription.newPatientVisitDTO?.lastName || ''}`,
      'Requested By': prescription.requestedBy || 'Unknown Requester',
      'Date': prescription.medicationDate || 'Unknown Date',
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Prescriptions');
    XLSX.writeFile(workbook, 'Prescriptions.xlsx');
  };
  // const filteredPrescription = useFilter(filteredPrescriptions, searchTerm);
  const filteredItems = useFilter(filterByDate(prescriptions), searchTerm);


  

  return (
    <div className="disPrescription-list-requisition">
      <div className="disPrescription-controls">
        <div className="disPrescription-date-range">
          <label>
            From:
            <input
              type="date"
              value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}

            />
          </label>
          <label>
            To:
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}

            />
          </label>
        </div>
      </div>
      <div className='disPrescription-search-N-result'>
        <div className="disPrescription-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
         

          />
        </div>
        <div className="disPrescription-results-info">
        <span>Showing {filteredItems.length} / {prescriptions.length} results</span>
          <button className="disPrescription-print-button" onClick={handleExportToExcel}>
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
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="disPrescription-requisition-tableBody">
            {filteredItems.map((prescription, index) => {
              const patient = prescription.newPatientVisitDTO || {};
              // const patientName = `${patient.firstName || ''} ${patient.lastName || ''}`.trim();
              return (
                <tr key={index}>
                  <td>{patient.outPatientId || 'Unknown'}</td>
                  <td>{patient?.patient?.firstName || 'Unknown'}</td>
                  <td>{prescription.medicationName || 'Unknown'}</td>
                  <td>{prescription.medicationDate || 'Unknown'}</td>
                  <td>{prescription.status}</td>
                  <td className="disPrescription-action-column">
                    <button className="doctor-blocking-table-btn" onClick={() => handleViewAvailabilityClick(prescription)}>
                      View Availability
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && selectedPrescription && (
        <div className="disPrescription-modal-overlay">
          <div className="disPrescription-modal-content">
            <PrescriptionDetails prescription={selectedPrescription} onClose={handleCloseDetails} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DisPrescription;
