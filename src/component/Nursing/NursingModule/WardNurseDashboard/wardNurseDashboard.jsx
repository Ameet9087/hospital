import React, { useEffect, useState } from "react";
import "./wardNurseDashboard.css";
import axios from "axios";
import { API_BASE_URL } from "../../../api/api";
import NursingPatientDashboard from "./NursingPatientDashboard";
import NurseClearanceForm from "../NurseClearance/NurseClearanceForm";
import CustomModal from "../../../../CustomModel/CustomModal";
function wardNurseDashboard() {
  const [selectedPatient, setSelectedPatient] = useState();
  const [selectedIpAdmission, setSelectedIpAdmission] = useState([]);
  const [confirmBox, setConfirmBox] = useState(false);
  const [wardReceiving, setWardRecieving] = useState([]);
  const [admittedPatient, setAdmittedpatient] = useState([]);
  const [selectedIpAdmissionId, setSelectedIpAdmissionId] = useState();
  const [wardRequest, setWardRequest] = useState([]);
  const [pendingRequest, setPendingRequest] = useState([]);
  const [discharegeRequest, setDischaregeRequest] = useState([]);
  const [dischargePopup, setDischargePopup] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredWardReceiving, setFilteredWardRecieving] = useState([]);
  const [filteredAdmittedPatients, setFilteredAdmittedPatients] = useState([]);
  const [filteredTransferPatient, setFilteredTransferPatient] = useState([]);
  const [filteredNurseClearance, setFilteredNurseClearance] = useState([]);

  const [isPatientOPEN, setIsPatientOPEN] = useState(false);

  const fetchAllWardReceiving = async () => {
    const response = await axios.get(`${API_BASE_URL}/ip-admissions/pending`);
    console.log(response.data);

    setWardRecieving(response.data);
    setFilteredWardRecieving(response.data);
  };

  const fetchAllAdmittedPatient = async () => {
    const response = await axios.get(`${API_BASE_URL}/ip-admissions/admitted`);
    setAdmittedpatient(response.data);
    setFilteredAdmittedPatients(response.data);
  };

  // const fetchAllAdmittedPatient = async () => {
  //   const response = await axios.get(
  //     `${API_BASE_URL}/ip-admissions/admitted-floor/1`
  //   );
  //   setAdmittedpatient(response.data);
  //   setFilteredAdmittedPatients(response.data);
  // };

  const fetchAllRequestedWardData = async () => {
    const response = await axios.get(`${API_BASE_URL}/ward-request-change/all`);
    setWardRequest(response.data);
    setFilteredTransferPatient(response.data);
  };

  const fetchAllDischargeRequest = async () => {
    const response = await axios.get(`${API_BASE_URL}/discharge-intimations`);
    setDischaregeRequest(response.data);
    setFilteredNurseClearance(response.data);
  };

  // const fetchAllPendingRequest = async () => {
  //   const response = await axios.get(`${API_BASE_URL}/`);
  //   setPendingRequest(response.data);
  // };

  useEffect(() => {
    fetchAllWardReceiving();
    fetchAllAdmittedPatient();
    fetchAllRequestedWardData();
    fetchAllDischargeRequest();
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

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query) {
      setFilteredWardRecieving(wardReceiving);
      setAdmittedpatient(admittedPatient);
      setFilteredTransferPatient(wardRequest);
      setFilteredNurseClearance(discharegeRequest);
      return;
    }

    const lowerQuery = query.toLowerCase();
    if (isSearchVisible === "wardRecieving") {
      const filteredwardRecieving = wardReceiving.filter((item) => {
        return (
          item.patient.patient?.firstName.toLowerCase().includes(lowerQuery) ||
          item.patient.patient?.lastName.toLowerCase().includes(lowerQuery) ||
          item.admissionUnderDoctorDetail.consultantDoctor?.doctorName
            .toLowerCase()
            .includes(lowerQuery) ||
          item.patient.patient?.uhid.toLowerCase().includes(lowerQuery) ||
          item.patient.patient?.age.toString().includes(lowerQuery) ||
          item.patient.patient?.gender.toLowerCase().includes(lowerQuery) ||
          item.admissionDate.toLowerCase().includes(lowerQuery)
        );
      });
      setFilteredWardRecieving(filteredwardRecieving);
    } else if (isSearchVisible === "admitted") {
      const filteredPatients = admittedPatient.filter((item) => {
        return (
          item.patient.patient?.firstName.toLowerCase().includes(lowerQuery) ||
          item.patient.patient?.lastName.toLowerCase().includes(lowerQuery) ||
          item.admissionUnderDoctorDetail.consultantDoctor?.doctorName
            .toLowerCase()
            .includes(lowerQuery) ||
          item.patient.patient?.uhid.toLowerCase().includes(lowerQuery) ||
          item.patient.patient?.age.toString().includes(lowerQuery) ||
          item.patient.patient?.gender.toLowerCase().includes(lowerQuery) ||
          item?.admissionDate.toLowerCase().includes(lowerQuery)
        );
      });
      setFilteredAdmittedPatients(filteredPatients);
    } else if (isSearchVisible === "transferRequest") {
      const transferRequestPatient = wardRequest.filter((item) => {
        return (
          item.ipAdmission.patient.patient?.firstName
            .toLowerCase()
            .includes(lowerQuery) ||
          item.ipAdmission.patient.patient?.lastName
            .toLowerCase()
            .includes(lowerQuery) ||
          item.ipAdmission.patient.patient?.uhid
            .toLowerCase()
            .includes(lowerQuery) ||
          item.ipAdmission.patient.patient?.age
            .toString()
            .includes(lowerQuery) ||
          item.ipAdmission.patient.patient?.gender
            .toLowerCase()
            .includes(lowerQuery) ||
          item.ipAdmission.admissionDate.toLowerCase().includes(lowerQuery)
        );
      });
      setFilteredTransferPatient(transferRequestPatient);
    } else if (isSearchVisible === "nurseClearance") {
      const nurseClerancePatient = discharegeRequest.filter((item) => {
        return (
          item.ipAdmissionDto.patient.patient?.firstName
            .toLowerCase()
            .includes(lowerQuery) ||
          item.ipAdmissionDto.patient.patient?.lastName
            .toLowerCase()
            .includes(lowerQuery) ||
          item.ipAdmissionDto.patient.patient?.uhid
            .toLowerCase()
            .includes(lowerQuery) ||
          item.ipAdmissionDto.patient.patient?.age
            .toString()
            .includes(lowerQuery) ||
          item.ipAdmissionDto.patient.patient?.gender
            .toLowerCase()
            .includes(lowerQuery) ||
          item.ipAdmissionDto.admissionDate.toLowerCase().includes(lowerQuery)
        );
      });
      setFilteredNurseClearance(nurseClerancePatient);
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
                <div>
                  {isSearchVisible === "wardRecieving" && (
                    <input
                      type="text"
                      value={searchQuery}
                      placeholder="search"
                      onChange={(e) => handleSearch(e.target.value)}
                      className="wardNurseDashboard-search-input"
                    />
                  )}
                  <i
                    onClick={() => setIsSearchVisible("wardRecieving")}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                    className="fa-solid fa-magnifying-glass"
                  ></i>
                </div>
              </div>
              <div className="nurseMainPage-boxes">
                {filteredWardReceiving.length > 0 ? (
                  filteredWardReceiving.map((item) => (
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
                <div>
                  {isSearchVisible === "admitted" && (
                    <input
                      type="text"
                      value={searchQuery}
                      placeholder="search"
                      onChange={(e) => handleSearch(e.target.value)}
                      className="wardNurseDashboard-search-input"
                    />
                  )}
                  <i
                    onClick={() => setIsSearchVisible("admitted")}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                    className="fa-solid fa-magnifying-glass"
                  ></i>
                </div>
              </div>
              <div className="nurseMainPage-boxes">
                {filteredAdmittedPatients.length > 0 ? (
                  filteredAdmittedPatients.map((item) => (
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
                <div>
                  {isSearchVisible === "transferRequest" && (
                    <input
                      type="text"
                      value={searchQuery}
                      placeholder="search"
                      onChange={(e) => handleSearch(e.target.value)}
                      className="wardNurseDashboard-search-input"
                    />
                  )}
                  <i
                    onClick={() => setIsSearchVisible("transferRequest")}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                    className="fa-solid fa-magnifying-glass"
                  ></i>
                </div>
              </div>
              <div className="nurseMainPage-boxes">
                {filteredTransferPatient.length > 0 ? (
                  filteredTransferPatient.map((item) => {
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

            <div className="nurseMainPage-subcontainer">
              <div className="nurseMainPage-header">
                <h1>Nurse Clearance</h1>
                <div>
                  {isSearchVisible === "nurseClearance" && (
                    <input
                      type="text"
                      value={searchQuery}
                      placeholder="search"
                      onChange={(e) => handleSearch(e.target.value)}
                      className="wardNurseDashboard-search-input"
                    />
                  )}
                  <i
                    onClick={() => setIsSearchVisible("nurseClearance")}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                    className="fa-solid fa-magnifying-glass"
                  ></i>
                </div>
              </div>
              <div className="nurseMainPage-boxes">
                {filteredNurseClearance.length > 0 ? (
                  filteredNurseClearance.map((item) => {
                    const isToday =
                      new Date().toDateString() ===
                      new Date(item.disAdvisedDate).toDateString();
                    const isNotCleared = item.nurseClearance == null;

                    return (
                      <div
                        key={item.disId}
                        className={`nurseMainPage-box ${
                          isToday && isNotCleared ? "highlight-box" : ""
                        } ${!isNotCleared ? "disabled-box" : ""}`}
                        onClick={() => {
                          if (isNotCleared) {
                            setSelectedPatient(item);
                            setDischargePopup(true);
                          }
                        }}
                      >
                        <div className="nurseMainPage-patient-info">
                          <div className="nurseMainPage-patient-data-img-con">
                            <div className="nurseMainPage-patient-avatar">
                              {!item?.ipAdmissionDto?.patient?.patient?.hasOwnProperty(
                                "fileAttachment"
                              ) ? (
                                <span>
                                  {
                                    item?.ipAdmissionDto?.patient?.patient
                                      ?.firstName?.[0]
                                  }
                                </span>
                              ) : (
                                <img
                                  src={`data:image/png;base64,${item?.ipAdmissionDto?.patient?.patient?.fileAttachment}`}
                                  alt="patient attachment"
                                />
                              )}
                            </div>
                            <div className="nurseMainPage-patient-personal-details">
                              <div className="nurseMainPage-info-row">
                                <span className="value">
                                  {
                                    item.ipAdmissionDto?.patient?.patient
                                      ?.firstName
                                  }{" "}
                                  {
                                    item.ipAdmissionDto?.patient?.patient
                                      ?.lastName
                                  }
                                </span>
                              </div>
                              <div className="nurseMainPage-info-row">
                                <span className="value">
                                  {item.ipAdmissionDto?.patient?.patient?.uhid}
                                </span>
                              </div>
                              <div className="nurseMainPage-info-row">
                                <span className="value">
                                  {item.ipAdmissionDto?.patient?.patient?.age}{" "}
                                  {
                                    item.ipAdmissionDto?.patient?.patient
                                      ?.ageUnit
                                  }{" "}
                                  /{" "}
                                  {
                                    item.ipAdmissionDto?.patient?.patient
                                      ?.gender
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="nurseMainPage-patient-details">
                            <div className="nurseMainPage-info-row">
                              <span className="label">Add. Date/Time:</span>
                              <span className="value">
                                {item.ipAdmissionDto?.admissionDate}
                              </span>
                            </div>
                            <div className="nurseMainPage-info-row">
                              <span className="label">Dis. Date/Time:</span>
                              <span className="value">
                                {item.disAdvisedDate} / {item.disAdvisedTime}
                              </span>
                            </div>
                            <div className="nurseMainPage-info-row">
                              <span className="label">Nurse Clearance:</span>
                              <span className="value">
                                {item.nurseClearance != null
                                  ? "Done"
                                  : "Not Done"}
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
      {dischargePopup && (
        <CustomModal
          isOpen={dischargePopup}
          onClose={() => setDischargePopup(false)}
        >
          <NurseClearanceForm
            patient={selectedPatient}
            setDischargePopup={setDischargePopup}
          />
        </CustomModal>
      )}
    </>
  );
}

export default wardNurseDashboard;
