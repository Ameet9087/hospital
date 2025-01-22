import React, { useEffect, useState } from "react";
import "./OpDoctorMainPage.css";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import PatientDashboard from "./PatientDashboard";

function DoctorMainPage() {
  const [selectedPatient, setSelectedPatient] = useState();
  const [myAppointment, setMyAppointment] = useState([]);
  const [newPatient, setNewPatient] = useState([]);
  const [followUpPatient, setFollowUpPatient] = useState([]);

  const [isPatientOPEN, setIsPatientOPEN] = useState(false);

  const fetchAllMyAppointments = async (id = 0) => {
    let response;
    if (id > 0) {
      response = await axios.get(
        `${API_BASE_URL}/appointments/findByDoctorAndDate/${id}`
      );
    } else {
      response = await axios.get(`${API_BASE_URL}/appointments/today`);
    }
    console.log(response.data);

    setMyAppointment(response.data);
  };

  const fetchAllNewPatientWhosePaymentIsDone = async (id = 0) => {
    let response;
    if (id > 0) {
      response = await axios.get(
        `${API_BASE_URL}/appointments/findByDoctorAndPaid/${id}`
      );
    } else {
      response = await axios.get(`${API_BASE_URL}/appointments/paid`);
    }
    setNewPatient(response.data);
  };

  const fetchFollowUpWhosePaymentIsDone = async (id = 0) => {
    let response;
    if (id > 0) {
      response = await axios.get(
        `${API_BASE_URL}/appointments/findFollowUpAppointments/${id}`
      );
    } else {
      response = await axios.get(`${API_BASE_URL}/appointments/today/followUp`);
    }
    setFollowUpPatient(response.data);
  };

  useEffect(() => {
    fetchAllMyAppointments();
    fetchAllNewPatientWhosePaymentIsDone();
    fetchFollowUpWhosePaymentIsDone();
  }, []);

  const handleSelectPatient = (data) => {
    setSelectedPatient(data);
    setIsPatientOPEN(true);
  };

  return (
    <>
      {isPatientOPEN ? (
        <PatientDashboard
          isPatientOPEN={isPatientOPEN}
          setIsPatientOPEN={setIsPatientOPEN}
          patient={selectedPatient}
        />
      ) : (
        <div className="doctorMainPage-container">
          <div className="doctorMainPage-subcontainer">
            <div className="doctorMainPage-header">
              <h1>My Appointments</h1>
            </div>
            <div className="doctorMainPage-boxes">
              {myAppointment.length > 0 ? (
                myAppointment.map((item) => (
                  <div className="doctorMainPage-box">
                    <div class="doctorMainPage-patient-info">
                      <div class="doctorMainPage-patient-data-img-con">
                        <div class="doctorMainPage-patient-avatar">
                          {!item?.patient?.hasOwnProperty("fileAttachment") ? (
                            <span>{item?.patient?.firstName?.[0]}</span>
                          ) : (
                            <img
                              src={`data:image/png;base64,${item?.patient?.fileAttachment}`}
                              alt="patient attachment"
                            />
                          )}
                        </div>
                        <div className="doctorMainPage-patient-personal-details">
                          <div class="doctorMainPage-info-row">
                            <span class="value">
                              {item.patient?.firstName} {item.patient?.lastName}
                            </span>
                          </div>
                          <div class="doctorMainPage-info-row">
                            <span class="value">{item.patient?.uhid}</span>
                          </div>
                          <div class="doctorMainPage-info-row">
                            <span class="value">
                              {item.patient?.age} {item.patient?.ageUnit} /{" "}
                              {item.patient?.gender}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="doctorMainPage-patient-details">
                        <div class="doctorMainPage-info-row">
                          <span class="label">Fees Paid:</span>
                          <span class="value">{item.feespaid}</span>
                        </div>
                        <div class="doctorMainPage-info-row">
                          <span class="label">Reason:</span>
                          <span class="value">{item.remarks}</span>
                        </div>
                        <div class="doctorMainPage-info-row">
                          <span class="label">Doctor:</span>
                          <span class="value">
                            {item.addDoctor?.salutation}{" "}
                            {item.addDoctor?.doctorName}
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
              <h1>New Patients</h1>
            </div>
            <div className="doctorMainPage-boxes">
              {newPatient.length > 0 ? (
                newPatient.map((item) => (
                  <div
                    onClick={() => handleSelectPatient(item)}
                    className="doctorMainPage-box"
                  >
                    <div class="doctorMainPage-patient-info">
                      <div class="doctorMainPage-patient-data-img-con">
                        <div class="doctorMainPage-patient-avatar">
                          {!item?.patient?.hasOwnProperty("fileAttachment") ? (
                            <span>{item?.patient?.firstName?.[0]}</span>
                          ) : (
                            <img
                              src={`data:image/png;base64,${item?.patient?.fileAttachment}`}
                              alt="patient attachment"
                            />
                          )}
                        </div>
                        <div className="doctorMainPage-patient-personal-details">
                          <div class="doctorMainPage-info-row">
                            <span class="value">
                              {item.patient?.firstName} {item.patient?.lastName}
                            </span>
                          </div>
                          <div class="doctorMainPage-info-row">
                            <span class="value">{item.patient?.uhid}</span>
                          </div>
                          <div class="doctorMainPage-info-row">
                            <span class="value">
                              {item.patient?.age} {item.patient?.ageUnit} /{" "}
                              {item.patient?.gender}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="doctorMainPage-patient-details">
                        <div class="doctorMainPage-info-row">
                          <span class="label">Fees Paid:</span>
                          <span class="value">{item.feespaid}</span>
                        </div>
                        <div class="doctorMainPage-info-row">
                          <span class="label">Reason:</span>
                          <span class="value">{item.remarks}</span>
                        </div>
                        <div class="doctorMainPage-info-row">
                          <span class="label">Doctor:</span>
                          <span class="value">
                            {item.addDoctor?.salutation}{" "}
                            {item.addDoctor?.doctorName}
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
              <h1>FollowUp Patients</h1>
            </div>
            <div className="doctorMainPage-boxes">
              {followUpPatient.length > 0 ? (
                followUpPatient.map((item) => (
                  <div
                    onClick={() => handleSelectPatient(item)}
                    className="doctorMainPage-box"
                  >
                    <div class="doctorMainPage-patient-info">
                      <div class="doctorMainPage-patient-data-img-con">
                        <div class="doctorMainPage-patient-avatar">
                          {!item?.patient?.hasOwnProperty("fileAttachment") ? (
                            <span>{item?.patient?.firstName?.[0]}</span>
                          ) : (
                            <img
                              src={`data:image/png;base64,${item?.patient?.fileAttachment}`}
                              alt="patient attachment"
                            />
                          )}
                        </div>
                        <div className="doctorMainPage-patient-personal-details">
                          <div class="doctorMainPage-info-row">
                            <span class="value">
                              {item.patient?.firstName} {item.patient?.lastName}
                            </span>
                          </div>
                          <div class="doctorMainPage-info-row">
                            <span class="value">{item.patient?.uhid}</span>
                          </div>
                          <div class="doctorMainPage-info-row">
                            <span class="value">
                              {item.patient?.age} {item.patient?.ageUnit} /{" "}
                              {item.patient?.gender}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="doctorMainPage-patient-details">
                        <div class="doctorMainPage-info-row">
                          <span class="label">Fees Paid:</span>
                          <span class="value">{item.feespaid}</span>
                        </div>
                        <div class="doctorMainPage-info-row">
                          <span class="label">Reason:</span>
                          <span class="value">{item.remarks}</span>
                        </div>
                        <div class="doctorMainPage-info-row">
                          <span class="label">Doctor:</span>
                          <span class="value">
                            {item.addDoctor?.salutation}{" "}
                            {item.addDoctor?.doctorName}
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

export default DoctorMainPage;
