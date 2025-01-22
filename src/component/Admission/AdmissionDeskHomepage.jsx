import React, { useEffect, useState } from "react";
import "./AdmissionDeskHomePage.css";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import { useNavigate } from "react-router-dom";

function AdmissionDeskHomePage() {
  const [admissionRequest, setAdmissionRequest] = useState([]);
  const [admittedpatient, setAdmittedpatient] = useState([]);
  const [wardTransferRequest, setWardTransferRequest] = useState([]);
  const [cancellationRequest, setCancellationRequest] = useState([]);
  const [confirmBox, setConfirmBox] = useState(false);
  const [requestId, setRequestId] = useState();
  const navigate = useNavigate();

  const fetchAdmissionRequest = async () => {
    const response = await axios.get(`${API_BASE_URL}/admissionsSlip`);
    console.log(response.data);
    setAdmissionRequest(response.data);
  };

  const fetchAdmittedPatient = async () => {
    const response = await axios.get(`${API_BASE_URL}/ip-admissions/admitted`);
    console.log(response.data);

    setAdmittedpatient(response.data);
  };

  const fetchTransferRequest = async () => {
    const response = await axios.get(`${API_BASE_URL}/ward-request-change/all`);
    console.log(response.data);

    setWardTransferRequest(response.data);
  };

  const fetchCancellationRequest = async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    setCancellationRequest(response.data);
  };

  useEffect(() => {
    fetchAdmissionRequest();
    fetchAdmittedPatient();
    fetchTransferRequest();
  }, [confirmBox]);

  const handleAdmitPatient = (data) => {
    navigate(`/adt/ipadmission`, { state: { patientData: data } });
  };

  const handleConfirmBtn = async (id) => {
    console.log(id);
    try {
      await axios.put(`${API_BASE_URL}/ward-request-change/approve/${id}`);
      setConfirmBox(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="admissionDeskHomePage-container">
        <div className="admissionDeskHomePage-subcontainer">
          <div className="admissionDeskHomePage-header">
            <h1>Admission Request</h1>
          </div>
          <div className="admissionDeskHomePage-boxes">
            {admissionRequest.length > 0 ? (
              admissionRequest.map((item) => (
                <div
                  onClick={() => handleAdmitPatient(item)}
                  className="admissionDeskHomePage-box"
                >
                  <div class="admissionDeskHomePage-patient-info">
                    <div class="admissionDeskHomePage-patient-data-img-con">
                      <div class="admissionDeskHomePage-patient-avatar">
                        {!item?.outPatient.patient?.hasOwnProperty(
                          "fileAttachment"
                        ) ? (
                          <span>
                            {item?.outPatient.patient?.firstName?.[0]}
                          </span>
                        ) : (
                          <img
                            src={`data:image/png;base64,${item?.outPatient.patient?.fileAttachment}`}
                            alt="patient attachment"
                          />
                        )}
                      </div>
                      <div className="admissionDeskHomePage-patient-personal-details">
                        <div class="admissionDeskHomePage-info-row">
                          <span class="value">
                            {item.outPatient.patient?.firstName}{" "}
                            {item.outPatient.patient?.lastName}
                          </span>
                        </div>
                        <div class="admissionDeskHomePage-info-row">
                          <span class="value">
                            {item.outPatient.patient?.uhid}
                          </span>
                        </div>
                        <div class="admissionDeskHomePage-info-row">
                          <span class="value">
                            {item.outPatient.patient?.age}{" "}
                            {item.outPatient.patient?.ageUnit} /{" "}
                            {item.outPatient.patient?.gender}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="admissionDeskHomePage-patient-details">
                      <div class="admissionDeskHomePage-info-row">
                        <span class="label">Request Status:</span>
                        <span class="value">{item.requestStatus}</span>
                      </div>
                      <div class="admissionDeskHomePage-info-row">
                        <span class="label">Req. Date/Time:</span>
                        <span class="value">
                          {item.admissionDate} {item.admissionTime}
                        </span>
                      </div>
                      <div class="admissionDeskHomePage-info-row">
                        <span class="label">Admitting Doctor:</span>
                        <span class="value">
                          {item.admittingDoctor?.salutation}
                          {item.admittingDoctor?.doctorName}
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

        <div className="admissionDeskHomePage-subcontainer">
          <div className="admissionDeskHomePage-header">
            <h1>Admitted Patients</h1>
          </div>
          <div className="admissionDeskHomePage-boxes">
            {admittedpatient.length > 0 ? (
              admittedpatient.map((item) => (
                <div
                  onClick={() => handleSelectPatient(item)}
                  className="admissionDeskHomePage-box"
                >
                  <div class="admissionDeskHomePage-patient-info">
                    <div class="admissionDeskHomePage-patient-data-img-con">
                      <div class="admissionDeskHomePage-patient-avatar">
                        {!item?.patient.patient?.hasOwnProperty(
                          "fileAttachment"
                        ) ? (
                          <span>{item?.patient?.patient?.firstName?.[0]}</span>
                        ) : (
                          <img
                            src={`data:image/png;base64,${item?.patient?.patient?.fileAttachment}`}
                            alt="patient attachment"
                          />
                        )}
                      </div>
                      <div className="admissionDeskHomePage-patient-personal-details">
                        <div class="admissionDeskHomePage-info-row">
                          <span class="value">
                            {item.patient?.patient?.firstName}{" "}
                            {item.patient?.patient?.lastName}
                          </span>
                        </div>
                        <div class="admissionDeskHomePage-info-row">
                          <span class="value">
                            {item.patient?.patient?.uhid}
                          </span>
                        </div>
                        <div class="admissionDeskHomePage-info-row">
                          <span class="value">
                            {item.patient?.patient?.age}{" "}
                            {item.patient?.patient?.ageUnit} /{" "}
                            {item.patient?.patient?.gender}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="admissionDeskHomePage-patient-details">
                      <div class="admissionDeskHomePage-info-row">
                        <span class="label">Add. Date/Time:</span>
                        <span class="value">{item.admissionDate}</span>
                      </div>
                      <div class="admissionDeskHomePage-info-row">
                        <span class="label">Ward/Bed:</span>
                        <span class="value">
                          {item.roomDetails.roomTypeDTO?.wardName} /{" "}
                          {item.roomDetails.bedDTO?.bedNo}
                        </span>
                      </div>
                      <div class="admissionDeskHomePage-info-row">
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

        <div className="admissionDeskHomePage-subcontainer">
          <div className="admissionDeskHomePage-header">
            <h1>Transfer Request</h1>
          </div>
          <div className="admissionDeskHomePage-boxes">
            {wardTransferRequest.length > 0 ? (
              wardTransferRequest.map((item) => {
                const previousWard = item.previousWardRequestData
                  ? JSON.parse(item.previousWardRequestData)
                  : null;

                const requestedWard = item.updateWardRequestData
                  ? JSON.parse(item.updateWardRequestData)
                  : null;

                return (
                  <div
                    className="admissionDeskHomePage-box"
                    key={item.id} // Add a unique key to each element
                  >
                    <div className="admissionDeskHomePage-patient-info">
                      <div className="admissionDeskHomePage-patient-data-img-con">
                        <div className="admissionDeskHomePage-patient-avatar">
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
                        <div className="admissionDeskHomePage-patient-personal-details">
                          <div className="admissionDeskHomePage-info-row">
                            <span className="value">
                              {item.ipAdmission?.patient?.patient?.firstName}{" "}
                              {item.ipAdmission?.patient?.patient?.lastName}
                            </span>
                          </div>
                          <div className="admissionDeskHomePage-info-row">
                            <span className="value">
                              {item.ipAdmission?.patient?.patient?.uhid}
                            </span>
                          </div>
                          <div className="admissionDeskHomePage-info-row">
                            <span className="value">
                              {item.ipAdmission?.patient?.patient?.age}{" "}
                              {item.ipAdmission?.patient?.patient?.ageUnit} /{" "}
                              {item.ipAdmission?.patient?.patient?.gender}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="admissionDeskHomePage-patient-details">
                        <div className="admissionDeskHomePage-info-row">
                          <span className="label">Request:</span>
                          <span className="value">{item.status}</span>
                        </div>
                        <div className="admissionDeskHomePage-info-row">
                          <span className="label">Prev. Ward:</span>
                          <span className="value">
                            {previousWard?.roomType?.roomType} /{" "}
                            {previousWard?.bed?.bedNo}
                          </span>
                        </div>
                        <div className="admissionDeskHomePage-info-row">
                          <span className="label">Req. Ward:</span>
                          <span className="value">
                            {requestedWard?.roomType?.roomType} /{" "}
                            {requestedWard?.bed?.bedNo}
                          </span>
                        </div>
                      </div>
                    </div>
                    {item.status === "pending" && (
                      <div className="admissionDeskHomePage-ward-receiving-btns">
                        <button
                          onClick={() => {
                            setRequestId(item?.wardRequestChangeId);
                            setConfirmBox(true);
                          }}
                        >
                          Approve <i className="fas fa-check"></i>
                        </button>
                        <button>
                          Decline <i className="fas fa-times"></i>
                        </button>
                      </div>
                    )}
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
        <div className="admissionDeskHomePage-subcontainer">
          <div className="admissionDeskHomePage-header">
            <h1>Cancellation Request</h1>
          </div>
          <div className="admissionDeskHomePage-boxes">
            {cancellationRequest.length > 0 ? (
              cancellationRequest.map((item) => (
                <div
                  onClick={() => handleSelectPatient(item)}
                  className="admissionDeskHomePage-box"
                >
                  <div class="admissionDeskHomePage-patient-info">
                    <div class="admissionDeskHomePage-patient-data-img-con">
                      <div class="admissionDeskHomePage-patient-avatar">
                        {!item?.patient?.hasOwnProperty("fileAttachment") ? (
                          <span>{item?.patient?.firstName?.[0]}</span>
                        ) : (
                          <img
                            src={`data:image/png;base64,${item?.patient?.fileAttachment}`}
                            alt="patient attachment"
                          />
                        )}
                      </div>
                      <div className="admissionDeskHomePage-patient-personal-details">
                        <div class="admissionDeskHomePage-info-row">
                          <span class="value">
                            {item.patient?.firstName} {item.patient?.lastName}
                          </span>
                        </div>
                        <div class="admissionDeskHomePage-info-row">
                          <span class="value">{item.patient?.uhid}</span>
                        </div>
                        <div class="admissionDeskHomePage-info-row">
                          <span class="value">
                            {item.patient?.age} {item.patient?.ageUnit} /{" "}
                            {item.patient?.gender}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="admissionDeskHomePage-patient-details">
                      <div class="admissionDeskHomePage-info-row">
                        <span class="label">Fees Paid:</span>
                        <span class="value">{item.feespaid}</span>
                      </div>
                      <div class="admissionDeskHomePage-info-row">
                        <span class="label">Reason:</span>
                        <span class="value">{item.remarks}</span>
                      </div>
                      <div class="admissionDeskHomePage-info-row">
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
      {confirmBox && (
        <div className="nurse-ward-receiving-confirmBox">
          <div className="nurse-ward-receiving-con">
            <h1>Confirm Request</h1>
            <div className="nurse-ward-receiving-con-btns">
              <button onClick={() => handleConfirmBtn(requestId)}>Yes</button>
              <button onClick={() => setConfirmBox(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdmissionDeskHomePage;
