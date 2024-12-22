import React, { useState, useEffect, useRef } from "react";
import "./patientList.css";
import VaccinationRegister from "./VaccinationRegister";
import UpdateVaccinationRegister from "./UpdateVaccinationRegister";
import Sticker from "./Sticker";
import VaccinationFollowup from "./VaccinationFollowup";
import PatientVaccinationDetails from "./PatientVaccinationDetails";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";

function Patientlist() {
  const [patients, setPatients] = useState([]);
  const [isVaccinationRegister, setIsVaccinationRegister] = useState(false);
  const [isUpdateVaccinationRegister, setIsUpdateVaccinationRegister] =useState(false);
  const [isVaccinationDetail, setIsVaccinationDetails] = useState(false);
  const [isStickerPopupOpen, setIsStickerPopupOpen] = useState(false);
  const [isFollowupPopupOpen, setIsFollowupPopupOpen] = useState(false);
  const [activeMoreOptionsIndex, setActiveMoreOptionsIndex] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/vaccinations/allVaccine`)
      .then((response) => response.json())
      .then((response) => setPatients(response))
      .catch((error) => console.error("Error fetching patient data:", error));
  }, [isVaccinationRegister, isUpdateVaccinationRegister]);

  const openRegisterPopup = () => setIsVaccinationRegister(true);
  const closeRegisterPopup = () => setIsVaccinationRegister(false);
  const closeUpdateRegisterPopup = () => setIsUpdateVaccinationRegister(false);
  const closeVaccinationDetailsPopup = () => setIsVaccinationDetails(false);
  const openStickerPopup = (patientDetails) => {
    setIsStickerPopupOpen(true);
    setPatientDetails(patientDetails);
  };
  const closeStickerPopup = () => setIsStickerPopupOpen(false);
  const openFollowupPopup = (patient) => {
    setIsFollowupPopupOpen(true);
    setPatientDetails(patient);
  };
  const closeFollowupPopup = () => setIsFollowupPopupOpen(false);
  const toggleMoreOptions = (index) => {
    setActiveMoreOptionsIndex(activeMoreOptionsIndex === index ? null : index);
  };

  const handleUpdateRegister = (patient) => {
    setPatientDetails(patient);
    setIsUpdateVaccinationRegister(true);
  };

  const handleVaccinationDetails = (patient) => {
    setPatientDetails(patient);
    setIsVaccinationDetails(true);
  };

  return (
    <div className="patientList">
      <div className="patientList-create">
        <button className="" onClick={openRegisterPopup}>
          + Create Vaccination Patient
        </button>
      </div>
      <div className="patientList-search-bar">
        <div className="patientList-search-container">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              setPatients((prevPatients) =>
                prevPatients.filter(
                  (patient) =>
                    patient.babyName.toLowerCase().includes(searchTerm) ||
                    patient.motherName.toLowerCase().includes(searchTerm)
                )
              );
            }}
          />
          <i className="fas fa-search"></i>
        </div>
        <div>
          <span className="patientList-results-count">
            Showing {patients.length} / {patients.length} results
          </span>
          <button className="patientList-print-btn">Print</button>
        </div>
      </div>
      <div className="table-container">
        <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Id",
                "Baby's Name",
                "Age/Sex",
                "Mother's Name",
                "Address",
                "Actions",
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
            {patients.map((patient, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{patient.babyName}</td>
                <td>
                  {patient.age} {patient.ageUnit} {patient.gender}
                </td>
                <td>{patient.motherName}</td>
                <td>{patient.address}</td>
                {/* <td>{patient.vaccinationDoses}</td>
              <td>
              {patient.daysPassed !== null ? patient?.daysPassed : "N/A"}
              </td> */}
                <td>
                  <button
                    onClick={() => openStickerPopup(patient)}
                    className="patientList-table-btn"
                    type="button"
                  >
                    Sticker
                  </button>
                  <button
                    className="patientList-table-btn"
                    onClick={() => handleUpdateRegister(patient)}
                  >
                    Edit
                  </button>
                  <button
                    className="patientList-table-btn"
                    onClick={() => handleVaccinationDetails(patient)}
                  >
                    Vaccination
                  </button>
                  {/* <button
                  onClick={() => openFollowupPopup(patient)}
                  className="patientList-table-btn"
                  type="button"
                  >
                  Follow-up
                  </button>
                  <button
                  onClick={() => toggleMoreOptions(index)}
                  className="patientList-table-btn patientList-table-moreBtn"
                  type="button"
                  >
                  More...
                  </button> */}
                  {/* {activeMoreOptionsIndex === index && (
                  <div className="patientList-more-options"></div>
                  )} */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isVaccinationRegister && (
        <VaccinationRegister onClose={closeRegisterPopup} />
      )}
      {isUpdateVaccinationRegister && (
        <UpdateVaccinationRegister
          patient={patientDetails}
          onClose={closeUpdateRegisterPopup}
        />
      )}
      {isStickerPopupOpen && (
        <Sticker patient={patientDetails} onClose={closeStickerPopup} />
      )}
      {isFollowupPopupOpen && (
        <VaccinationFollowup
          onClose={closeFollowupPopup}
          patient={patientDetails}
        />
      )}
      {isVaccinationDetail && (
        <PatientVaccinationDetails
          onClose={closeVaccinationDetailsPopup}
          patient={patientDetails}
        />
      )}
    </div>
  );
}
export default Patientlist;
