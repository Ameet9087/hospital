import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import "../MedicalRec/MROutPatientList.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";

function RecordMedical() {
  const [isMenuVisible, setisMenuVisible] = useState(false);
  const [addFinalDiagnosis, setaddFinalDiagnosis] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterByAppointment, setfilterByAppointment] = useState(false);
  const [outpatients, setOutpatients] = useState([]); // State to hold the fetched data
  const [selectedFilters, setSelectedFilters] = useState({
    all: false,
    diagnosisAdded: false,
    diagnosisPending: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Update this according to your data
  const navigate = useNavigate();

  const [filterOption, setFilterOption] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [department, setDepartment] = useState("");
  const [diseaseCategory, setDiseaseCategory] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [addFinalDiagnosisdata, setaddFinalDiagnosisdata] = useState("");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // modal popup

  const [referredOutpatient, setReferredOutpatient] = useState(false);

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      diseaseCategory,
      diagnosis,
      referredOutpatient,
    });
    alert("Data Updated Successfully");
    closeModal();
  };

  const fetchOutpatients = () => {
    axios
      .get(`${API_BASE_URL}/out-patient`)
      .then((response) => {
        const data = response.data;

        // Transform data to match the table structure
        const outpatients = data.map((patient, index) => ({
          serialNo: index + 1,
          patientName: `${patient.firstName} ${patient.middleName || ""} ${
            patient.lastName
          }`.trim(),
          age: `${patient.age} ${patient.ageUnit || ""}`.trim(),
          gender: patient.gender || "N/A",
          doctorName: patient.careOfPerson || "N/A",
          appointmentDate: "N/A", // Assuming no appointment date field in the data
          department: "General", // Placeholder as department is not provided
          icdCode: "N/A", // Placeholder for ICD Code
          finalDiagnosis: patient.isOpd || "N/A",
          action: patient.outPatientId || null,
        }));

        setOutpatients(outpatients);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setOutpatients([]);
      });
  };
  useEffect(() => {
    fetchOutpatients(); // Fetch data initially
  }, [
    currentPage,
    filterByAppointment,
    doctorName,
    department,
    diseaseCategory,
    diagnosis,
    fromDate,
    toDate,
  ]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedFilters((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleFilterData = () => {
    setfilterByAppointment(!filterByAppointment);
    fetchOutpatients(); // Fetch data based on filters
  };

  const toggleMenu = () => {
    setisMenuVisible(!isMenuVisible);
  };

  const EditFinalDiagnosisButton = (data) => {
    console.log(data);

    setaddFinalDiagnosisdata(data);
    setaddFinalDiagnosis(!addFinalDiagnosis);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="MROUt-medical-record">
      <div className="filters-medical-record">
        <div className="filter-group">
          <div classname="filter-group-inner">
            <label className="filter-label">Doctor Filter:</label>
            <select className="filter-select" style={{ marginLeft: "87px" }}>
              <option>----SELECT----</option>
              <option>Dipeeka Palande</option>
              <option>Seema Mulye</option>
              <option>Amar Solase</option>
              <option>Sachin Mehta</option>
            </select>
          </div>
        </div>
        <div className="filter-group">
          <div classname="filter-group-inner">
            <label className="filter-label">Department Filter:</label>
            <select className="filter-select">
              <option>All</option>
              <option>Anesthesia</option>
              <option>Cabin/Deluxe/Suite</option>
              <option>Cardiology</option>
              <option>CT/MRI</option>
            </select>
          </div>
          <br></br>
        </div>
      </div>

      <div className="MROutPatient-tableContainer">
        <h5>Filter by Appointment Date:</h5>
        <div className="MROutPatient-date-filter">
          <label>
            From:
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label>
            To:
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
          <button style={{ marginLeft: "5px" }}>★</button>
          <button style={{ marginLeft: "5px" }} onClick={toggleMenu}>
            {" "}
            -{" "}
          </button>
          {isMenuVisible && (
            <ul
              style={{
                marginLeft: "5px",
                listStyleType: "none",
                padding: "5px",
                border: "1px solid #ccc",
                backgroundColor: "#fff",
              }}
            >
              <li>Last 1 Week</li>
              <li>Last 1 Month</li>
              <li>Last 3 Months</li>
            </ul>
          )}
          <button onClick={handleFilterData}>OK</button>
        </div>
        <div className="MROut-Patient-Header">
          <input
            type="text"
            placeholder="Search"
            className="Admitted-Patient-searchInput"
          />
          <div className="MROut-Patient-actions">
            <span className="MROut-Patient-results">
              Showing {outpatients.length || 0} results
            </span>
          </div>
        </div>
        {filterByAppointment && (
          <>
            <table className="MROut-patientList-table" ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Serial No",
                    "Patient Name",
                    "Age",
                    "Gender",
                    "Doctor Name",
                    "Appointment Date",
                    "Department",
                    "ICD Code",
                    "Final Diagnosis",
                    "Action",
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
                {outpatients.length > 0 ? (
                  outpatients.map((patient, index) => (
                    <tr key={patient.action || index}>
                      <td>{patient.serialNo}</td>
                      <td>{patient.patientName}</td>
                      <td>{patient.age}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.doctorName}</td>
                      <td>{patient.appointmentDate}</td>
                      <td>{patient.department}</td>
                      <td>{patient.icdCode}</td>
                      <td>{patient.finalDiagnosis}</td>
                      <td>
                        <button
                          onClick={() => EditFinalDiagnosisButton(patient)}
                          className="MROut-patientList-table-btn"
                        >
                          Edit Final Diagnosis
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>

      {isModalOpen && outpatients && (
        <div className="MROUT-container-birthlist">
          <button type="button" className="cut-button" onClick={closeModal}>
            X
          </button>

          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <p>Add Final Diagnosis</p>
                <button className="close-button" onClick={closeModal}>
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <div className="modal-body-content">
                  <h5>
                    <i className="bi bi-person-circle"></i>{" "}
                    {addFinalDiagnosisdata.patientName}
                  </h5>
                  <div className="MROut-patientList-details-section">
                    <p>
                      <strong>Outpatient No:</strong>{" "}
                      {addFinalDiagnosisdata?.outPatientId} &nbsp;&nbsp;
                      <strong>Age:</strong> {addFinalDiagnosisdata.age}{" "}
                      &nbsp;&nbsp;
                      <strong>Visit Date:</strong>{" "}
                      {addFinalDiagnosisdata.visitDate}
                    </p>
                    <p>
                      <strong>Contact No:</strong>{" "}
                      {addFinalDiagnosisdata.contactNo} &nbsp;&nbsp;
                      <strong>Doctor Name:</strong>{" "}
                      {addFinalDiagnosisdata.doctorName}
                    </p>
                    <p>
                      <strong>Department:</strong>{" "}
                      {addFinalDiagnosisdata.department} &nbsp;&nbsp;
                      <strong>Address:</strong> {addFinalDiagnosisdata.address}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="MROut-patientList-form-group">
                    <label>Select Disease Category:</label>
                    <select
                      value={diseaseCategory}
                      onChange={(e) => setDiseaseCategory(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option>Communicable, Vector Borne</option>
                      <option>
                        Cardiovascular & Respiratory Related Problems
                      </option>
                      <option>Certain Infectious or parasitic diseases</option>
                      <option>Ear, Nose and Throat Infection</option>
                    </select>
                  </div>

                  <div className="MROut-patientList-form-group">
                    <label>Select Diagnosis:</label>
                    <input
                      type="text"
                      placeholder="ICD-11"
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                    />
                  </div>

                  <div className="MROut-patientList-checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={referredOutpatient}
                        onChange={(e) =>
                          setReferredOutpatient(e.target.checked)
                        }
                      />
                      Referred Outpatient?
                    </label>
                  </div>

                  <div className="MROut-patientList-footer-buttons">
                    <button
                      type="submit"
                      className="MROut-patientList-update-button"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="MROut-patientList-cancel-button"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecordMedical;
