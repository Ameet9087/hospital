import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../DisPrescriptionMain/disPrescription.css";
import PrescriptionDetails from "../DisPrescriptionMain/viewAvailability";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { API_BASE_URL } from '../../api/api';

const DisPrescription = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/medications`);
      setPrescriptions(response.data);  // assuming response is an array of medications
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch prescriptions');
      setLoading(false);
    }
  };

 const handleViewAvailabilityClick = (prescription) => {
  // Assuming all medications are fetched, filter for the selected patient's medications
  const patientMedications = prescriptions.filter(
    med => med.newPatientVisitDTO.newPatientVisitId === prescription.newPatientVisitDTO.newPatientVisitId
  );

  setSelectedPrescription({
    ...prescription,
    medications: patientMedications // Set the filtered medications for the selected patient
  });
  setShowModal(true);
};


  const handleCloseDetails = () => {
    setShowModal(false); // Close modal
    setSelectedPrescription(null); // Clear selected prescription
  };

  const handlePrint = () => {
    const tableElement = document.getElementById('prescription-table');
    const actionColumn = tableElement.querySelectorAll('.disPrescription-action-column');

    // Hide action columns before printing
    actionColumn.forEach(column => {
      column.style.display = 'none';
    });

    // Convert table to canvas
    html2canvas(tableElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);

      // Open PDF in a new tab
      pdf.output('dataurlnewwindow');

      // Restore action columns after printing
      actionColumn.forEach(column => {
        column.style.display = '';
      });
    });
  };

  // Group prescriptions by newPatientVisitId
  const groupedPrescriptions = prescriptions.reduce((acc, prescription) => {
    const patientId = prescription.newPatientVisitDTO?.newPatientVisitId;
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
      prescription.newPatientVisitDTO?.firstName?.toLowerCase().includes(searchStr) ||
      prescription.medicationId.toString().includes(searchStr)
    );
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="disPrescription-list-requisition">
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
          <button className="disPrescription-print-button" onClick={handlePrint}><i class="fa-solid fa-print"></i> Print</button>
        </div>
      </div>

      <div className='disPrescription-table-N-paginationDiv'>
        <table id="prescription-table" className="disPrescription-requisition-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Requested By</th>
              <th>Date</th>
              <th className="disPrescription-action-column">Actions</th>
            </tr>
          </thead>
          <tbody className="disPrescription-requisition-tableBody">
            {filteredGroups.map(patientId => {
              const group = groupedPrescriptions[patientId];
              const patient = group[0]?.newPatientVisitDTO;
              const patientName = `${patient?.firstName || ''} ${patient?.middleName || ''} ${patient?.lastName || ''}`;
              return (
                <tr key={patientId}>
                  <td>{patient?.newPatientVisitId || 'Unknown ID'}</td>
                  <td>{patientName}</td>
                  <td>{group[0]?.requestedBy || 'Unknown Requester'}</td>
                  <td>{group[0]?.medicationDate || 'Unknown Date'}</td>
                  <td className="disPrescription-action-column">
  <button onClick={() => handleViewAvailabilityClick(group[0])}>
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
