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

  const fetchAllAdmittedPatient = async (id = 2) => {
    let response;
    if (id > 0) {
      response = await axios.get(
        `${API_BASE_URL}/ip-admissions/consultant/${id}`
      );
    } else {
      response = await axios.get(`${API_BASE_URL}/ip-admissions/admitted`);
    }
    setAdmittedPatient(response.data);
  };

  const fetchAllConsultantAdmittedPatient = async (id = 2) => {
    let response;
    if (id > 0) {
      response = await axios.get(
        `${API_BASE_URL}/ip-admissions/co-consultant/${id}`
      );
    } else {
      response = await axios.get(`${API_BASE_URL}/ip-admissions/admitted`);
    }
    setCoConsultant(response.data);
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
            </div>
            <div className="doctorMainPage-boxes">
              {admittedPatient.length > 0 ? (
                admittedPatient.map((item) => (
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
              <h1>Admitted Patient Under Co-Consultant</h1>
            </div>
            <div className="doctorMainPage-boxes">
              {coConsultantPatient.length > 0 ? (
                coConsultantPatient.map((item) => (
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
