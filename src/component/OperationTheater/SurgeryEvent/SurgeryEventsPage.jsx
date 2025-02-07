import React, { useState, useEffect, useRef, } from "react";
import { useNavigate } from 'react-router-dom';
import "./SurgeryEventsPage.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PopupTable from "../../Admission/PopupTable";
import { API_BASE_URL } from "../../api/api";

const SurgeryEvents = () => {
  // const [id, setId] = useState(bookingId || "");
  const location = useLocation();
  const [activePopup, setActivePopup] = useState(null);
  const booking = location.state?.booking; //here getting data from object which is passed from bookingList
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [operations, setOperations] = useState([]); // State to store operation data
  const [selectedOperation, setSelectedOperation] = useState(""); // State to store selected operation
  const doctorHeading = ["specialisationId", "doctorName"];
  const otHeading = ["otMasterId", "otName"];
  const [ot, setOt] = useState([]);
  const [selectedOt, setSelectedOt] = useState([]);

  const nurseHeading = ["employeeId", "name", "departmentName"];
  const [nurse, setNurse] = useState([]);
  const [selectedNurse, setSelectedNurse] = useState([]);

  const [Doctors, setDoctors] = useState([]);
  const [selectedDoctors, setselectedDoctors] = useState(null);
  const [selectedOperationId, setSelectedOperationId] = useState("");
  const [selectedOperationDetails, setSelectedOperationDetails] = useState(null);
  const navigate = useNavigate();

  const handleOperationChange = (event) => {
    const operationId = event.target.value;
    console.log("Selected Operation ID:", operationId); // Debugging log

    setSelectedOperationId(operationId);

    // Find the operation details
    const operation = operations.find(
      (op) => op.operationMasteId === parseInt(operationId)
    );

    // console.log("Selected Operation Details:", operation);

    setSelectedOperationDetails(operation || null);
  };

  const handleClose = () => {
    navigate(-1);
  };
  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const [selectedTab, setSelectedTab] = useState("services");

  // State to manage table rows
  const [packageTableRows, setPackageTableRows] = useState([
    {
      sn: 1,
      serviceName: "",
      performDoctor: "",
      promptPercentage: "",
      total: "",
      discAmt: "",
      hours: "",
      extraP: "",
      fromTime: "",
      toTime: "",
      hourly: "",
      emergency: "",
      emerg: "",
      netAmt: "",
      doctor: "",
    },
  ]);

  const [servicesTableRows, setServicesTableRows] = useState([
    {
      sn: 1,
      selectService: "Service",
      generalW: "10000",
      semiPriva: "20000",
      private: "30000",
      deluxe: "40000",
      test: "50000",
      icu: "60000",
      payTypeNst: "",
      success: "",
      generalCal: "",
      upd: "",
      opdCharge: "",
    },
  ]);

  // Function to add a row to the appropriate table
  const handleAddRow = (tableType) => {
    if (tableType === "package") {
      const newRow = {
        sn: packageTableRows.length + 1,
        serviceName: "",
        performDoctor: "",
        promptPercentage: "",
        total: "",
        discAmt: "",
        hours: "",
        extraP: "",
        fromTime: "",
        toTime: "",
        hourly: "",
        emergency: "",
        emerg: "",
        netAmt: "",
        doctor: "",
      };
      setPackageTableRows([...packageTableRows, newRow]);
    } else if (tableType === "services") {
      const newRow = {
        sn: servicesTableRows.length + 1,
        selectService: "",
        generalW: "",
        semiPriva: "",
        private: "",
        deluxe: "",
        test: "",
        icu: "",
        payTypeNst: "",
        success: "",
        generalCal: "",
        upd: "",
        opdCharge: "",
      };
      setServicesTableRows([...servicesTableRows, newRow]);
    }
  };
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/doctors`);

      // Transform the API response into the desired format
      const doctors = response.data.map((doctor) => ({
        doctorId: doctor.doctorId,
        doctorName: doctor.doctorName,
        unitMaster: doctor.unitMaster ? "Yes" : "No", // Convert boolean to readable format
        specialisationId: doctor.specialisationId?.specialisationId || "N/A", // Handle potential null or undefined
      }));

      // Assuming you have a state to store the transformed doctors
      setDoctors(doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const postSurgeryDetails = async () => {
    const requestData = {
      bookingType: "Direct",
      useAnesthesia: "Yes",
      anesthesiaType: "General",
      reduce: 10.5,
      specimen: "Tissue Sample",
      duration: "2 hours",
      emergency: "No",
      totalShareAmount: "1000000",
      totalHospitalAmt: 12000,
      operationBookingDTO: {
        operationBookingId: booking.operationBookingId,
      },
      operationMasterDTO: {
        operationMasteId: selectedOperationId,
      },
      otmasterDTO: {
        otMasterId: selectedOt.otMasterId,
      },
      employeeDTO: {
        employeeId: selectedNurse.employeeId,
      },
      docterDTO: {
        doctorId: selectedDoctors.doctorId,
      },
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/surgery-events`,
        requestData
      );

      if (response.status === 200) {
        alert("Surgery details posted successfully!");
      } else {
        console.error("Unexpected response status:", response.status);
        alert("Failed to post surgery details. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside 2xx
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Request error:", error.request);
      } else {
        // Something else caused the error
        console.error("Error:", error.message);
      }
      alert(
        "An error occurred while posting surgery details. Please check the console for more details."
      );
    }
  };

  const fetchOtMasters = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/otmasters`);

      // Transform the API response into the desired format
      const otMasters = response.data.map((otMaster) => ({
        otMasterId: otMaster.otMasterId,
        otName: otMaster.otName,
        rentPerTake: otMaster.rentPerTake,
        locationName: otMaster.locationMasterDTO?.locationName || "N/A", // Safely access location name
        addItems: otMaster.addItems.map((item) => ({
          addItemId: item.addItemId,
          itemName: item.itemName,
          purchaseRate: item.purchaseRate,
          salesRate: item.salesRate,
        })),
      }));

      // Assuming you have a state to store the transformed OT Masters data
      setOt(otMasters);
    } catch (error) {
      console.error("Error fetching OT Masters:", error);
    }
  };

  const fetchAllNurses = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/employees/get-all-employee`
      );

      // Transform the API response into the desired format
      const nurses = response.data.map((nurse) => ({
        employeeId: nurse.employeeId,
        name: nurse.firstName,
        departmentName: nurse.departmentDTO?.departmentName || "N/A",
        role: nurse.employeeRoleDTO?.role || "N/A",
        employeeType: nurse.employeeTypeDTO?.employeeType || "N/A",
        isActive:
          nurse.employeeTypeDTO?.isActive === "true" ? "Active" : "Inactive",
      }));

      // Assuming you have a state to store the transformed nurse data
      setNurse(nurses);
    } catch (error) {
      console.error("Error fetching nurses:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchOtMasters();
    fetchAllNurses();
  }, []);

  //   Popup

  const handleSelect = (data) => {
    if (activePopup === "doctorData") {
      setselectedDoctors(data);
    } else if (activePopup === "otdata") {
      setSelectedOt(data);
    } else if (activePopup == "nurseData") {
      setSelectedNurse(data);
    }

    setActivePopup(null);
  };

  const getPopupData = () => {
    if (activePopup === "doctorData") {
      return { columns: doctorHeading, data: Doctors };
    } else if (activePopup === "otdata") {
      return { columns: otHeading, data: ot };
    } else if (activePopup === "nurseData") {
      return { columns: nurseHeading, data: nurse };
    } else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();
  // Popup

  useEffect(() => {
    // Fetch operations from API
    const fetchOperations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/operation-Master`);

        if (response.status === 200) {
          setOperations(response.data);
        } else {
          console.error("Failed to fetch operations:", response.status);
        }
      } catch (error) {
        console.error("Error fetching operations:", error);
      }
    };

    fetchOperations();
  }, []);

  // Function to delete a row from the appropriate table
  const handleDeleteRow = (tableType, indexToRemove) => {
    if (tableType === "package") {
      const updatedRows = packageTableRows.filter(
        (_, index) => index !== indexToRemove
      );
      // Renumber the rows
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
      setPackageTableRows(renumberedRows);
    } else if (tableType === "services") {
      const updatedRows = servicesTableRows.filter(
        (_, index) => index !== indexToRemove
      );
      // Renumber the rows
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
      setServicesTableRows(renumberedRows);
    }
  };

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const renderTable = () => {
    switch (selectedTab) {
      case "package":
        return (
          <div className="services-table">
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Service Name",
                    "Perform Doctor",
                    "Prompt (%)",
                    "Total",
                    "Disc Amt",
                    "Hours",
                    "Extra P",
                    "From Time",
                    "To Time",
                    "Hourly",
                    "Emergency",
                    "Emerg",
                    "Net Amt",
                    "Doctor",
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
                {packageTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="surgeryEvents-add-btn"
                          onClick={() => handleAddRow("package")}
                        >
                          Add
                        </button>
                        <button
                          className="surgeryEvents-del-btn"
                          onClick={() => handleDeleteRow("package", index)}
                          disabled={packageTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>{row.serviceName}</td>
                    <td>{row.performDoctor}</td>
                    <td>{row.promptPercentage}</td>
                    <td>{row.total}</td>
                    <td>{row.discAmt}</td>
                    <td>{row.hours}</td>
                    <td>{row.extraP}</td>
                    <td>{row.fromTime}</td>
                    <td>{row.toTime}</td>
                    <td>{row.hourly}</td>
                    <td>{row.emergency}</td>
                    <td>{row.emerg}</td>
                    <td>{row.netAmt}</td>
                    <td>{row.doctor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "services":
        return (
          <div className="services-table">
            <table>
              <thead>
                <tr>
                  <th>Actions</th>
                  <th>SN</th>
                  <th>Select Service</th>
                  <th>GENERAL_W</th>
                  <th>SEMI_PRIVA</th>
                  <th>PRIVATE</th>
                  <th>DELUXE</th>
                  <th>Test</th>
                  <th>ICU</th>
                  <th>PayType_Nst</th>
                  <th>Success</th>
                  <th>GENERAL_CAL</th>
                  <th>UPD</th>
                  <th>OPD_Charge</th>
                </tr>
              </thead>
              <tbody>
                {servicesTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="surgeryEvents-add-btn"
                          onClick={() => handleAddRow("services")}
                        >
                          Add
                        </button>
                        <button
                          className="surgeryEvents-del-btn"
                          onClick={() => handleDeleteRow("services", index)}
                          disabled={servicesTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>{row.selectService}</td>
                    <td>{row.generalW}</td>
                    <td>{row.semiPriva}</td>
                    <td>{row.private}</td>
                    <td>{row.deluxe}</td>
                    <td>{row.test}</td>
                    <td>{row.icu}</td>
                    <td>{row.payTypeNst}</td>
                    <td>{row.success}</td>
                    <td>{row.generalCal}</td>
                    <td>{row.upd}</td>
                    <td>{row.opdCharge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="surgery-Events">
      <div className="surgeryEvents-title-bar">
        <div className="surgeryEvents-header">
          <span>Surgery Events</span>
        </div>
      </div>
      <div className="surgeryEvents-content-wrapper">
        <div className="surgeryEvents-main-section">
          <div className="surgeryEvents-panel dis-templates">
            <div className="surgeryEvents-panel-header"></div>
            <div className="surgeryEvents-panel-content">
              <div className="surgeryEvents-form-row">
                <label>Booking Type:</label>
                <select>
                  <option>Direct</option>
                  <option>Entry Book</option>
                </select>
              </div>
              <div className="surgeryEvents-form-row">
                <label>Booking No: *</label>
                <div className="surgeryEvents-input-with-search">
                  <input
                    type="text"
                    value={booking.operationBookingId}
                    readOnly
                  />

                  {isPopupOpen && (
                    <div className="popup-overlay">
                      <div className="popup-content">
                        <h2>Popup Title</h2>
                        <p>This is the popup content.</p>
                        <button
                          className="close-popup-btn"
                          onClick={handleClosePopup}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="surgeryEvents-panel operation-details">
            <div className="surgeryEvents-panel-header">Patient Details</div>
            <div className="surgeryEvents-panel-content">
              <div className="surgeryEvents-form-row">
                <label>IP No: *</label>
                <div className="surgeryEvents-input-with-search">
                  <input
                    type="text"
                    value={booking.ipAdmissionDTO?.patient?.inPatientId}
                  />

                  {isPopupOpen && (
                    <div className="popup-overlay">
                      <div className="popup-content">
                        <h2>Popup Title</h2>
                        <p>This is the popup content.</p>
                        <button
                          className="close-popup-btn"
                          onClick={handleClosePopup}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="surgeryEvents-form-row">
                <label>UHID No: *</label>
                <div className="surgeryEvents-input-with-search">
                  <input
                    type="text"
                    value={booking.ipAdmissionDTO?.patient?.patient?.uhid}
                  />

                  {isPopupOpen && (
                    <div className="popup-overlay">
                      <div className="popup-content">
                        <h2>Popup Title</h2>
                        <p>This is the popup content.</p>
                        <button
                          className="close-popup-btn"
                          onClick={handleClosePopup}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="surgeryEvents-form-row">
                <label>Patient Name:</label>
                <input
                  type="text"
                  value={`${booking.ipAdmissionDTO?.patient?.patient?.firstName || ""} ${booking.ipAdmissionDTO?.patient?.patient?.lastName || ""
                    }`}
                />
              </div>
              <div className="surgeryEvents-form-row">
                <label>Age:</label>
                <input
                  type="text"
                  value={booking.ipAdmissionDTO?.patient?.patient?.age}
                />
              </div>
              <div className="surgeryEvents-form-row">
                <label>Gender:</label>
                <input
                  type="text"
                  value={booking.ipAdmissionDTO?.patient?.patient?.gender}
                />
              </div>
              <div className="surgeryEvents-form-row">
                <label>Pay Type:</label>
                {/* <input type="text" value={booking?.ipAdmissionDTO?.roomDetails?.payTypeDTO?.payTypeName || ''}  /> */}

                <input
                  key={booking.operationBookingId}
                  type="text"
                  value={
                    booking.ipAdmissionDTO?.roomDetails?.payTypeDTO?.payTypeName
                  }
                />
              </div>
              <div className="surgeryEvents-form-row">
                <label>Room No:</label>
                <input
                  type="text"
                  value={
                    booking?.ipAdmissionDTO?.roomDetails?.roomDTO?.id || ""
                  }
                />
              </div>

              <div className="surgeryEvents-form-row">
                <label>Referred By:</label>
                <input
                  type="text"
                  value={
                    booking.ipAdmissionDTO?.admissionUnderDoctorDetail
                      ?.consultantDoctor?.doctorName
                  }
                />
              </div>
              <div className="surgeryEvents-form-row">
                <label>Under Doctor:</label>
                <input
                  type="text"
                  value={
                    booking?.ipAdmissionDTO?.admissionUnderDoctorDetail
                      ?.consultantDoctor?.doctorName
                  }
                />
              </div>

              <div className="surgeryEvents-form-row">
                <label>Date of Admission:</label>
                <input
                  type="date"
                  value={booking?.ipAdmissionDTO?.admissionDate}
                />
              </div>
              <div className="surgeryEvents-form-row">
                <label>Time of Admission:</label>
                <input
                  type="time"
                  value={
                    booking?.ipAdmissionDTO?.admissionTime
                      ? booking.ipAdmissionDTO.admissionTime
                        .split(".")[0]
                        .substr(0, 5)
                      : ""
                  }
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="surgeryEvents-panel operation-details">
            <div className="surgeryEvents-panel-header">Surgery Details</div>
            <div className="surgeryEvents-panel-content">
              <div className="surgeryEvents-form-row">
                <label>Surgery Date:</label>
                <input type="date" />
              </div>
              <div className="surgeryEvents-form-row">
                <label>Ot Time:</label>
                <input
                  type="time"
                  value={booking?.otTime?.substring(0, 5) || ""}
                />
              </div>
              {/* <div className="surgeryEvents-form-row">
                <label>To Time:</label>
                <input type="time" value="" />
              </div> */}
              <div className="surgeryEvents-form-row">
                <label>Operation Name: *</label>

                <select
                  name="operationName"
                  id="operationName"
                  value={selectedOperationId}
                  onChange={handleOperationChange}
                >
                  <option value="">--Select Operation--</option>
                  {operations.map((operation) => (
                    <option
                      key={operation.operationMasteId}
                      value={operation.operationMasteId}
                    >
                      {operation.operationName}{" "}
                      {/* Assuming API provides a `name` field */}
                    </option>
                  ))}
                </select>
                {/* <div className="surgeryEvents-input-with-search"> */}

                {/* <button
        className="surgeryEvents-magnifier-btn"
        // onClick={handleButtonClick}
      >
        🔍
      </button> */}

                {/* {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Popup Title</h2>
            <p>This is the popup content.</p>
            <button className="close-popup-btn" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )} */}

                {/* </div> */}
              </div>

              <div className="surgeryEvents-form-row">
                <label>Operation Type:</label>
                <input
                  type="text"
                  value={selectedOperationDetails?.operationType || ""}
                  readOnly
                />
              </div>
              {/* <div className="surgeryEvents-form-row">
            <label>Reason:</label>
              <input type="text" value="" />
            </div> */}
              <div className="surgeryEvents-form-row">
                <label>Surgeon: </label>
                <div className="surgeryEvents-input-with-search">
                  <input value={selectedDoctors?.doctorName} />
                  <button
                    className="surgeryEvents-magnifier-btn"
                    onClick={() => setActivePopup("doctorData")}
                  >
                    🔍
                  </button>

                  {isPopupOpen && (
                    <div className="popup-overlay">
                      <div className="popup-content">
                        <h2>Popup Title</h2>
                        <p>This is the popup content.</p>
                        <button
                          className="close-popup-btn"
                          onClick={handleClosePopup}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="surgeryEvents-form-row">
            <label>Cardioogist: </label>
              <div className="surgeryEvents-input-with-search">
                <input />
                <button className="surgeryEvents-magnifier-btn">🔍</button>
              </div>
            </div> */}
              {/* <div className="surgeryEvents-form-row">
            <label>Assistant Nurse: </label>
              <div className="surgeryEvents-input-with-search">
                <input />
                <button className="surgeryEvents-magnifier-btn">🔍</button>
              </div>
            </div> */}
              <div className="surgeryEvents-form-row">
                <label>Reduce (%):</label>
                <input type="text" placeholder="reduce" />
              </div>
              <div className="surgeryEvents-form-row">
                <label>Type of Anaesthesia:</label>
                <select>
                  <option>SPINAL</option>
                  <option>EPIDURAL</option>
                  <option>GA</option>
                  <option>LA</option>
                  <option>SGA</option>
                </select>
              </div>

              <div className="surgeryEvents-form-row">
                <label>Use of Anaesthesia:</label>
                <select>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="surgeryEvents-form-row">
                <label>Specimen:</label>
                {/* <select>
                  <option>Yes</option>
                  <option>No</option>
                </select> */}

                <input type="text" />
              </div>
              <div className="surgeryEvents-form-row">
                <label>Duration:</label>
                <input type="text" />
              </div>
              {/* <div className="surgeryEvents-form-row">
            <label>Select Pay Type: </label>
              <div className="surgeryEvents-input-with-search">
                <input />
                <button className="surgeryEvents-magnifier-btn">🔍</button>
              </div>
            </div> */}
              <div className="surgeryEvents-form-row">
                <label>Emergency:</label>
                <select>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="surgeryEvents-services-section">
          <div className="surgeryEvents-tab-bar">
            <button
              className={`surgeryEvents-tab ${selectedTab === "package" ? "active" : ""
                }`}
              onClick={() => setSelectedTab("package")}
            >
              Services
            </button>
            <button
              className={`surgeryEvents-tab ${selectedTab === "services" ? "active" : ""
                }`}
              onClick={() => setSelectedTab("services")}
            >
              Previous Operation Details
            </button>
          </div>
          {renderTable()}
        </div>
        <div className="surgeryEvents-main-section">
          <div className="surgeryEvents-panel dis-templates">
            <div className="surgeryEvents-panel-content">
              <div className="surgeryEvents-form-row">
                <label>Total Amount:</label>
                <input type="text" />
              </div>
            </div>
            <div className="surgeryEvents-panel-header">OT Details</div>
            <div className="surgeryEvents-panel-content">
              <div className="surgeryEvents-form-row">
                <label>O.T Name: *</label>
                <div className="surgeryEvents-input-with-search">
                  <input value={selectedOt?.otName} />
                  <button
                    className="surgeryEvents-magnifier-btn"
                    onClick={() => setActivePopup("otdata")}
                  >
                    🔍
                  </button>

                  {isPopupOpen && (
                    <div className="popup-overlay">
                      <div className="popup-content">
                        <h2>Popup Title</h2>
                        <p>This is the popup content.</p>
                        <button
                          className="close-popup-btn"
                          onClick={handleClosePopup}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="surgeryEvents-form-row">
                <label>Nurse: *</label>
                <div className="surgeryEvents-input-with-search">
                  <input value={selectedNurse?.name} />
                  <button
                    className="surgeryEvents-magnifier-btn"
                    // onClick={handleButtonClick}
                    onClick={() => setActivePopup("nurseData")}
                  >
                    🔍
                  </button>

                  {isPopupOpen && (
                    <div className="popup-overlay">
                      <div className="popup-content">
                        <h2>Popup Title</h2>
                        <p>This is the popup content.</p>
                        <button
                          className="close-popup-btn"
                          onClick={handleClosePopup}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="surgeryEvents-form-row">
                <label>OT Technician:</label>
                <input type="text" placeholder="Enter technician's name" />
              </div>
            </div>
          </div>

          <div className="surgeryEvents-panel operation-details">
            <div className="surgeryEvents-panel-header">Package Details</div>
            <div className="surgeryEvents-panel-content">
              <div className="surgeryEvents-form-row">
                <label>Surgery Type:</label>
                <select>
                  <option>General</option>
                  <option>Normal</option>
                </select>
              </div>

              <div className="surgeryEvents-form-row">
                <label>Package Code:</label>
                <input type="text" placeholder="package code" />
              </div>
              <div className="surgeryEvents-form-row">
                <label>Package Name:</label>
                <input type="text" placeholder="package name" />
              </div>
              <div className="surgeryEvents-form-row">
                <label>Package Cost:</label>
                <input type="number" placeholder="Enter cost" />
              </div>
            </div>
          </div>

          <div className="surgeryEvents-panel operation-details">
            <div className="surgeryEvents-panel-header"></div>
            <div className="surgeryEvents-panel-content">
              <div className="surgeryEvents-form-row">
                <label>Remarks:</label>
                <input type="text" placeholder="remarks" />
              </div>
              <div className="surgeryEvents-form-row">
                <label>Total Doctor %:</label>
                <input type="number" placeholder="Enter percentage" />
              </div>
              <div className="surgeryEvents-form-row">
                <label>Total Share Amount:</label>
                <input type="number" placeholder="Enter share amount" />
              </div>
              <div className="surgeryEvents-form-row">
                <label>Total Hospital Amt:</label>
                <input type="number" placeholder="Enter amount" />
              </div>
            </div>
          </div>
        </div>
        <div className="surgery-Events-action-buttons">
          <button onClick={postSurgeryDetails}>Submit Surgery Details</button>

          {/* <button className="btn-red">Delete</button>
          <button className="btn-orange">Clear</button> */}
          <button className="btn-gray" onClick={handleClose}>Close</button>
        </div>
      </div>

      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(null)}
        />
      )}
    </div>
  );
};
export default SurgeryEvents;
