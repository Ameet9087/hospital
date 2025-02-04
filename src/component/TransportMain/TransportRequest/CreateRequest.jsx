import React, { useState, useEffect } from "react";
import "./CreateRequest.css";
import PopupTable from "../../Admission/PopupTable";
import { FaSearch } from "react-icons/fa";
import { API_BASE_URL } from "../../api/api";

const CreateRequest = ({ onClose, onSubmit }) => {
  const [activePopup, setActivePopup] = useState(null);
  const [patient, setPatient] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patientHeading = ["firstName", "lastName", "age", "gender"];
  const [patient_id, setPatientId] = useState("");
  const [transportType, setTransportType] = useState("");
  const [priority, setPriority] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");

  useEffect(() => {
    const fetchTransferPatients = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/transport-info`);
        if (!response.ok) {
          throw new Error("Failed to fetch transport info");
        }
        const data = await response.json();

        // Extract patient data from response
        const formattedPatients = data.map((item) => ({
          patientRegistrationId: item.inPatient?.patient?.patientRegistrationId,
          firstName: item.inPatient?.patient?.firstName,
          lastName: item.inPatient?.patient?.lastName,
          age: item.inPatient?.patient?.age,
          gender: item.inPatient?.patient?.gender,
        }));

        setPatient(formattedPatients);
        console.log("formattedPatients", formattedPatients);

      } catch (error) {
        console.error("Error fetching transport info:", error);
      }
    };

    fetchTransferPatients();
  }, []);



  const getPopupData = () => {
    if (activePopup === "transportrequest") {
      return { columns: patientHeading, data: patient };
    }
    return { columns: [], data: [] };
  };

  const handleSelect = (selectedData) => {
    if (activePopup === "transportrequest") {
      setSelectedPatient({
        patientRegistrationId: patient?.inPatient?.patient?.patientRegistrationId,
        // patient_id:selectedData.inPatient?.patient?.patientRegistrationId
      });
      console.log("111111111111111", selectedData);

      // setPatientId(selectedData.inPatient?.patient?.patientRegistrationId);

      console.log(patient_id);

      setActivePopup(null);
    }
  };

  const { columns, data } = getPopupData();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPatient || !pickupLocation || !dropLocation || !transportType || !priority) {
      alert("All fields are required!");
      return;
    }

    const requestData = {
      requestType: transportType,
      status: priority,
      pickupLocation: pickupLocation,
      dropoffLocation: dropLocation,
      //requestTime: new Date().toISOString().slice(0, 19).replace("T", " "), // Format to YYYY-MM-DD HH:mm:ss
    };

    try {
      const response = await fetch(`${API_BASE_URL}/vehicle-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      alert("Transport request created successfully!");

      // Reset form fields after successful submission
      // setSelectedPatient(null);
      setTransportType("");
      setPriority("");
      setPickupLocation("");
      setDropLocation("");

      // if (onSubmit) {
      //   onSubmit(result);
      // }
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  return (
    <div className="transport-request-modal-overlay">
      <div className="transport-request-modal-content">
        <span className="transport-request-modal-content-heading-text">
          Create Transport Request
        </span>

        <form >
          {/* <div className="transport-request-form-group">
            <label>Patient ID:</label>
            <input
              type="number"
              name="patient_id"
              value={selectedPatient?.patientRegistrationId || ''}
              readOnly
            />
            <FaSearch onClick={() => setActivePopup("transportrequest")} />
          </div> */}

          <div className="transport-request-form-group">
            <label>Transport Type:</label>
            <select
              value={transportType}
              onChange={(e) => setTransportType(e.target.value)}
              required
            >
              <option value="">Select Transport Type</option>
              <option value="Patient Transfer">Patient Transfer</option>
              <option value="Equipment Transport">Equipment Transport</option>
              <option value="Lab Sample Transfer">Lab Sample Transfer</option>
            </select>
          </div>

          <div className="transport-request-form-group">
            <label>Priority:</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className="transport-request-form-group">
            <label>Pickup Location:</label>
            <input
              type="text"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              required
            />
          </div>

          <div className="transport-request-form-group">
            <label>Drop-off Location:</label>
            <input
              type="text"
              value={dropLocation}
              onChange={(e) => setDropLocation(e.target.value)}
              required
            />
          </div>

          <div className="transport-request-modal-actions">
            <button onClick={handleSubmit} className="transport-request-model-action-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>

      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(null)}
        />
      )}
    </div>
  );
};

export default CreateRequest;
