import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import "../DisPrescriptionMain/viewAvailability.css";
import axios from 'axios';
import { API_BASE_URL } from '../../api/api';

const PrescriptionDetails = ({ prescription, onClose }) => {
  const [stockData, setStockData] = useState({});
  const [status, setStatus] = useState(prescription.status); // Initial status
  const medications = prescription.medications || [];

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/add-items`); // Fetch stock data
        setStockData(response.data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  const printDocument = () => {
    const element = document.getElementById('prescription-details');
    const options = {
      filename: 'Prescription_Details.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().set(options).from(element).save();
  };

  const updatePrescriptionStatus = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/medications/update-status/${prescription.medicationId}?status=completed`
      );
      alert('Status updated successfully.');
      setStatus('completed'); // Update status in UI
    } catch (error) {
      console.error('Failed to update prescription status:', error);
    }
  };

  const renderMedications = () => {
    if (medications.length === 0) {
      return (
        <tr>
          <td colSpan="7">No medications available</td>
        </tr>
      );
    }

    return medications.reverse().map((medication, index) => (
      <tr key={medication.medicationId}>
        <td>{index + 1}</td>
        <td>{medication.medicationName}</td>
        <td>{medication.frequency}</td>
        <td>{medication.dose}</td>
        <td>{medication.lastTaken || 'N/A'}</td>
        <td>{medication.comments || 'N/A'}</td>
        <td className={stockData[medication.medicationId] ? 'availability-yes' : 'availability-no'}>
          {stockData[medication.medicationId] ? 'Yes' : 'No'}
        </td>
      </tr>
    ));
  };

  return (
    <div className="viewAvailability-prescription-container">
      <div className="viewAvailability-header">
        <img src="your-logo-url" alt="Logo" className="viewAvailability-logo" />
        <div className="viewAvailability-close-button" onClick={onClose}>
          x
        </div>
      </div>

      <div className="viewAvailability-info">
        <p>
          Patient Name:{' '}
          <span>
            {`${prescription.newPatientVisitDTO?.firstName || ''} ${
              prescription.newPatientVisitDTO?.middleName || ''
            } ${prescription.newPatientVisitDTO?.lastName || ''}`.trim()}
          </span>
        </p>
        <p>Requested By: <span>{prescription.requestedBy || 'N/A'}</span></p>
        <p>Date: <span>{prescription.medicationDate || 'N/A'}</span></p>
        <p>Status: <span>{status}</span></p>
      </div>

      <div id="prescription-details" className="viewAvailability-prescription-details">
        <h6>PRESCRIPTION DETAILS</h6>
        <table>
          <thead>
            <tr>
              <th>S.N</th>
              <th>Item Name</th>
              <th>Frequency</th>
              <th>Dose</th>
              <th>Last Taken</th>
              <th>Comments</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>{renderMedications()}</tbody>
        </table>
      </div>

      <div className="viewAvailability-buttons">
        <button className="viewAvailability-print-button" onClick={printDocument}>
          Print <i className="fa-solid fa-print"></i>
        </button>
        <button
          className="viewAvailability-dispatch-button"
          onClick={updatePrescriptionStatus}
          disabled={status === 'completed'}
        >
          Dispatch <i className="fa-solid fa-share"></i>
        </button>
      </div>
    </div>
  );
};

export default PrescriptionDetails;
