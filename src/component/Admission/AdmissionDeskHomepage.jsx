import React, { useEffect, useState } from "react";
import "./AdmissionDeskHomepage.css";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import { useNavigate } from "react-router-dom";
import ReceptionClearance from "./ReceptionClearance/ReceptionClearance";
import DischargeClearance from "./DischargeClearance/DischargeClearance";
import CustomModal from "../../CustomModel/CustomModal";
import BlockIPEntries from "./IpBlock/BlockIpEntries";
import { faL } from "@fortawesome/free-solid-svg-icons";

function AdmissionDeskHomePage() {
  const [admissionRequest, setAdmissionRequest] = useState([]);
  const [admittedpatient, setAdmittedpatient] = useState([]);
  const [wardTransferRequest, setWardTransferRequest] = useState([]);
  const [ipBlockingRequest, setIpBlockingRequest] = useState([]);
  const [confirmBox, setConfirmBox] = useState(false);
  const [requestId, setRequestId] = useState();
  const [dischargeClearaceRequest, setDischargeClearanceRequest] = useState([]);
  const [activeState, setActiveState] = useState("");
  const [selectedPatient, setSelectedPatient] = useState();
  const [isSearchVisible, setIsSearchVisible] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log(confirmBox);
  }, []);

  const [filteredAdmissionRequests, setFilteredAdmissionRequests] = useState(
    []
  );
  const [filteredAdmittedPatients, setFilteredAdmittedPatients] = useState([]);
  const [filteredTransferPatient, setFilteredTransferPatient] = useState([]);
  const [filteredReceptionClearance, setFilteredReceptionClearance] = useState(
    []
  );
  const [filteredDischargeClearance, setFilteredDischargeClearance] = useState(
    []
  );
  const [filteredIpBlockClearance, setFilteredIpBlockClearance] = useState([]);

  const navigate = useNavigate();

  const fetchAdmissionRequest = async () => {
    const response = await axios.get(`${API_BASE_URL}/admissionsSlip`);
    setAdmissionRequest(response.data);
    setFilteredAdmissionRequests(response.data);
  };

  const fetchAdmittedPatient = async () => {
    const response = await axios.get(`${API_BASE_URL}/ip-admissions/admitted`);
    setFilteredAdmittedPatients(response.data);

    setAdmittedpatient(response.data);
  };

  const fetchTransferRequest = async () => {
    const response = await axios.get(`${API_BASE_URL}/ward-request-change/all`);
    setWardTransferRequest(response.data);
    setFilteredTransferPatient(response.data);
  };

  const fetchIpBlockinRequest = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/discharge-intimations/get-all-clearance`
    );
    console.log(response.data);

    setIpBlockingRequest(response.data);
    setFilteredIpBlockClearance(response.data);
  };

  const fetchDischargeClearance = async () => {
    const response = await axios.get(`${API_BASE_URL}/discharge-intimations`);
    console.log(response.data);

    setDischargeClearanceRequest(response.data);
    setFilteredDischargeClearance(response.data);
    setFilteredReceptionClearance(response.data);
  };
  useEffect(() => {
    fetchAdmissionRequest();
    fetchAdmittedPatient();
    fetchTransferRequest();
    fetchDischargeClearance();
    fetchIpBlockinRequest();
  }, [confirmBox, activeState]);

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

  const renderPages = () => {
    switch (activeState) {
      case "receptionClearance":
        return (
          <CustomModal
            isOpen={activeState === "receptionClearance" ? true : false}
            onClose={() => setActiveState("")}
          >
            <ReceptionClearance
              patient={selectedPatient}
              setActiveState={setActiveState}
            />
          </CustomModal>
        );
      case "dischargeClearance":
        return (
          <CustomModal
            isOpen={activeState === "dischargeClearance" ? true : false}
            onClose={() => setActiveState("")}
          >
            <DischargeClearance
              patient={selectedPatient}
              setActiveState={setActiveState}
            />
          </CustomModal>
        );
      case "IpBlocking":
        return (
          <CustomModal
            isOpen={activeState === "IpBlocking" ? true : false}
            onClose={() => setActiveState("")}
          >
            <BlockIPEntries
              patient={selectedPatient}
              setActiveState={setActiveState}
            />
          </CustomModal>
        );
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query) {
      setFilteredAdmissionRequests(admissionRequest);
      setFilteredAdmittedPatients(admittedpatient);
      setFilteredTransferPatient(wardTransferRequest);
      setFilteredReceptionClearance(dischargeClearaceRequest);
      setFilteredDischargeClearance(dischargeClearaceRequest);
      setFilteredIpBlockClearance(ipBlockingRequest);
      return;
    }

    const lowerQuery = query.toLowerCase();
    if (isSearchVisible === "request") {
      const filteredAdmissions = admissionRequest.filter((item) => {
        return (
          item.outPatient.patient?.firstName
            .toLowerCase()
            .includes(lowerQuery) ||
          item.outPatient.patient?.lastName
            .toLowerCase()
            .includes(lowerQuery) ||
          item.admittingDoctor?.doctorName.toLowerCase().includes(lowerQuery) ||
          item.outPatient.patient?.uhid.toLowerCase().includes(lowerQuery) ||
          item.outPatient.patient?.age.toString().includes(lowerQuery) ||
          item.outPatient.patient?.gender.toLowerCase().includes(lowerQuery) ||
          item?.requestStatus.toLowerCase().includes(lowerQuery) ||
          item?.admissionDate.toLowerCase().includes(lowerQuery) ||
          item?.admissionTime.toLowerCase().includes(lowerQuery)
        );
      });
      setFilteredAdmissionRequests(filteredAdmissions);
    } else if (isSearchVisible === "admitted") {
      const filteredPatients = admittedpatient.filter((item) => {
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
      setFilteredAdmittedPatients(filteredPatients);
    } else if (isSearchVisible === "transferRequest") {
      const transferRequestPatient = wardTransferRequest.filter((item) => {
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
    } else if (isSearchVisible === "receptionClearance") {
      const receptionClerancePatient = dischargeClearaceRequest.filter(
        (item) => {
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
        }
      );
      setFilteredReceptionClearance(receptionClerancePatient);
    } else if (isSearchVisible === "dischargeClearance") {
      const dischargeClerancePatient = dischargeClearaceRequest.filter(
        (item) => {
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
        }
      );
      setFilteredDischargeClearance(dischargeClerancePatient);
    } else if (isSearchVisible === "ipBlock") {
      const ipBlockPatient = ipBlockingRequest.filter((item) => {
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
      setFilteredIpBlockClearance(ipBlockPatient);
    }
  };

  return (
    <>
      <div className="admissionDeskHomePage-container">
        <div className="admissionDeskHomePage-subcontainer">
          <div className="admissionDeskHomePage-header">
            <h1>Admission Request</h1>
            <div>
              {isSearchVisible === "request" && (
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="search"
                  onChange={(e) => handleSearch(e.target.value)}
                  className="admissionDeskHomePage-search-input"
                />
              )}
              <i
                onClick={() => setIsSearchVisible("request")}
                style={{ cursor: "pointer", marginLeft: "10px" }}
                className="fa-solid fa-magnifying-glass"
              ></i>
            </div>
          </div>
          <div className="admissionDeskHomePage-boxes">
            {filteredAdmissionRequests.length > 0 ? (
              filteredAdmissionRequests.map((item) => (
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
            <div>
              {isSearchVisible === "admitted" && (
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="search"
                  onChange={(e) => handleSearch(e.target.value)}
                  className="admissionDeskHomePage-search-input"
                />
              )}
              <i
                onClick={() => setIsSearchVisible("admitted")}
                style={{ cursor: "pointer", marginLeft: "10px" }}
                className="fa-solid fa-magnifying-glass"
              ></i>
            </div>
          </div>
          <div className="admissionDeskHomePage-boxes">
            {filteredAdmittedPatients.length > 0 ? (
              filteredAdmittedPatients.map((item) => (
                <div className="admissionDeskHomePage-box">
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
            <div>
              {isSearchVisible === "transferRequest" && (
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="search"
                  onChange={(e) => handleSearch(e.target.value)}
                  className="admissionDeskHomePage-search-input"
                />
              )}
              <i
                onClick={() => setIsSearchVisible("transferRequest")}
                style={{ cursor: "pointer", marginLeft: "10px" }}
                className="fa-solid fa-magnifying-glass"
              ></i>
            </div>
          </div>
          <div className="admissionDeskHomePage-boxes">
            {filteredTransferPatient.length > 0 ? (
              filteredTransferPatient.map((item) => {
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
                            setConfirmBox(true);
                            setRequestId(item?.wardRequestChangeId);
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
            <h1>Reception Clearance</h1>
            <div>
              {isSearchVisible === "receptionClearance" && (
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="search"
                  onChange={(e) => handleSearch(e.target.value)}
                  className="admissionDeskHomePage-search-input"
                />
              )}
              <i
                onClick={() => setIsSearchVisible("receptionClearance")}
                style={{ cursor: "pointer", marginLeft: "10px" }}
                className="fa-solid fa-magnifying-glass"
              ></i>
            </div>
          </div>
          <div className="admissionDeskHomePage-boxes">
            {filteredReceptionClearance.length > 0 ? (
              filteredReceptionClearance.map((item) => {
                const isToday =
                  new Date().toDateString() ===
                  new Date(item.disAdvisedDate).toDateString();
                const isNotCleared = item.receptionClearance == null;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (isNotCleared) {
                        setSelectedPatient(item);
                        setActiveState("receptionClearance");
                      }
                    }}
                    className={`admissionDeskHomePage-box ${
                      isToday && isNotCleared ? "highlight-box" : ""
                    } ${!isNotCleared ? "disabled-box" : ""}`}
                  >
                    <div className="admissionDeskHomePage-patient-info">
                      <div className="admissionDeskHomePage-patient-data-img-con">
                        <div className="admissionDeskHomePage-patient-avatar">
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
                        <div className="admissionDeskHomePage-patient-personal-details">
                          <div className="admissionDeskHomePage-info-row">
                            <span className="value">
                              {
                                item?.ipAdmissionDto?.patient?.patient
                                  ?.firstName
                              }{" "}
                              {item.ipAdmissionDto?.patient?.patient?.lastName}
                            </span>
                          </div>
                          <div className="admissionDeskHomePage-info-row">
                            <span className="value">
                              {item.ipAdmissionDto?.patient?.patient?.uhid}
                            </span>
                          </div>
                          <div className="admissionDeskHomePage-info-row">
                            <span className="value">
                              {item.ipAdmissionDto?.patient?.patient?.age}{" "}
                              {item.ipAdmissionDto?.patient?.patient?.ageUnit} /{" "}
                              {item.ipAdmissionDto?.patient?.patient?.gender}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="admissionDeskHomePage-patient-details">
                        <div className="admissionDeskHomePage-info-row">
                          <span className="label">Add. Date/Time:</span>
                          <span className="value">
                            {item.ipAdmissionDto?.admissionDate}
                          </span>
                        </div>
                        <div className="admissionDeskHomePage-info-row">
                          <span className="label">Dis. Date/Time:</span>
                          <span className="value">
                            {item.disAdvisedDate} / {item.disAdvisedTime}
                          </span>
                        </div>
                        <div className="admissionDeskHomePage-info-row">
                          <span className="label">Reception Clearance:</span>
                          <span className="value">
                            {item.receptionClearance != null
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

        <div className="admissionDeskHomePage-subcontainer">
          <div className="admissionDeskHomePage-header">
            <h1>Discharge Clearance</h1>
            <div>
              {isSearchVisible === "dischargeClearance" && (
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="search"
                  onChange={(e) => handleSearch(e.target.value)}
                  className="admissionDeskHomePage-search-input"
                />
              )}
              <i
                onClick={() => setIsSearchVisible("dischargeClearance")}
                style={{ cursor: "pointer", marginLeft: "10px" }}
                className="fa-solid fa-magnifying-glass"
              ></i>
            </div>
          </div>
          <div className="admissionDeskHomePage-boxes">
            {filteredDischargeClearance.length > 0 ? (
              filteredDischargeClearance.map((item) => {
                const isToday =
                  new Date().toDateString() ===
                  new Date(item.disAdvisedDate).toDateString();
                const isNotCleared = item.dischargeClearance == null;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (isNotCleared) {
                        setSelectedPatient(item);
                        setActiveState("dischargeClearance");
                      }
                    }}
                    className={`admissionDeskHomePage-box ${
                      isToday && isNotCleared ? "highlight-box" : ""
                    } ${!isNotCleared ? "disabled-box" : ""}`}
                  >
                    <div className="admissionDeskHomePage-patient-info">
                      <div className="admissionDeskHomePage-patient-data-img-con">
                        <div className="admissionDeskHomePage-patient-avatar">
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
                        <div className="admissionDeskHomePage-patient-personal-details">
                          <div className="admissionDeskHomePage-info-row">
                            <span className="value">
                              {
                                item?.ipAdmissionDto?.patient?.patient
                                  ?.firstName
                              }{" "}
                              {item.ipAdmissionDto?.patient?.patient?.lastName}
                            </span>
                          </div>
                          <div className="admissionDeskHomePage-info-row">
                            <span className="value">
                              {item.ipAdmissionDto?.patient?.patient?.uhid}
                            </span>
                          </div>
                          <div className="admissionDeskHomePage-info-row">
                            <span className="value">
                              {item.ipAdmissionDto?.patient.patient?.age}{" "}
                              {item.ipAdmissionDto?.patient?.patient?.ageUnit} /{" "}
                              {item.ipAdmissionDto?.patient?.patient?.gender}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="admissionDeskHomePage-patient-details">
                        <div className="admissionDeskHomePage-info-row">
                          <span className="label">Add. Date/Time:</span>
                          <span className="value">
                            {item.ipAdmissionDto?.admissionDate}
                          </span>
                        </div>
                        <div className="admissionDeskHomePage-info-row">
                          <span className="label">Dis. Date/Time:</span>
                          <span className="value">
                            {item.disAdvisedDate} / {item.disAdvisedTime}
                          </span>
                        </div>
                        <div className="admissionDeskHomePage-info-row">
                          <span className="label">Discharge Clearance:</span>
                          <span className="value">
                            {item.dischargeClearance != null
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

        <div className="admissionDeskHomePage-subcontainer">
          <div className="admissionDeskHomePage-header">
            <h1>Ip Blocking Request</h1>
            <div>
              {isSearchVisible === "ipBlock" && (
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="search"
                  onChange={(e) => handleSearch(e.target.value)}
                  className="admissionDeskHomePage-search-input"
                />
              )}
              <i
                onClick={() => setIsSearchVisible("ipBlock")}
                style={{ cursor: "pointer", marginLeft: "10px" }}
                className="fa-solid fa-magnifying-glass"
              ></i>
            </div>
          </div>
          <div className="admissionDeskHomePage-boxes">
            {filteredIpBlockClearance.length > 0 ? (
              filteredIpBlockClearance.map((item) => (
                <div
                  onClick={() => {
                    setSelectedPatient(item);
                    setActiveState("IpBlocking");
                  }}
                  className="admissionDeskHomePage-box"
                >
                  <div class="admissionDeskHomePage-patient-info">
                    <div class="admissionDeskHomePage-patient-data-img-con">
                      <div class="admissionDeskHomePage-patient-avatar">
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
                      <div className="admissionDeskHomePage-patient-personal-details">
                        <div class="admissionDeskHomePage-info-row">
                          <span class="value">
                            {item.ipAdmissionDto?.patient?.patient?.firstName}{" "}
                            {item.ipAdmissionDto?.patient?.patient?.lastName}
                          </span>
                        </div>
                        <div class="admissionDeskHomePage-info-row">
                          <span class="value">
                            {item.ipAdmissionDto?.patient?.patient?.uhid}
                          </span>
                        </div>
                        <div class="admissionDeskHomePage-info-row">
                          <span class="value">
                            {item.ipAdmissionDto?.patient?.patient?.age}{" "}
                            {item.ipAdmissionDto?.patient?.patient?.ageUnit} /{" "}
                            {item.ipAdmissionDto?.patient?.patient?.gender}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="admissionDeskHomePage-patient-details">
                      <div className="admissionDeskHomePage-info-row">
                        <span className="label">Add. Date/Time:</span>
                        <span className="value">
                          {item.ipAdmissionDto?.admissionDate}
                        </span>
                      </div>
                      <div className="admissionDeskHomePage-info-row">
                        <span className="label">Dis. Date/Time:</span>
                        <span className="value">
                          {item.disAdvisedDate} / {item.disAdvisedTime}
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
        {confirmBox && (
          <div className="admissionDeskHomePage-confirmBox">
            <div className="admissionDeskHomePage-con">
              <h1>Confirm Request</h1>
              <div className="admissionDeskHomePage-con-btns">
                <button onClick={() => handleConfirmBtn(requestId)}>Yes</button>
                <button onClick={() => setConfirmBox(false)}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {renderPages()}
    </>
  );
}

export default AdmissionDeskHomePage;
