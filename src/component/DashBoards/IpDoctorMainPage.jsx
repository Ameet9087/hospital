import React, { useEffect, useState } from "react";
import "./OpDoctorMainPage.css";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import PatientDashboard from "./PatientDashboard";

function IpDoctorMainPage() {
  const [selectedPatient, setSelectedPatient] = useState();
  const [admittedPatient, setAdmittedPatient] = useState([]);
  const [coConsultantPatient, setCoConsultant] = useState([]);
  const [selectedIpAdmission, setSelectedIpAdmission] = useState([]);
  const [isPatientOPEN, setIsPatientOPEN] = useState(false);

  const [isSearchVisible, setIsSearchVisible] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredAdmittedPatient, setFilteredAdmittedpatient] = useState([]);
  const [filteredConsultantPatient, setFilteredConsultantPatient] = useState(
    []
  );

  const fetchAllAdmittedPatient = async (id = 0) => {
    let response;
    if (id > 0) {
      response = await axios.get(
        `${API_BASE_URL}/ip-admissions/consultant/${id}`
      );
    } else {
      response = await axios.get(`${API_BASE_URL}/ip-admissions/admitted`);
    }
    setAdmittedPatient(response.data);
    setFilteredAdmittedpatient(response.data);
  };

  const fetchAllConsultantAdmittedPatient = async (id = 0) => {
    let response;
    if (id > 0) {
      response = await axios.get(
        `${API_BASE_URL}/ip-admissions/co-consultant/${id}`
      );
    } else {
      response = await axios.get(`${API_BASE_URL}/ip-admissions/admitted`);
    }
    setCoConsultant(response.data);
    setFilteredConsultantPatient(response.data);
  };

  useEffect(() => {
    fetchAllConsultantAdmittedPatient();
    fetchAllAdmittedPatient();
  }, []);

  const handleSelectPatient = (data) => {
    const patient = data.patient;
    setSelectedPatient(patient);
    setSelectedIpAdmission(data);
    setIsPatientOPEN(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query) {
      setFilteredAdmittedpatient(admittedPatient);
      setFilteredConsultantPatient(coConsultantPatient);
      return;
    }

    const lowerQuery = query.toLowerCase();
    if (isSearchVisible === "admittedPatient") {
      const admitPatient = admittedPatient.filter((item) => {
        return (
          item.patient.patient?.firstName.toLowerCase().includes(lowerQuery) ||
          item.patient.patient?.lastName.toLowerCase().includes(lowerQuery) ||
          item.admissionUnderDoctorDetails?.consultantDoctor
            ?.toLowerCase()
            .includes(lowerQuery) ||
          item.patient.patient?.uhid.toLowerCase().includes(lowerQuery) ||
          item.patient.patient?.age.toString().includes(lowerQuery) ||
          item.patient.patient?.gender.toLowerCase().includes(lowerQuery) ||
          item?.admissionDate?.toLowerCase().includes(lowerQuery)
        );
      });
      setFilteredAdmittedpatient(admitPatient);
    } else if (isSearchVisible === "consultant") {
      const coConsultantPatient = coConsultantPatient.filter((item) => {
        return (
          item.patient?.firstName.toLowerCase().includes(lowerQuery) ||
          item.patient?.lastName.toLowerCase().includes(lowerQuery) ||
          item.admissionUnderDoctorDetail.consultantDoctor?.doctorName
            .toLowerCase()
            .includes(lowerQuery) ||
          item.patient?.uhid.toLowerCase().includes(lowerQuery) ||
          item.patient?.age.toString().includes(lowerQuery) ||
          item.patient?.gender.toLowerCase().includes(lowerQuery) ||
          item?.admissionDate?.toLowerCase().includes(lowerQuery)
        );
      });
      setFilteredConsultantPatient(coConsultantPatient);
    }
  };

  return (
    <>
      {isPatientOPEN ? (
        <PatientDashboard
          isPatientOPEN={isPatientOPEN}
          setIsPatientOPEN={setIsPatientOPEN}
          patient={selectedPatient}
          ipAdmission={selectedIpAdmission}
        />
      ) : (
        <div className="doctorMainPage-container">
          <div className="doctorMainPage-subcontainer">
            <div className="doctorMainPage-header">
              <h1>Admitted Patient Under Me</h1>
              <div>
                {isSearchVisible === "admittedPatient" && (
                  <input
                    type="text"
                    value={searchQuery}
                    placeholder="search"
                    onChange={(e) => handleSearch(e.target.value)}
                    className="doctorMainPage-search-input"
                  />
                )}
                <i
                  onClick={() => setIsSearchVisible("admittedPatient")}
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                  className="fa-solid fa-magnifying-glass"
                ></i>
              </div>
            </div>
            <div className="doctorMainPage-boxes">
              {filteredAdmittedPatient.length > 0 ? (
                filteredAdmittedPatient.map((item) => (
                  <div
                    onClick={() => handleSelectPatient(item)}
                    className="doctorMainPage-box"
                  >
                    <div class="doctorMainPage-patient-info">
                      <div class="doctorMainPage-patient-data-img-con">
                        <div class="doctorMainPage-patient-avatar">
                          {!item?.patient?.patient?.hasOwnProperty(
                            "fileAttachment"
                          ) ? (
                            <span>
                              {item?.patient?.patient?.firstName?.[0]}
                            </span>
                          ) : (
                            <img
                              src={`data:image/png;base64,${item?.patient?.patient?.fileAttachment}`}
                              alt="patient attachment"
                            />
                          )}
                        </div>
                        <div className="doctorMainPage-patient-personal-details">
                          <div class="doctorMainPage-info-row">
                            <span class="value">
                              {item.patient?.patient?.firstName}{" "}
                              {item.patient?.patient?.lastName}
                            </span>
                          </div>
                          <div class="doctorMainPage-info-row">
                            <span class="value">
                              {item.patient?.patient?.uhid}
                            </span>
                          </div>
                          <div class="doctorMainPage-info-row">
                            <span class="value">
                              {item.patient?.patient?.age}{" "}
                              {item.patient?.patient?.ageUnit} /{" "}
                              {item.patient?.patient?.gender}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="doctorMainPage-patient-details">
                        <div class="doctorMainPage-info-row">
                          <span class="label">Add. Date/Time:</span>
                          <span class="value">{item.admissionDate}</span>
                        </div>
                        <div class="doctorMainPage-info-row">
                          <span class="label">Ward/Bed:</span>
                          <span class="value">
                            {item.roomDetails.roomTypeDTO?.wardName} /{" "}
                            {item.roomDetails.bedDTO?.bedNo}
                          </span>
                        </div>
                        <div class="doctorMainPage-info-row">
                          <span class="label">Doctor:</span>
                          <span class="value">
                            {
                              item.admissionUnderDoctorDetail.consultantDoctor
                                ?.salutation
                            }{" "}
                            {
                              item.admissionUnderDoctorDetail.consultantDoctor
                                ?.doctorName
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Data Not Available
                </div>
              )}
            </div>
          </div>
          <div className="doctorMainPage-subcontainer">
            <div className="doctorMainPage-header">
              <h1>Patient Under Co-Consultant</h1>
              <div>
                {isSearchVisible === "consultant" && (
                  <input
                    type="text"
                    value={searchQuery}
                    placeholder="search"
                    onChange={(e) => handleSearch(e.target.value)}
                    className="doctorMainPage-search-input"
                  />
                )}
                <i
                  onClick={() => setIsSearchVisible("consultant")}
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                  className="fa-solid fa-magnifying-glass"
                ></i>
              </div>
            </div>
            <div className="doctorMainPage-boxes">
              {filteredConsultantPatient.length > 0 ? (
                filteredConsultantPatient.map((item) => (
                  <div
                    onClick={() => handleSelectPatient(item)}
                    className="doctorMainPage-box"
                  >
                    <div class="doctorMainPage-patient-info">
                      <div class="doctorMainPage-patient-data-img-con">
                        <div class="doctorMainPage-patient-avatar">
                          {!item?.patient?.patient?.hasOwnProperty(
                            "fileAttachment"
                          ) ? (
                            <span>
                              {item?.patient?.patient?.firstName?.[0]}
                            </span>
                          ) : (
                            <img
                              src={`data:image/png;base64,${item?.patient?.patient?.fileAttachment}`}
                              alt="patient attachment"
                            />
                          )}
                        </div>
                        <div className="doctorMainPage-patient-personal-details">
                          <div class="doctorMainPage-info-row">
                            <span class="value">
                              {item.patient?.patient?.firstName}{" "}
                              {item.patient?.patient?.lastName}
                            </span>
                          </div>
                          <div class="doctorMainPage-info-row">
                            <span class="value">
                              {item.patient?.patient?.uhid}
                            </span>
                          </div>
                          <div class="doctorMainPage-info-row">
                            <span class="value">
                              {item.patient?.patient?.age}{" "}
                              {item.patient?.patient?.ageUnit} /{" "}
                              {item.patient?.patient?.gender}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="doctorMainPage-patient-details">
                        <div class="doctorMainPage-info-row">
                          <span class="label">Add. Date/Time:</span>
                          <span class="value">{item.admissionDate}</span>
                        </div>
                        <div class="doctorMainPage-info-row">
                          <span class="label">Ward/Bed:</span>
                          <span class="value">
                            {item.roomDetails.roomTypeDTO?.wardName} /{" "}
                            {item.roomDetails.bedDTO?.bedNo}
                          </span>
                        </div>
                        <div class="doctorMainPage-info-row">
                          <span class="label">Doctor:</span>
                          <span class="value">
                            {
                              item.admissionUnderDoctorDetail.consultantDoctor
                                ?.salutation
                            }{" "}
                            {
                              item.admissionUnderDoctorDetail.consultantDoctor
                                ?.doctorName
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Data Not Available
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default IpDoctorMainPage;
