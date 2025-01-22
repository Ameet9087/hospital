import React, { useEffect, useState } from "react";
import "./wardNurseDashboard.css";
import axios from "axios";
import { API_BASE_URL } from "../../../api/api";
import NursingPatientDashboard from "./NursingPatientDashboard";

function wardNurseDashboard() {
  const [selectedPatient, setSelectedPatient] = useState();
  const [selectedIpAdmission, setSelectedIpAdmission] = useState([]);
  const [confirmBox, setConfirmBox] = useState(false);
  const [wardReceiving, setWardRecieving] = useState([]);
  const [admittedPatient, setAdmittedpatient] = useState([]);
  const [selectedIpAdmissionId, setSelectedIpAdmissionId] = useState();
  const [wardRequest, setWardRequest] = useState([]);
  const [pendingRequest, setPendingRequest] = useState([]);

  const [isPatientOPEN, setIsPatientOPEN] = useState(false);

  const fetchAllWardReceiving = async () => {
    const response = await axios.get(`${API_BASE_URL}/ip-admissions/pending`);
    console.log(response.data);

    setWardRecieving(response.data);
  };

  const fetchAllAdmittedPatient = async () => {
    const response = await axios.get(`${API_BASE_URL}/ip-admissions/admitted`);
    setAdmittedpatient(response.data);
  };
  const fetchAllRequestedWardData = async () => {
    const response = await axios.get(`${API_BASE_URL}/ward-request-change/all`);
    setWardRequest(response.data);
  };

  // const fetchAllPendingRequest = async () => {
  //   const response = await axios.get(`${API_BASE_URL}/`);
  //   setPendingRequest(response.data);
  // };

  useEffect(() => {
    fetchAllWardReceiving();
    fetchAllAdmittedPatient();
    fetchAllRequestedWardData();
    // fetchAllPendingRequest();
  }, [isPatientOPEN, confirmBox]);

  const handleSelectPatient = (data) => {
    setSelectedPatient(data.patient);
    setSelectedIpAdmission(data);
    setIsPatientOPEN(true);
  };

  const handleConfirmBtn = async (id) => {
    console.log(id);
    try {
      await axios.put(
        `${API_BASE_URL}/ip-admissions/${id}/admit?admissionStatus=ADMITTED`
      );
      setConfirmBox(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isPatientOPEN ? (
        <NursingPatientDashboard
          isPatientOPEN={isPatientOPEN}
          setIsPatientOPEN={setIsPatientOPEN}
          patient={selectedPatient}
          ipAdmission={selectedIpAdmission}
        />
      ) : (
        <>
          <div className="nurseMainPage-container">
            <div className="nurseMainPage-subcontainer">
              <div className="nurseMainPage-header">
                <h1>Ward Receiving</h1>
              </div>
              <div className="nurseMainPage-boxes">
                {wardReceiving.length > 0 ? (
                  wardReceiving.map((item) => (
                    <div className="nurseMainPage-box">
                      <div class="nurseMainPage-patient-info">
                        <div class="nurseMainPage-patient-data-img-con">
                          <div class="nurseMainPage-patient-avatar">
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
                          <div className="nurseMainPage-patient-personal-details">
                            <div class="nurseMainPage-info-row">
                              <span class="value">
                                {item.patient?.patient?.firstName}{" "}
                                {item.patient?.patient?.lastName}
                              </span>
                            </div>
                            <div class="nurseMainPage-info-row">
                              <span class="value">
                                {item.patient?.patient?.uhid}
                              </span>
                            </div>
                            <div class="nurseMainPage-info-row">
                              <span class="value">
                                {item.patient?.patient?.age}{" "}
                                {item.patient?.patient?.ageUnit} /{" "}
                                {item.patient?.patient?.gender}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="nurseMainPage-patient-details">
                          <div class="nurseMainPage-info-row">
                            <span class="label">Add. Date/Time:</span>
                            <span class="value">{item.admissionDate}</span>
                          </div>
                          <div class="nurseMainPage-info-row">
                            <span class="label">Ward/Bed:</span>
                            <span class="value">
                              {item.roomDetails.roomTypeDTO?.wardName} /{" "}
                              {item.roomDetails.bedDTO?.bedNo}
                            </span>
                          </div>
                          <div class="nurseMainPage-info-row">
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
                      <div className="nurseMainPage-ward-receiving-btns">
                        <button
                          onClick={() => {
                            setSelectedIpAdmissionId(item?.ipAdmmissionId);
                            setConfirmBox(true);
                          }}
                        >
                          Approve <i className="fas fa-check"></i>
                        </button>
                        <button>
                          Decline <i className="fas fa-times"></i>
                        </button>
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

            <div className="nurseMainPage-subcontainer">
              <div className="nurseMainPage-header">
                <h1>Addmitted Patients</h1>
              </div>
              <div className="nurseMainPage-boxes">
                {admittedPatient.length > 0 ? (
                  admittedPatient.map((item) => (
                    <div
                      onClick={() => handleSelectPatient(item)}
                      className="nurseMainPage-box"
                    >
                      <div class="nurseMainPage-patient-info">
                        <div class="nurseMainPage-patient-data-img-con">
                          <div class="nurseMainPage-patient-avatar">
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
                          <div className="nurseMainPage-patient-personal-details">
                            <div class="nurseMainPage-info-row">
                              <span class="value">
                                {item.patient?.patient?.firstName}{" "}
                                {item.patient?.patient?.lastName}
                              </span>
                            </div>
                            <div class="nurseMainPage-info-row">
                              <span class="value">
                                {item.patient?.patient?.uhid}
                              </span>
                            </div>
                            <div class="nurseMainPage-info-row">
                              <span class="value">
                                {item.patient?.patient?.age}{" "}
                                {item.patient?.patient?.ageUnit} /{" "}
                                {item.patient?.patient?.gender}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="nurseMainPage-patient-details">
                          <div class="nurseMainPage-info-row">
                            <span class="label">Add. Date/Time:</span>
                            <span class="value">{item.admissionDate}</span>
                          </div>
                          <div class="nurseMainPage-info-row">
                            <span class="label">Ward/Bed:</span>
                            <span class="value">
                              {item.roomDetails.roomTypeDTO?.wardName} /{" "}
                              {item.roomDetails.bedDTO?.bedNo}
                            </span>
                          </div>
                          <div class="nurseMainPage-info-row">
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

            <div className="nurseMainPage-subcontainer">
              <div className="nurseMainPage-header">
                <h1>Transfer Request</h1>
              </div>
              <div className="nurseMainPage-boxes">
                {wardRequest.length > 0 ? (
                  wardRequest.map((item) => {
                    const previousWard = item.previousWardRequestData
                      ? JSON.parse(item.previousWardRequestData)
                      : null;

                    const requestedWard = item.updateWardRequestData
                      ? JSON.parse(item.updateWardRequestData)
                      : null;

                    return (
                      <div className="nurseMainPage-box" key={item.id}>
                        <div className="nurseMainPage-patient-info">
                          <div className="nurseMainPage-patient-data-img-con">
                            <div className="nurseMainPage-patient-avatar">
                              {!item?.ipAdmission?.patient?.patient?.hasOwnProperty(
                                "fileAttachment"
                              ) ? (
                                <span>
                                  {
                                    item?.ipAdmission?.patient?.patient
                                      ?.firstName?.[0]
                                  }
                                </span>
                              ) : (
                                <img
                                  src={`data:image/png;base64,${item?.ipAdmission?.patient?.patient?.fileAttachment}`}
                                  alt="patient attachment"
                                />
                              )}
                            </div>
                            <div className="nurseMainPage-patient-personal-details">
                              <div className="nurseMainPage-info-row">
                                <span className="value">
                                  {
                                    item.ipAdmission?.patient?.patient
                                      ?.firstName
                                  }{" "}
                                  {item.ipAdmission?.patient?.patient?.lastName}
                                </span>
                              </div>
                              <div className="nurseMainPage-info-row">
                                <span className="value">
                                  {item.ipAdmission?.patient?.patient?.uhid}
                                </span>
                              </div>
                              <div className="nurseMainPage-info-row">
                                <span className="value">
                                  {item.ipAdmission?.patient?.patient?.age}{" "}
                                  {item.ipAdmission?.patient?.patient?.ageUnit}{" "}
                                  / {item.ipAdmission?.patient?.patient?.gender}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="nurseMainPage-patient-details">
                            <div className="nurseMainPage-info-row">
                              <span className="label">Request:</span>
                              <span className="value">{item.status}</span>
                            </div>
                            <div className="nurseMainPage-info-row">
                              <span className="label">Prev. Ward:</span>
                              <span className="value">
                                {previousWard?.roomType?.roomType} /{" "}
                                {previousWard?.bed?.bedNo}
                              </span>
                            </div>
                            <div className="nurseMainPage-info-row">
                              <span className="label">Req. Ward:</span>
                              <span className="value">
                                {requestedWard?.roomType?.roomType} /{" "}
                                {requestedWard?.bed?.bedNo}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
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
            {/* <div className="nurseMainPage-subcontainer">
              <div className="nurseMainPage-header">
                <h1>Pending Request</h1>
              </div>
              <div className="nurseMainPage-boxes">
                {wardRequest.length > 0 ? (
                  wardRequest.map((item) => {
                    const previousWard = item.previousWardRequestData
                      ? JSON.parse(item.previousWardRequestData)
                      : null;

                    const requestedWard = item.updateWardRequestData
                      ? JSON.parse(item.updateWardRequestData)
                      : null;

                    return (
                      <div className="nurseMainPage-box" key={item.id}>
                        <div className="nurseMainPage-patient-info">
                          <div className="nurseMainPage-patient-data-img-con">
                            <div className="nurseMainPage-patient-avatar">
                              {!item?.ipAdmission?.patient?.patient?.hasOwnProperty(
                                "fileAttachment"
                              ) ? (
                                <span>
                                  {
                                    item?.ipAdmission?.patient?.patient
                                      ?.firstName?.[0]
                                  }
                                </span>
                              ) : (
                                <img
                                  src={`data:image/png;base64,${item?.ipAdmission?.patient?.patient?.fileAttachment}`}
                                  alt="patient attachment"
                                />
                              )}
                            </div>
                            <div className="nurseMainPage-patient-personal-details">
                              <div className="nurseMainPage-info-row">
                                <span className="value">
                                  {
                                    item.ipAdmission?.patient?.patient
                                      ?.firstName
                                  }{" "}
                                  {item.ipAdmission?.patient?.patient?.lastName}
                                </span>
                              </div>
                              <div className="nurseMainPage-info-row">
                                <span className="value">
                                  {item.ipAdmission?.patient?.patient?.uhid}
                                </span>
                              </div>
                              <div className="nurseMainPage-info-row">
                                <span className="value">
                                  {item.ipAdmission?.patient?.patient?.age}{" "}
                                  {item.ipAdmission?.patient?.patient?.ageUnit}{" "}
                                  / {item.ipAdmission?.patient?.patient?.gender}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="nurseMainPage-patient-details">
                            <div className="nurseMainPage-info-row">
                              <span className="label">Request:</span>
                              <span className="value">{item.status}</span>
                            </div>
                            <div className="nurseMainPage-info-row">
                              <span className="label">Prev. Ward:</span>
                              <span className="value">
                                {previousWard?.roomType?.roomType} /{" "}
                                {previousWard?.bed?.bedNo}
                              </span>
                            </div>
                            <div className="nurseMainPage-info-row">
                              <span className="label">Req. Ward:</span>
                              <span className="value">
                                {requestedWard?.roomType?.roomType} /{" "}
                                {requestedWard?.bed?.bedNo}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
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
            </div> */}

            {confirmBox && (
              <div className="nurse-ward-receiving-confirmBox">
                <div className="nurse-ward-receiving-con">
                  <h1>Confirm Request</h1>
                  <div className="nurse-ward-receiving-con-btns">
                    <button
                      onClick={() => handleConfirmBtn(selectedIpAdmissionId)}
                    >
                      Yes
                    </button>
                    <button onClick={() => setConfirmBox(false)}>No</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default wardNurseDashboard;
