import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure you have imported axios
import "./exchangebed.css";
import { API_BASE_URL } from "../api/api";

const ExchangeBed = () => {
  const [desiredBed, setDesiredBed] = useState("");
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [beds, setBeds] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle bed selection
  const handleDesiredBedChange = (event) => {
    const selectedBedId = event.target.value;
    const selectedBed = beds.find(
      (bed) => bed.manageBedId === parseInt(selectedBedId)
    );

    if (selectedBed?.status === "Reserved") {
      setErrorMessage("Bed is reserved. You cannot change to this bed.");
    } else {
      setErrorMessage("");
    }

    setDesiredBed(selectedBedId);
  };

  // Fetch admitted patients
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/admissions/fetch`);
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Fetch beds based on the selected patient
  useEffect(() => {
    const fetchBedsByWardAndFeature = async () => {
      if (selectedPatient) {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/manage-bed/AllBedByWardId?wardId=${selectedPatient.wardDepartmentDTO?.wardDepartmentId}`
          );
          setBeds(response.data); // Update the beds based on the selected ward and bed feature
        } catch (error) {
          console.error("Error fetching filtered beds:", error);
        }
      }
    };

    fetchBedsByWardAndFeature();
  }, [selectedPatient]);

  // Handle the search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle the search when user enters a patient name or ID
  const handleSearch = () => {
    const foundPatient = patients.find(
      (patient) =>
        patient.patientDTO?.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        patient.patientDTO?.lastName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        patient.patientDTO?.patientId.toString() === searchTerm
    );
    if (foundPatient) {
      setSelectedPatient(foundPatient);
    } else {
      setSelectedPatient(null);
      alert("Patient not found");
    }
  };

  // Handle saving the bed change
  const handleSave = async () => {
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    if (!desiredBed) {
      alert("Please select a desired bed.");
      return;
    }

    const bedChangePayload = {
      oldBedId: JSON.stringify(selectedPatient.manageBedDTO?.manageBedId),
      newBedId: desiredBed,
    };

    console.log(bedChangePayload);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/admissions/update-bed/${selectedPatient.admissionId}`,
        bedChangePayload
      );
      alert("Bed changed successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error saving bed change:", error);
      alert("An error occurred while saving the bed change.");
    }
  };

  // Handle discarding changes
  const handleDiscard = () => {
    setDesiredBed("");
    setSelectedPatient(null);
    setSearchTerm("");
  };

  return (
    <div className="adt-exchange-bed-page-container">
      <h2>Exchange Bed</h2>

      {/* Search Patient Input */}
      <div className="adt-exchange-bed-page-search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by Patient Name or ID"
          className="adt-exchange-bed-page-input"
        />
        <button
          onClick={handleSearch}
          className="adt-exchange-bed-page-search-button"
        >
          Search
        </button>
      </div>

      {/* Bed Info Container */}
      {selectedPatient ? (
        <>
          <div className="adt-exchange-bed-page-bed-info-container">
            {/* Current Bed Information */}
            <div className="adt-exchange-bed-page-info-section">
              <center>
                <h6>Current Bed Information</h6>
              </center>
              <p>
                <strong>Ward:</strong>{" "}
                {selectedPatient.wardDepartmentDTO?.wardName || "N/A"}
              </p>
              <p>
                <strong>Bed Feature:</strong>{" "}
                {selectedPatient.wardBedFeatureDTO?.featureName || "N/A"}
              </p>
              <p>
                <strong>Bed:</strong> {selectedPatient.manageBedDTO?.wardType}-
                {selectedPatient.manageBedDTO?.bedNumber || "N/A"}
              </p>
            </div>

            {/* Desired Bed Information */}
            <div className="adt-exchange-bed-page-info-section">
              <center>
                <h6>Desired Bed Information</h6>
              </center>
              <p>
                <strong>Ward:</strong>{" "}
                {selectedPatient.wardDepartmentDTO?.wardName || "N/A"}
              </p>
              <p>
                <strong>Bed Feature:</strong>{" "}
                {selectedPatient.wardBedFeatureDTO?.featureName || "N/A"}
              </p>
              <div>
                <label>
                  <strong>Bed:</strong>
                </label>
                <select
                  value={desiredBed}
                  onChange={handleDesiredBedChange}
                  className="adt-exchange-bed-page-select"
                >
                  <option value="">Select desired bed</option>

                  {beds.length > 0 &&
                    beds.map((item) => (
                      <option
                        key={item.manageBedId}
                        value={`${item.manageBedId}`}
                      >
                        {item.wardType}-{item.bedNumber}{" "}
                        {item.status === "Reserved" ? "(Reserved)" : ""}
                      </option>
                    ))}
                </select>
              </div>
              {beds.length == 0 && (
                <p className="adt-exchange-bed-error-message">
                  No Beds Available To Exchange
                </p>
              )}
              {errorMessage && (
                <p className="adt-exchange-bed-error-message">{errorMessage}</p>
              )}
            </div>
          </div>

          <div className="adt-exchange-bed-page-button-container">
            <button
              className="adt-exchange-bed-page-discard-button"
              onClick={handleDiscard}
            >
              Discard
            </button>
            <button
              className="adt-exchange-bed-page-save-button"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <p>No patient selected. Please search for a patient.</p>
      )}
    </div>
  );
};

export default ExchangeBed;
