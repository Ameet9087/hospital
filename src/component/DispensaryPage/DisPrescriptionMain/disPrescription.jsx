

// export default DisPrescription;
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
import { startResizing } from "../../TableHeadingResizing/resizableColumns"

const DisPrescription = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

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

  const filteredPrescriptions = prescriptions.filter(prescription => {
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

  const handlePrint = () => {
    const tableElement = document.getElementById('prescription-table');
    const actionColumn = tableElement.querySelectorAll('.disPrescription-action-column');

    actionColumn.forEach(column => {
      column.style.display = 'none';
    });

    html2canvas(tableElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);

      pdf.output('dataurlnewwindow');

      actionColumn.forEach(column => {
        column.style.display = '';
      });
    });
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

  const groupedPrescriptions = prescriptions.reduce((acc, prescription) => {
    const patientId = prescription.newPatientVisitDTO?.outPatientId;
    if (!acc[patientId]) {
      acc[patientId] = [];
    }
    acc[patientId].push(prescription);
    return acc;
  }, {});

  const filteredGroups = Object.keys(groupedPrescriptions).filter(patientId => {
    const group = groupedPrescriptions[patientId];
    const searchStr = searchTerm.toLowerCase();
    return group.some(prescription =>
      (prescription.status !== 'completed') &&  // Filter out completed prescriptions
      (prescription.newPatientVisitDTO?.firstName?.toLowerCase().includes(searchStr) ||
        prescription.medicationId.toString().includes(searchStr))
    );
  });

  return (
    <div className="disPrescription-list-requisition">
      <div className="disPrescription-controls">
        <div className="disPrescription-date-range">
          <label>
            From:
            <input type="date" defaultValue="2024-08-09" />
          </label>
          <label>
            To:
            <input type="date" defaultValue="2024-08-16" />
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
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="disPrescription-results-info">
          <span>Showing {filteredGroups.length} / {Object.keys(groupedPrescriptions).length} results</span>
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
              {[
                "Patient ID",
                "Patient Name",
                "Medicine Name",

                "Date",
                "Status",
                "Actions",
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
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="disPrescription-requisition-tableBody">
            {filteredPrescriptions.map((prescription, index) => {
              const patient = prescription.newPatientVisitDTO || {};
              const patientName = `${patient.firstName || ''} ${patient.lastName || ''}`.trim();
              return (
                <tr key={index}>
                  <td>{patient.outPatientId || 'Unknown'}</td>
                  <td>{patient?.patient?.firstName || 'Unknown'}</td>
                  <td>{prescription.medicationName || 'Unknown'}</td>
                  <td>{prescription.medicationDate || 'Unknown'}</td>
                  <td>{prescription.status}</td>
                  {/* <td>{prescription.dose || 'Unknown'}</td> */}
                  {/* <td>{prescription.frequency || 'Unknown'}</td> */}
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
