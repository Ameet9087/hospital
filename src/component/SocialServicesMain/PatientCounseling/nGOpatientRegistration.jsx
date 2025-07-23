// /* Ajhar Tamboli nGOpatientRegistration.jsx 08-10-24 */

import React, { useState, useEffect } from "react";
import AddNewNGOPatientRegistration from "./addNewNGOPatientRegistration";
import PatientCounseling from "../PatientCounselingF/patientCounseling";
import FinancialAssistance from "../FinancialAssistance/financialAssistance";
import SocialWelfareSupport from "../SocialWelfareSupport/socialWelfareSupport";
import HealthEducationPrograms from "../HealthEducationPrograms/healthEducationPrograms";
import CommunityOutreach from "../CommunityOutreach/communityOutreach";
import "./nGOpatientRegistration.css";
import NGOPatientUpdate from "./NGOpatientUpdate";

function NGOpatientRegistration() {
  const [selectedTab, setSelectedTab] = useState("NewRegistration");
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [labTests, setLabTests] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null); // For update

  // Pagination and search state
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch records from the API
  useEffect(() => {
    fetch(`${API_BASE_URL}/ngopatients/getall`)
      .then((response) => response.json())
      .then((data) => setLabTests(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Open the Add Popup
  const handleAddNewNGOPatientRegistration = () => {
    setShowAddPopup(true);
  };

  // Open the Update Popup
  const handleEditNGOPatient = (patient) => {
    setSelectedPatient(patient); // Set selected patient for update
    setShowUpdatePopup(true);
  };

  // Handle adding new patient
  const handleAddSubmit = (formData) => {
    fetch(`${API_BASE_URL}/ngopatients/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save the data.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Form data successfully saved:", data);
        setLabTests([...labTests, data]); // Add new data to the list
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setShowAddPopup(false)); // Close the popup after adding
  };

  // Handle updating existing patient
  const handleUpdateSubmit = (formData) => {
    fetch(`${API_BASE_URL}/ngopatients/update/${formData.patientId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update the data.");
        }
        return response.json();
      })
      .then((updatedPatient) => {
        console.log("Patient data successfully updated:", updatedPatient);
        setLabTests(labTests.map((patient) => (patient.patientId === updatedPatient.patientId ? updatedPatient : patient))); // Update the patient list
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setShowUpdatePopup(false)); // Close the popup after updating
  };

  const handleCloseAddPopup = () => {
    setShowAddPopup(false);
  };

  const handleCloseUpdatePopup = () => {
    setShowUpdatePopup(false);
    setSelectedPatient(null);
  };

  // Pagination logic
  const filteredLabTests = labTests.filter(patient =>
    patient.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredLabTests.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleNextPage = () => {
    if (indexOfLastRecord < filteredLabTests.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "NewRegistration":
        return (
          <div className="nGOpatientRegistration-content">
            <div className="nGOpatientRegistration-addBtn">
              <button
                className="nGOpatientRegistration-add-button"
                onClick={handleAddNewNGOPatientRegistration}
              >
                + Add New NGO Patient Registration
              </button>
            </div>
            {renderFiltersbyDate()}
            {renderSearchAndResults()}
            {renderTable()}
            {renderPagination()}
          </div>
        );
      case "PatientCounselling":
        return <PatientCounseling />;
      case "FinancialAssistance":
        return <FinancialAssistance />;
      case "SocialWelfareSupport":
        return <SocialWelfareSupport />;
      case "HealthEducationPrograms":
        return <HealthEducationPrograms />;
      case "CommunityOutreach":
        return <CommunityOutreach />;
      default:
        return <div>Content for {selectedTab}</div>;
    }
  };

 
  const renderFiltersbyDate = () => (
    <div className="nGOpatientRegistration-filters">
      <div className="nGOpatientRegistration-controls">
        <div className="nGOpatientRegistration-date-range">
          <label>
            From:
            <input type="date" defaultValue="2024-08-09" />
          </label>
          <label>
            To:
            <input type="date" defaultValue="2024-08-16" />
          </label>
          <button className="nGOpatientRegistration-star-button">☆</button>
          <button className="nGOpatientRegistration-ok-button">OK</button>
        </div>
      </div>
      <div>
        <button className="nGOpatientRegistration-show-data-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
          Show Data
        </button>
      </div>
    </div>
  );

  const renderSearchAndResults = () => {
    const totalResults = filteredLabTests.length; // Get total filtered results
    return (
      <div className="nGOpatientRegistration-search-N-result">
        <div className="nGOpatientRegistration-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="nGOpatientRegistration-results-info">
          <span>Showing {currentRecords.length} / {totalResults} results</span>
          <button className="nGOpatientRegistration-print-button">
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
    );
  };

  const renderTable = () => (
    <table>
      <thead>
        <tr>
          <th>Patient ID</th>
          <th>Patient Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Contact Number</th>
          <th>Department</th>
          <th>Disease</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentRecords.map((test, index) => (
          <tr key={index}>
            <td>{test.patientId}</td>
            <td>{test.patientName}</td>
            <td>{test.age}</td>
            <td>{test.gender}</td>
            <td>{test.contactNumber}</td>
            <td>{test.department}</td>
            <td>{test.disease}</td>
            <td>
              <button
                className="nGOpatientRegistration-edit-button"
                onClick={() => handleEditNGOPatient(test)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderPagination = () => (
    <div className="nGOpatientRegistration-pagination">
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>« Previous</button>
      <span> Page {currentPage} of {Math.ceil(filteredLabTests.length / recordsPerPage)} </span>
      <button onClick={handleNextPage} disabled={indexOfLastRecord >= filteredLabTests.length}>Next »</button>
    </div>
  );

  
  return (
    <div className="nGOpatientRegistration-page">
      <div className="nGOpatientRegistration-N-imu-btn">
        {["NewRegistration", "PatientCounselling", "FinancialAssistance", "SocialWelfareSupport", "HealthEducationPrograms", "CommunityOutreach"].map((tab) => (
          <div key={tab} className="nGOpatientRegistration-tabs">
            <button
              className={`nGOpatientRegistration-tab ${selectedTab === tab ? "nGOpatientRegistration-active" : ""}`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab.replace(/([A-Z])/g, ' $1').trim()}
            </button>
          </div>
        ))}
      </div>

      {renderTabContent()}

      {/* Add NGO Patient Popup */}
      {showAddPopup && (
        <div className="nGOpatientRegistration-modal">
          <div className="nGOpatientRegistration-modal-content">
            <AddNewNGOPatientRegistration onClose={handleCloseAddPopup} onSubmit={handleAddSubmit} />
          </div>
        </div>
      )}

      {/* Update NGO Patient Popup */}
      {showUpdatePopup && selectedPatient && (
        <div className="nGOpatientRegistration-modal">
          <div className="nGOpatientRegistration-modal-content">
            <NGOPatientUpdate
              patient={selectedPatient}
              onClose={handleCloseUpdatePopup}
              onSubmit={handleUpdateSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default NGOpatientRegistration;
