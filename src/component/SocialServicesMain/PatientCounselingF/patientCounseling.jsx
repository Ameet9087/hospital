/* Ajhar Tamboli patientCounseling.jsx 07-10-24 */


import React, { useState, useEffect } from 'react';
import './patientCounseling.css';
import AddPatientCounseling from './addPatientCounseling';
import axios from 'axios';
import UpdatePatientCounselling from './UpdatePatientCounselling';

const PatientCounseling = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [labTests, setLabTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCounselingData, setSelectedCounselingData] = useState(null);

  // Date range states
  const [startDate, setStartDate] = useState("1024-08-09");
  const [endDate, setEndDate] = useState("2024-08-16");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const handleAddPatientCounseling = () => {
    setSelectedCounselingData(null);  // Clear previous data when adding a new record
    setShowPopup(true);  // Show the popup
  };

  const handleEdit = (counselingData) => {
    setSelectedCounselingData(counselingData);  // Store the selected row data
    setShowUpdatePopup(true);  // Show the update popup
  };

  const handleClosePopup = () => {
    setShowPopup(false);  // Close the popup
    setShowUpdatePopup(false);
  };

  const handleAddSubmit = (formData) => {
    axios.post(`${API_BASE_URL}/patientcounseling/add`, formData)
      .then((response) => {
        // Add new record to the state
        setLabTests((prev) => [...prev, response.data]);
      })
      .catch((err) => console.error(err));

    handleClosePopup();  // Close the popup after submitting the form
  };

  const handleUpdateSubmit = (formData) => {
    if (!selectedCounselingData) return; // Ensure there's data to update

    axios.put(`${API_BASE_URL}/patientcounseling/update/${selectedCounselingData.councellingId}`, formData)
      .then((response) => {
        // Update the local state with the new data
        setLabTests((prev) => prev.map(test =>
          test.councellingId === selectedCounselingData.councellingId ? response.data : test
        ));
      })
      .catch((err) => console.error(err));

    handleClosePopup(); // Close the popup after submitting the form
  };

  useEffect(() => {
    const fetchPatientCounselingData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/patientcounseling/getall`);
        setLabTests(response.data);
      } catch (error) {
        setError('Error fetching data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientCounselingData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Filter records based on search term and date range
  const filteredRecords = labTests.filter(test => {
    const sessionDate = new Date(test.sessionDate);
    const isInRange = sessionDate >= new Date(startDate) && sessionDate <= new Date(endDate);
    const matchesSearch = test.councelorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.ngoPatient.patientId.toString().includes(searchTerm) ||
      test.sessionNotes.toLowerCase().includes(searchTerm.toLowerCase());

    return isInRange && matchesSearch;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (type) => (e) => {
    if (type === "start") {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };

  return (
    <div className="patientCounseling-container">
      <div className="patientCounseling-firstRow">
        <div className="patientCounseling-addBtn">
          <button className="patientCounseling-add-button" onClick={handleAddPatientCounseling}>
            +Add Patient Counseling
          </button>
        </div>
      </div>
      <div className="addPatientCounseling-controls">
        {/* Date Range controls */}
        <div className="addPatientCounseling-date-range">
          <label>
            From:
            <input
              type="date"
              value={startDate}
              onChange={handleDateChange("start")}
            />
          </label>
          <label>
            To:
            <input
              type="date"
              value={endDate}
              onChange={handleDateChange("end")}
            />
          </label>
          <button className="addPatientCounseling-star-button">☆</button>
          <button className="addPatientCounseling-ok-button">OK</button>
        </div>
      </div>
      <div className="patientCounseling-search-N-result">
        <div className="patientCounseling-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="patientCounseling-results-info">
          <span>
            Showing {currentRecords.length} of {filteredRecords.length} results
          </span>
          <button className="patientCounseling-print-button">
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Counseling ID</th>
            <th>Patient ID</th>
            <th>Counselor Name</th>
            <th>Session Date</th>
            <th>Session Notes</th>
            <th>Follow-up Date</th>
            <th>Type of Counseling</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((test, index) => (
            <tr key={index}>
              <td>{test.councellingId}</td>
              <td>{test.ngoPatient.patientId}</td>
              <td>{test.councelorName}</td>
              <td>{test.sessionDate}</td>
              <td>{test.sessionNotes}</td>
              <td>{test.followUpDate}</td>
              <td>{test.typeOfCounselling}</td>
              <td>
                <button className="patientCounseling-edit-button" onClick={() => handleEdit(test)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <div className="patientCounseling-modal">
          <div className="patientCounseling-modal-content">
            <AddPatientCounseling
              onClose={handleClosePopup}
              onSubmit={handleAddSubmit}
            />
          </div>
        </div>
      )}
      {showUpdatePopup && (
        <div className="patientCounseling-modal">
          <div className="patientCounseling-modal-content">
            <UpdatePatientCounselling
              onClose={handleClosePopup}
              onSubmit={handleUpdateSubmit}
              counselingData={selectedCounselingData}  // Pass the selected data here
            />
          </div>
        </div>
      )}
      <div className="nGOpatientRegistration-pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          « Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next »
        </button>
      </div>
    </div>
  );
};

export default PatientCounseling;
