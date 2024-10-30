import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import "../DisPrescriptionMain/viewAvailability.css";

const PrescriptionDetails = ({ prescription, onClose }) => {
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    // Function to fetch stock availability for medications
    const fetchStockData = async () => {
      try {
        const response = await fetch('http://localhost:1415/api/add-items'); // Your API endpoint for stock status
        const data = await response.json();
        // Assume data is an object with medicationId as key and availability status as value
        setStockData(data);
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
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    const pdf = html2pdf().from(element).toPdf().get('pdf');

    pdf.then(pdf => {
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    });
  };

  // Default to an empty array if medications are undefined
  const medications = prescription.medications || [];

  return (
    <div className="viewAvailability-prescription-container">
      <div className="viewAvailability-header">
        <img src="your-logo-url" alt="Logo" className="viewAvailability-logo" />
        <div className="viewAvailability-close-button" onClick={onClose}>x</div>
      </div>

      <div className="viewAvailability-info">
        <p>Patient Name: <span>{`${prescription.newPatientVisitDTO.firstName || ''} ${prescription.newPatientVisitDTO.middleName || ''} ${prescription.newPatientVisitDTO.lastName || ''}`}</span></p>
        <p>Requested By: <span>{prescription.requestedBy || 'N/A'}</span></p>
        <p>Date: <span>{prescription.medicationDate || 'N/A'}</span></p>
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
          <tbody>
            {medications.length > 0 ? (
              medications.map((medication, index) => (
                <tr key={medication.medicationId}>
                  <td>{index + 1}</td>
                  <td>{medication.medicationName}</td>
                  <td>{medication.frequency}</td>
                  <td>{medication.dose}</td>
                  <td>{medication.lastTaken}</td>
                  <td>{medication.comments || 'N/A'}</td>
                  <td className={stockData[medication.medicationId] ? 'availability-yes' : 'availability-no'}>
  {stockData[medication.medicationId] ? 'Yes' : 'No'}
</td>   
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No medications available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="viewAvailability-buttons">
        <button className="viewAvailability-print-button" onClick={printDocument}>Print <i className="fa-solid fa-print"></i></button>
        <button className="viewAvailability-dispatch-button">Dispatch <i className="fa-solid fa-share"></i></button>
      </div>
    </div>
  );
};

export default PrescriptionDetails;
