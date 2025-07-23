import React, { useState, useEffect, useRef } from "react";
import "./bookinglist.css";
import { FaPlus } from "react-icons/fa";
import moment from "moment";
import { Button } from "react-bootstrap";
import axios from "axios";
import CustomModal from "../../../CustomModel/CustomModal";
import { useNavigate } from "react-router-dom";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import SurgeryEvents from "../SurgeryEvent/SurgeryEventsPage";
import { API_BASE_URL } from "../../api/api";

// Base URL for the API

// Create an axios instance with the base URL for better reuse

function BookingList() {
  const [openStickerPopup, setOpenStickerPopup] = useState(false);
  const [otPatientList, setOtPatientList] = useState([]);
  const [otMachines, setOtMachines] = useState([]);
  const [selectedMachineDetails, setSelectedMachineDetails] = useState({});
  const [inPatients, setInPatients] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const navigate = useNavigate();

  const handleSurgery = () => {
    navigate("/surgery-events");
  };

  const handlePatientSelection = (selectedIpNo) => {
    setIpNo(selectedIpNo);
    const selectedPatient = inPatients.find(
      (patient) => patient.ipAdmmissionId.toString() === selectedIpNo.toString()
    );
    console.log(selectedPatient);

    if (selectedPatient) {
      // Update fields with selected patient details
      setMrNo(selectedPatient.mrNo || "");
      setPatientName(
        `${selectedPatient.firstName} ${selectedPatient.lastName}` || ""
      );
      setAddress(selectedPatient.address || "N/A");
      setConsultant(selectedPatient.consultant || "N/A");
      setRoomNoBedNo(selectedPatient.roomNoBedNo || "N/A");

      // Update formData for consistency
      setFormData((prev) => ({
        ...prev,
        ipAdmissionDTO: {
          ...prev.ipAdmissionDTO,
          ipAdmmissionId: selectedIpNo,
        },
      }));
    } else {
      // Clear the fields if no patient is selected
      setMrNo("");
      setPatientName("");
      setAddress("");
      setConsultant("");
      setRoomNoBedNo("");

      // Reset the formData's ipAdmissionDTO
      setFormData((prev) => ({
        ...prev,
        ipAdmissionDTO: { ...prev.ipAdmissionDTO, ipAdmmissionId: "" },
      }));
    }
  };

  // Form state variables
  const [operationBookingId, setOperationBookingId] = useState("");
  const [otDate, setOtDate] = useState("");
  const [otTime, setOtTime] = useState("");
  const [duration, setDuration] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [otProcedure, setOtProcedure] = useState("");
  const [status, setStatus] = useState("");
  const [remark, setRemark] = useState("");
  const [operationType, setOperationType] = useState("");
  const [caseType, setCaseType] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [orEntryTime, setOrEntryTime] = useState("");
  const [signInDate, setSignInDate] = useState("");
  const [signInTime, setSignInTime] = useState("");
  const [signOutDate, setSignOutDate] = useState("");
  const [signOutTime, setSignOutTime] = useState("");
  const [shiftWardToDate, setShiftWardToDate] = useState("");
  const [shiftToWardTime, setShiftToWardTime] = useState("");

  const [ipNo, setIpNo] = useState("");
  const [mrNo, setMrNo] = useState("");
  const [selectedMachineId, setSelectedMachineId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [address, setAddress] = useState("");
  const [consultant, setConsultant] = useState("");
  const [roomNoBedNo, setRoomNoBedNo] = useState("");
  const [machineName, setMachineName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSurgeryEventClick = (booking) => {
    navigate("surgery-events", { state: { booking } });
  };

  const [formData, setFormData] = useState({
    otDate: "",
    otTime: "",
    duration: "",
    diagnosis: "",
    otProcedure: "",
    status: "",
    remark: "",
    operationType: "",
    caseType: "",
    entryDate: "",
    orEntryTime: "",
    signInDate: "",
    signInTime: "",
    signOutDate: "",
    signOutTime: "",
    shiftWardToDate: "",
    shiftToWardTime: "",
    ipAdmissionDTO: { ipAdmmissionId: "" },
    otMachineDTO: { otMachineId: "" },
  });

  useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/ip-admissions`);

        if (response.status === 200 && Array.isArray(response.data)) {
          const formattedPatients = response.data.map((patient) => ({
            ipAdmmissionId: patient.ipAdmmissionId || "",
            firstName: patient?.patient?.patient?.firstName || "",
            lastName: patient?.patient?.patient?.lastName || "",
            uhid: patient?.patient?.patient?.uhid || "",
            address: patient?.patient?.addressDTO?.city || "N/A",
            consultant:
              patient.admissionUnderDoctorDetail?.consultantDoctor
                ?.doctorName || "N/A",
            roomNoBedNo: `${patient?.roomDetails?.roomId || "N/A"} - ${patient?.roomDetails?.bedDTO?.id || "N/A"
              }`,
            mrNo: patient?.patient?.patient?.uhid || "N/A",
          }));
          setInPatients(formattedPatients);
        } else {
          console.error("Unexpected response structure:", response);
        }
      } catch (err) {
        console.error("Error fetching patient data:", err);
      }
    };

    const fetchOtMachines = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/ot-machines`);
        if (response.status === 200) {
          setOtMachines(response.data);
        }
      } catch (err) {
        console.error("Error fetching OT machines:", err);
      }
    };

    fetchPatientList();
    fetchOtMachines();
  }, []);

  // Fetch selected machine details
  const handleMachineChange = async (e) => {
    const selectedMachineId = e.target.value;
    setSelectedMachineId(selectedMachineId); // Update selectedMachineId state
    setMachineName(selectedMachineId);

    if (selectedMachineId) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/ot-machines/${selectedMachineId}`
        );
        if (response.status === 200) {
          setSelectedMachineDetails(response.data);
        } else {
          console.error("Failed to fetch machine details:", response.status);
        }
      } catch (err) {
        console.error("Error fetching machine details:", err);
      }
    } else {
      setSelectedMachineDetails({});
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("ipAdmissionDTO") || name.startsWith("otMachineDTO")) {
      const [object, key] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [object]: { ...prev[object], [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      otDate: otDate || "",
      otTime: otTime || "",
      duration: duration || "",
      diagnosis: diagnosis || "",
      otProcedure: otProcedure || "",
      status: status || "",
      remark: remark || "",
      operationType: operationType || "",
      caseType: caseType || "",
      entryDate: entryDate || "",
      orEntryTime: orEntryTime || "",
      signInDate: signInDate || "",
      signInTime: signInTime || "",
      signOutDate: signOutDate || "",
      signOutTime: signOutTime || "",
      shiftWardToDate: shiftWardToDate || "",
      shiftToWardTime: shiftToWardTime || "",
      ipAdmissionDTO: {
        ipAdmmissionId: formData.ipAdmissionDTO.ipAdmmissionId || "",
      },
      otMachineDTO: {
        otMachineId: selectedMachineId || "",
      },
    };
    console.log(formattedData);


    try {
      const response = await axios.post(
        `${API_BASE_URL}/operation-bookings`,
        formattedData
      );
      if (response) {
        alert("Data saved successfully!");
        setOpenStickerPopup(false);
        setFormData({
          otDate: "",
          otTime: "",
          duration: "",
          diagnosis: "",
          otProcedure: "",
          status: "",
          remark: "",
          operationType: "",
          caseType: "",
          entryDate: "",
          orEntryTime: "",
          signInDate: "",
          signInTime: "",
          signOutDate: "",
          signOutTime: "",
          shiftWardToDate: "",
          shiftToWardTime: "",
          ipAdmissionDTO: { ipAdmmissionId: "" },
          otMachineDTO: { otMachineId: "" },
        });
      }
    } catch (err) {
      console.error("Error submitting data:", err);
      alert("Error saving data.");
    }
  };

  useEffect(() => {
    const fetchOTBookings = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/operation-bookings`);
        setOtPatientList(response.data);
        console.log(otPatientList, "ot patientList");
      } catch (error) {
        console.error("Error fetching OT bookings:", error);
      }
    };

    fetchOTBookings();
  }, []);
  
  const printList = () => {
    if (tableRef.current) {
      const printContents = tableRef.current.innerHTML;

      // Create an iframe element
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";

      // Append the iframe to the body
      document.body.appendChild(iframe);

      // Write the table content into the iframe's document
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
        <head>
          
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            button, .admit-actions, th:nth-child(10), td:nth-child(10) {
              display: none; /* Hide action buttons and Action column */
            }
          </style>
        </head>
        <body>
          <table>
            ${printContents}
          </table>
        </body>
        </html>
      `);
      doc.close();

      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      document.body.removeChild(iframe);
    }
  };

  return (
    <div className="booking-list-container">
      <div className="booking-list-booking-header">
        <button
          className="booking-list-btn-btn-success"
          onClick={() => setOpenStickerPopup(true)}
        >
          <FaPlus /> New OT Booking
        </button>
      </div>

      <div className="ot-filtersection">
        <div className="ot-datefilter">
          <div className="ot-daterange">
            <label>From: </label>
            <input className="ot-input" type="date" value="2024-08-05" />
            <label> To: </label>
            <input className="ot-input" type="date" value="2024-08-12" />
          </div>
        </div>
      </div>

      <div className="ot-bookinglist-searchsection">
        <input
          type="text"
          placeholder="Search by Patient Name/ID"
          className="ot-bookinglist-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="ot-bookinglist-print-button" onClick={printList}>Print</button>
      </div>

      <div className="table-container">
        <table className="booking-list-ot-patient-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Sr.No",
                "Patient Name",
                "Age/Gender",
                "OT Date & Time",
                "Diagnosis",
                "Procedure",
                // "Anesthesia",
                "Machine",
                // "Employee",
                // "Department",
                "Status",
                "Action",
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
            {otPatientList && otPatientList.length > 0 ? (
              otPatientList.map((booking, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {booking?.ipAdmissionDTO?.patient?.patient?.firstName}{" "}
                    {booking?.ipAdmissionDTO?.patient?.patient?.lastName}
                  </td>
                  <td>{`${booking?.ipAdmissionDTO?.patient?.patient?.age || "N/A"}/${booking?.ipAdmissionDTO?.patient?.patient?.gender || "N/A"
                    }`}</td>
                  <td>
                    {booking.otDate
                      ? moment(booking.otDate.otTime).format("YYYY-MM-DD HH:mm")
                      : "N/A"}
                  </td>
                  <td>{booking.diagnosis || "N/A"}</td>
                  <td>{booking.otProcedure || "N/A"}</td>
                  {/* <td>{booking.useAnesthesia ? "Yes" : "No"}</td> */}
                  <td>{booking?.otMachineDTO?.machineName || "N/A"}</td>
                  {/* <td>{booking.employees?.join(", ") || "N/A"}</td> */}
                  {/* <td>{booking.department || "N/A"}</td> */}
                  <td>{booking.status || "N/A"}</td>
                  <td>
                    {/* <button
                      className="booking-list-btn-submit"
                      onClick={() => handleEditAction(booking)}
                    >
                      Edit
                    </button> */}
                    <button
                      className="booking-list-btn-submit"
                      onClick={() => handleSurgeryEventClick(booking)}
                    >
                      Surgery Events
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" style={{ textAlign: "center" }}>
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CustomModal
        isOpen={openStickerPopup}
        onClose={() => setOpenStickerPopup(false)}
      >
        <form onSubmit={handleSubmit} className="booking-list-modal-content">
          <div className="booking-list-form-panels">
            <div className="">
              <div className="booking-list-patient-search-dropdown">
                <label>IP No:</label>
                <select
                  name="ipAdmissionDTO.ipAdmmissionId"
                  value={formData.ipAdmissionDTO?.ipAdmmissionId}
                  onChange={(e) => handlePatientSelection(e.target.value)}
                >
                  <option value="">Select Patient</option>
                  {inPatients.map((patient) => (
                    <option
                      key={patient.ipAdmmissionId}
                      value={patient.ipAdmmissionId}
                    >
                      {patient.firstName} {patient.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="booking-list-patient-search-dropdown">
                <label>Machine Name:</label>
                <select value={machineName} onChange={handleMachineChange}>
                  <option value="">Select Machine</option>
                  {otMachines.map((machine) => (
                    <option
                      key={machine.otMachineId}
                      value={machine.otMachineId}
                    >
                      {machine.machineName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="booking-list-patient-search-dropdown">
                <label>UHID No:</label>
                <input type="text" value={mrNo} readOnly />
              </div>
              <div className="booking-list-patient-search-dropdown">
                <label>Patient Name:</label>
                <input type="text" value={patientName} readOnly />
              </div>
              <div className="booking-list-patient-search-dropdown">
                <label>Address:</label>
                <input type="text" value={address} readOnly />
              </div>
              <div className="booking-list-patient-search-dropdown">
                <label>Consultant:</label>
                <input type="text" value={consultant} readOnly />
              </div>
              <div className="booking-list-patient-search-dropdown">
                <label>Room No/Bed No:</label>
                <input type="text" value={roomNoBedNo} readOnly />
              </div>

              <div className="booking-list-patient-search-dropdown">
                <label>Case Type:</label>
                <select
                  value={caseType}
                  onChange={(e) => setCaseType(e.target.value)}
                >
                  <option value="emergency">Emergency</option>
                  <option value="regular">Regular</option>
                </select>
              </div>

              <div className="booking-list-patient-search-dropdown">
                <label>Operation type:</label>
                <select
                  value={operationType}
                  onChange={(e) => setOperationType(e.target.value)}
                >
                  <option value="minor">Minor</option>
                  <option value="major">Major</option>
                </select>
              </div>

              {/* Machine Dropdown */}

              <div className="booking-list-patient-search-dropdown">
                <label>SignIn Date:</label>
                <input
                  type="date"
                  value={signInDate}
                  onChange={(e) => setSignInDate(e.target.value)}
                />
              </div>

              <div className="booking-list-patient-search-dropdown">
                <label>SignIn Time:</label>
                <input
                  type="time"
                  value={signInTime}
                  onChange={(e) => setSignInTime(e.target.value)}
                />
              </div>

              <div className="booking-list-patient-search-dropdown">
                <label>Shifted Ward Date:</label>
                <input
                  type="date"
                  value={shiftWardToDate}
                  onChange={(e) => setShiftWardToDate(e.target.value)}
                />
              </div>

              <div className="booking-list-patient-search-dropdown">
                <label>Shifted Ward Time:</label>
                <input
                  type="time"
                  value={shiftToWardTime}
                  onChange={(e) => setShiftToWardTime(e.target.value)}
                />
              </div>
            </div>

            {/* Second Panel */}
            <div className="booking-list-form-panel">
              <div className="booking-list-patient-search-dropdown">
                <label>SignOut Date:</label>
                <input
                  type="date"
                  value={signOutDate}
                  onChange={(e) => setSignOutDate(e.target.value)}
                />
              </div>

              <div className="booking-list-patient-search-dropdown">
                <label>SignOut Time:</label>
                <input
                  type="time"
                  value={signOutTime}
                  onChange={(e) => setSignOutTime(e.target.value)}
                />
              </div>

              <div className="booking-list-patient-search-dropdown">
                <label>Entry Date:</label>
                <input
                  type="date"
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
                />
              </div>

              <div className="booking-list-patient-search-dropdown">
                <label>Entry Time:</label>
                <input
                  type="time"
                  value={orEntryTime}
                  onChange={(e) => setOrEntryTime(e.target.value)}
                />
              </div>
              <div className="booking-list-patient-search-dropdown">
                <label>OT Date:</label>
                <input
                  type="date"
                  value={otDate}
                  onChange={(e) => setOtDate(e.target.value)}
                />
              </div>

              <div className="booking-list-patient-search-dropdown">
                <label>OT Time:</label>
                <input
                  type="time"
                  value={otTime}
                  onChange={(e) => setOtTime(e.target.value)}
                />
              </div>

              <div className="booking-list-patient-search-dropdown">
                <label>Diagnosis:</label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                />
              </div>

              <div className="booking-list-patient-search-dropdown">
                <label>Remark:</label>
                <input
                  type="text"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                />
              </div>

              <div className="booking-list-patient-search-dropdown">
                <label>OT Procedure:</label>
                <input
                  type="text"
                  value={otProcedure}
                  onChange={(e) => setOtProcedure(e.target.value)}
                />
              </div>
              <div className="booking-list-patient-search-dropdown">
                <label>Duration:</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <div className="booking-list-patient-search-dropdown">
                <label>Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="scheduled">Scheduled</option>

                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="booking-list-submit">
            <Button type="button" variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
}

export default BookingList;
