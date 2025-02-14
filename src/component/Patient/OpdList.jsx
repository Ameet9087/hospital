import React, { useEffect, useRef, useState } from "react";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import axios from "axios";
import "./OpdList.css";
import { API_BASE_URL } from "../api/api";
import { useFilter } from "../ShortCuts/useFilter";
import { useNavigate } from "react-router-dom";

const OpdList = () => {
  const navigate = useNavigate();
  const [columnWidths, setColumnWidths] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const tableRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    const fetchPatientData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/out-patient`);
        const data = response.data;
        setPatients(data);
        //   console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  const filteredItems = useFilter(patients, searchTerm);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePatientClick = (patient, status) => {
    if (status == "Convert") {
      navigate("/patient/registerpatient", { state: { patient: patient } });
    } else if (status == "Update") {
      navigate("/patient/checkIn", { state: { patient: patient } });
    }
  };
  return (
    <div className="opdList-container">
      <div className="OutPatient-search">
        <input
          type="text"
          placeholder="Search by substore name"
          className="manage-substore-search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="patientList-table" ref={tableRef}>
        <thead>
          <tr>
            {["UHID", "Name", "Age/Sex", "VisitType", "Actions"].map(
              (header, index) => (
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
              )
            )}
          </tr>
        </thead>
        <tbody>
          {filteredItems?.length > 0 ? (
            filteredItems?.map((patient, index) => (
              <tr key={index}>
                <td>{patient.uhid}</td>
                <td>{`${patient.firstName} ${patient.lastName}`}</td>
                <td>
                  {patient.age}/{patient.gender}
                </td>
                <td>{patient.isOpd}</td>
                <td>
                  <div className="OutPatientList-action-button-container">
                    <button
                      className="OutPatientList-action-button"
                      onClick={() => handlePatientClick(patient, "Convert")}
                    >
                      Convert To Ipd
                    </button>
                    <button
                      className="OutPatientList-action-button"
                      onClick={() => handlePatientClick(patient, "Update")}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="OutPatient-no-data">
                No Rows To Show
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OpdList;
