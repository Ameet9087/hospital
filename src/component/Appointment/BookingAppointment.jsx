import React, { useState, useEffect, useRef } from "react";
import "./BookingAppointment.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios if you are using it
import { startResizing } from "../../TableHeadingResizing/ResizableColumns.js";
import AddNewAppointmentForm from "./AddNewappointment";
import { API_BASE_URL } from "../api/api.js"
import { toast } from "react-toastify";

const BookingAppointment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/appointments/fetch-all-appointment`
        );
        setPatients(response.data);
      } catch (error) {
        toast.error("Failed to fetch patient data.");
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPatients = patients.filter((patient) =>
    Object.values(patient).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleUpdatePatient = (patient) => {
    navigate("/appointment/add-new-appointment", { state: { patientData: patient } });
  };

  const handleNewPatient = () => {
    navigate("/appointment/add-new-appointment");
  };

  return (
    <>
      <div className="bookAppointment-container">
        <button
          className="bookAppointment-new-patient-btn"
          onClick={handleNewPatient}
        >
          + New Patient
        </button>
        <br></br>
        <div className="bookAppointment-search-bar-container">
          <div className="bookAppointment-search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <i className="fas fa-search"></i>
          </div>
          <div className="bookAppointment-results-info">
            <span>
              Showing {filteredPatients.length} / {patients.length} results
            </span>
            <button className="bookAppointment-print-btn">Print</button>
          </div>
        </div>
        <div className="table-container">
          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Patient Name",
                  "Age/Sex",
                  "Appointment Date & Time",
                  "Phone",
                  "Actions",
                ].map((header, index) => (
                  <th
                    key={index}
                    style={{ width: columnWidths[index] }}
                    className="bookAppointment-resizable-th"
                  >
                    <div className="bookAppointment-header-content">
                      <span>{header}</span>
                      <div
                        className="bookAppointment-resizer"
                        onMouseDown={startResizing(
                          tableRef,
                          setColumnWidths
                        )(index)}
                      ></div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPatients?.map((patient, index) => (
                <tr key={index}>
                  <td>
                    {patient.firstName} {patient.lastName}
                  </td>
                  <td>
                    {patient.age} {patient.ageUnit} / {patient.gender}
                  </td>
                  <td>
                    {patient.appointmentDate} {patient.appointmentTime}
                  </td>
                  <td>{patient.contactNumber}</td>
                  <td>
                    <button
                      className="bookAppointment-create-appointment-btn"
                      onClick={() => handleUpdatePatient(patient)}
                    >
                      Update Appointment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BookingAppointment;
