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
  const [opdPatientRecord, setOpdPatientRecord] = useState([]);

  const [isPatientOPEN, setIsPatientOPEN] = useState(false);

  const [isSearchVisible, setIsSearchVisible] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredMyAppointments, setFilteredMyAppointments] = useState([]);
  const [filteredNewPatient, setFilteredNewPatient] = useState([]);
  const [filteredFollowUpPatient, setFilteredFollowUpPatient] = useState([]);
  const [filteredOpdPatientRecord, setFilteredOpdPatientRecord] = useState([])

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
    setFilteredMyAppointments(response.data);
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
    setFilteredNewPatient(response.data);
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

  const fetchAllOpdPatientRecord = async () => {
    let response = await axios.get(`${API_BASE_URL}/out-patient`)
    setOpdPatientRecord(response.data)
    setFilteredOpdPatientRecord(response.data)
  }

  useEffect(() => {
    fetchAllMyAppointments();
    fetchAllNewPatientWhosePaymentIsDone();
    fetchFollowUpWhosePaymentIsDone();
    fetchAllOpdPatientRecord()
  }, []);

  const handleSelectPatient = (data) => {
    setSelectedPatient(data);
    setIsPatientOPEN(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query) {
      setFilteredMyAppointments(myAppointment);
      setFilteredNewPatient(newPatient);
      setFollowUpPatient(followUpPatient);
      setFilteredOpdPatientRecord(opdPatientRecord)
      return;
    }

    const lowerQuery = query.toLowerCase();
    if (isSearchVisible === "myAppointments") {
      const appointment = myAppointment.filter((item) => {
        return (
          item.patient?.firstName.toLowerCase().includes(lowerQuery) ||
          item.patient?.lastName.toLowerCase().includes(lowerQuery) ||
          item.addDoctor?.doctorName.toLowerCase().includes(lowerQuery) ||
          item.patient?.uhid.toLowerCase().includes(lowerQuery) ||
          item.patient?.age.toString().includes(lowerQuery) ||
          item.patient?.gender.toLowerCase().includes(lowerQuery) ||
          item.feespaid?.toLowerCase().includes(lowerQuery)
        );
      });
      setFilteredMyAppointments(appointment);
    } else if (isSearchVisible === "newPatient") {
      const patient = newPatient.filter((item) => {
        return (
          item.patient?.firstName.toLowerCase().includes(lowerQuery) ||
          item.patient?.lastName.toLowerCase().includes(lowerQuery) ||
          item.addDoctor?.doctorName.toLowerCase().includes(lowerQuery) ||
          item.patient?.uhid.toLowerCase().includes(lowerQuery) ||
          item.patient?.age.toString().includes(lowerQuery) ||
          item.patient?.gender.toLowerCase().includes(lowerQuery) ||
          item.feespaid?.toLowerCase().includes(lowerQuery)
        );
      });
      setFilteredNewPatient(patient);
    } else if (isSearchVisible === "followup") {
      const followPatient = followUpPatient.filter((item) => {
        return (
          item.patient?.firstName.toLowerCase().includes(lowerQuery) ||
          item.patient?.lastName.toLowerCase().includes(lowerQuery) ||
          item.addDoctor?.doctorName.toLowerCase().includes(lowerQuery) ||
          item.patient?.uhid.toLowerCase().includes(lowerQuery) ||
          item.patient?.age.toString().includes(lowerQuery) ||
          item.patient?.gender.toLowerCase().includes(lowerQuery) ||
          item.feespaid?.toLowerCase().includes(lowerQuery)
        );
      });
      setFilteredFollowUpPatient(followPatient);
    }

    else if (isSearchVisible === "opdRecord") {
      console.log(query);

      const opdPatients = opdPatientRecord.filter((item) => {
        return (
          item.patient?.firstName?.toLowerCase().includes(lowerQuery) ||
          item.patient?.lastName?.toLowerCase().includes(lowerQuery) ||
          item.addDoctor?.doctorName?.toLowerCase().includes(lowerQuery) ||
          item.patient?.uhid?.toLowerCase().includes(lowerQuery) ||
          item.patient?.gender?.toLowerCase().includes(lowerQuery) ||
          item.outPatientId?.toLowerCase().includes(lowerQuery)
        );
      });
      setFilteredOpdPatientRecord(opdPatients);
    }
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
              <div>
                {isSearchVisible === "myAppointments" && (
                  <input
                    type="text"
                    value={searchQuery}
                    placeholder="search"
                    onChange={(e) => handleSearch(e.target.value)}
                    className="doctorMainPage-search-input"
                  />
                )}
                <i
                  onClick={() => setIsSearchVisible("myAppointments")}
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                  className="fa-solid fa-magnifying-glass"
                ></i>
              </div>
            </div>
            <div className="doctorMainPage-boxes">
              {filteredMyAppointments.length > 0 ? (
                filteredMyAppointments.map((item) => (
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
              <div>
                {isSearchVisible === "newPatient" && (
                  <input
                    type="text"
                    value={searchQuery}
                    placeholder="search"
                    onChange={(e) => handleSearch(e.target.value)}
                    className="doctorMainPage-search-input"
                  />
                )}
                <i
                  onClick={() => setIsSearchVisible("newPatient")}
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                  className="fa-solid fa-magnifying-glass"
                ></i>
              </div>
            </div>
            <div className="doctorMainPage-boxes">
              {filteredNewPatient.length > 0 ? (
                filteredNewPatient.map((item) => (
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
              <h1>Followup Patients</h1>
              <div>
                {isSearchVisible === "followup" && (
                  <input
                    type="text"
                    value={searchQuery}
                    placeholder="search"
                    onChange={(e) => handleSearch(e.target.value)}
                    className="wardNurseDashboard-search-input"
                  />
                )}
                <i
                  onClick={() => setIsSearchVisible("followup")}
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                  className="fa-solid fa-magnifying-glass"
                ></i>
              </div>
            </div>
            <div className="doctorMainPage-boxes">
              {filteredFollowUpPatient.length > 0 ? (
                filteredFollowUpPatient.map((item) => (
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
              <h1>Opd Patients Records</h1>
              <div>
                {isSearchVisible === "opdRecord" && (
                  <input
                    type="text"
                    value={searchQuery}
                    placeholder="search"
                    onChange={(e) => handleSearch(e.target.value)}
                    className="wardNurseDashboard-search-input"
                  />
                )}
                <i
                  onClick={() => setIsSearchVisible("opdRecord")}
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                  className="fa-solid fa-magnifying-glass"
                ></i>
              </div>
            </div>
            <div className="doctorMainPage-boxes">
              {filteredOpdPatientRecord.length > 0 ? (
                filteredOpdPatientRecord.map((item) => (
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
                          <span class="label">Out Patient Id:</span>
                          <span class="value">{item.outPatientId}</span>
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
