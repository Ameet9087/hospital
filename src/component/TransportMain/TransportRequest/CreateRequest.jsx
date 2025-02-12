import React, { useState, useEffect } from "react";
import "./CreateRequest.css";
import PopupTable from "../../Admission/PopupTable";
import { FaSearch } from "react-icons/fa";
import { API_BASE_URL } from "../../api/api";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";
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
        patientRegistrationId:
          patient?.inPatient?.patient?.patientRegistrationId,
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

      toast.success("Transport request created successfully!");

      setTransportType("");
      setPriority("");
      setPickupLocation("");
      setDropLocation("");
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed Transport request ");
    }
  };

  return (
    <div className="transport-request-modal-overlay">
      <div className="transport-request-modal-content">
        <span className="transport-request-modal-content-heading-text">
          Create Transport Request
        </span>

        <form>
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
            <FloatingSelect
              label="Transport Type"
              name="transportType"
              value={transportType}
              onChange={(e) => setTransportType(e.target.value)}
              options={[
                { value: "", label: "Select Transport Type" },
                { value: "Patient Transfer", label: "Patient Transfer" },
                { value: "Equipment Transport", label: "Equipment Transport" },
                { value: "Lab Sample Transfer", label: "Lab Sample Transfer" },
              ]}
              required
            />
          </div>

          <div className="transport-request-form-group">
            <FloatingSelect
              label="Priority"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              options={[
                { value: "", label: "Select Priority" },
                { value: "Low", label: "Low" },
                { value: "Medium", label: "Medium" },
                { value: "High", label: "High" },
                { value: "Critical", label: "Critical" },
              ]}
              required
            />
          </div>

          <div className="transport-request-form-group">
            
            <FloatingInput
              label={"Pickup Location"}
              type="text"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              required
            />
          </div>

          <div className="transport-request-form-group">
            <FloatingInput
              label={"Drop-off Location"}
              type="text"
              value={dropLocation}
              onChange={(e) => setDropLocation(e.target.value)}
              required
            />
          </div>

          <div className="transport-request-modal-actions">
            <button
              onClick={handleSubmit}
              className="transport-request-model-action-button"
              type="submit"
            >
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
