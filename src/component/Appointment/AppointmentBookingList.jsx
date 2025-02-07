import React, { useEffect, useState, useRef } from "react";
import "./AppointmentBookingList.css";
import { Link } from "react-router-dom";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppoitmentPopupTable from "./AppoitmentPopupTable"
import CustomModal from "../../CustomModel/CustomModal";
import AddCancel from "./AddCancel";
import { toast } from "react-toastify";
import { FloatingInput, FloatingSelect } from "../../FloatingInputs";
const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};

const AppointmentBookingList = () => {
  const [dateFrom, setDateFrom] = useState(getCurrentDate());
  const [dateTo, setDateTo] = useState(getCurrentDate());
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [doctorList, setDoctorList] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visitType, setVisitType] = useState("");
  const [activePopup, setActivePopup] = useState(false)
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [filteredAppointments, setFilteredAppointments] = useState(appointments);
  const [formData, setFormData] = useState();
  const [showPopup, setShowPopup] = useState(false);

  const fetchAppointments = () => {
    console.log("Fetching appointments..."); // Debug log
    const url = new URL(`${API_BASE_URL}/appointments/between?fromDate=${dateFrom}&toDate=${dateTo}`);
    console.log(url);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAppointments(data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchAppointments();
  }, [selectedDoctor, visitType, dateFrom, dateTo]);

  useEffect(() => {
    const filterAppointments = () => {
      // If appointments are not available, set an empty array and exit
      if (!appointments || appointments.length === 0) {
        console.log("No appointments to filter");
        setFilteredAppointments([]);
        return;
      }

      console.log("Initial appointments:", appointments);

      // Start with the full list of appointments
      let filtered = [...appointments];

      // Exclude appointments with status "Cancelled"
      filtered = filtered.filter((appointment) => appointment.status !== "Cancelled");

      // Filter by selected doctor if available
      if (selectedDoctor && selectedDoctor.doctorName) {
        console.log("Filtering by doctor:", selectedDoctor);
        filtered = filtered.filter(
          (appointment) => appointment.addDoctor?.doctorName === selectedDoctor.doctorName
        );
      }

      // Filter by visit type if it is not "All"
      if (visitType && visitType !== 'All') {
        console.log("Filtering by visit type:", visitType);
        filtered = filtered.filter(
          (appointment) => appointment.typeOfAppointment === visitType
        );
      }

      // Log and set the filtered appointments
      console.log("Filtered appointments:", filtered);
      setFilteredAppointments(filtered);
    };

    // Call the filtering function whenever dependencies change
    filterAppointments();
  }, [selectedDoctor, visitType, appointments]);




  useEffect(() => {
    fetch(`${API_BASE_URL}/doctors`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((items) => {
        console.log(items);

        setDoctorList(items);
      })
      .catch((error) => setError(error.message));
  }, []);


  const getPopupData = () => {
    if (activePopup) {
      return { columns: ["doctorName"], data: doctorList }
    } else {
      return { columns: [], data: [] }
    }
  }

  const { columns, data } = getPopupData();

  const handleSelect = (data) => {
    setSelectedDoctor(data)
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectVisitType = (e) => {
    setVisitType(e.target.value);
  };

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };

  const handleCancelledStatus = async (id) => {
    setShowPopup(true);
    setFormData(id);
  };

  const handleCheckIn = (patient) => {
    navigate("/appointment/checkIn", {
      state: { patient: patient },
    });
  };
  const handleEditAppointment = (appointmentPatient) => {
    navigate("/appointment/add-new-appointment", {
      state: { patientData: appointmentPatient },
    });
  };

  const renderAppointments = () => {
    if (filteredAppointments.length === 0) {
      return (
        <tr>
          <td colSpan="9">No appointments found</td>
        </tr>
      );
    }

    return filteredAppointments.map((appointment, index) => (
      <tr key={index}>
        <td className={`appointments__status--${appointment.status}`}>
          {appointment?.status}
        </td>
        <td>{appointment?.appointmentDate}</td>
        <td>{appointment?.appointmentTime}</td>
        <td>{appointment?.outPatientId}</td>
        <td>{`${appointment?.patient?.firstName} ${appointment?.patient?.middleName} ${appointment?.patient?.lastName}`}</td>
        <td>{appointment?.patient?.contactNumber}</td>
        <td>
          {appointment?.addDoctor != null
            ? `${appointment?.addDoctor?.doctorName}`
            : "NA"}
        </td>
        <td>{appointment.typeOfAppointment}</td>
        <td>
          <button
            onClick={() => handleCancelledStatus(appointment)}
            className="appointments__action-btn"
          >
            Cancel
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="appointments__container">
        {/* {error && <p className="appointments__error">Error: {error}</p>} */}

        <div className="appointments__filter-section">
          <div className="appointments__filter-group searchable-dropdown">

            <FloatingInput
              label={"Doctor"}
              type="search"
              placeholder="Search or select a Doctor"
              value={selectedDoctor?.doctorName || ""}
              onIconClick={() => setActivePopup(true)}
            />
          </div>
          <div className="appointments__filter-group">
            <FloatingSelect
              label={"Visit Type"}
              onClick={handleSelectVisitType}
              options={[
                { value: "", label: "" },
                { value: "New Patient", label: "New Patient" },
                { value: "oldPatient", label: "Old Patient" },
                { value: "Follow up patient", label: "Follow up patient" },
                { value: "All", label: "All" },
              ]}
            />
          </div>
          <div className="appointments__filter-group">
            <FloatingInput
              label={"From Date"}
              type="date"
              id="dateFrom"
              value={dateFrom}
              onChange={handleDateFromChange}
            />
          </div>
          <div className="appointments__filter-group">
            <FloatingInput
              label={"To Date"}
              type="date"
              id="dateTo"
              value={dateTo}
              onChange={handleDateToChange}
            />
          </div>
          <button
            onClick={fetchAppointments}
            className="appointments__show-patient-btn"
          >
            Show Patient
          </button>
        </div>

        <div className="appointments__upcoming-appointments">
          <h3 className="appointments__title">Upcoming Appointments</h3>
          <div className="appointments_search-bar-container">
            {/* <div className="appointments__search-bar">
            <input
              className="appointments__search-input"
              type="text"
              placeholder="Search"
            />
            <i className="fas fa-search"></i>{" "}
          </div> */}
            <p>Show 0 / 0 results</p>
          </div>
          <div className="table-container">
            <table className="patientList-table" ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Status",
                    "Date",
                    "Time",
                    "Appointment ID",
                    "Name",
                    "Phone",
                    "Doctor",
                    "Visit Type",
                    "Actions",
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
              <tbody>{renderAppointments()}</tbody>
            </table>
          </div>

          {/* <div className="appointments__pagination-section">
          <p>Showing {appointments.length} / {appointments.length} results</p>
          <div className="appointments__pagination-buttons">
            <button>First</button>
            <button>Previous</button>
            <button>Next</button>
            <button>Last</button>
          </div>
        </div> */}

          <div className="appointments__summary-report">
            <h3 className="appointments__summary-title">Summary Report</h3>
            <table className="appointments__summary-table">
              <tbody>
                <tr>
                  <td>Total Patients</td>
                  <td>{appointments.length}</td>
                </tr>
                <tr>
                  <td>New Patients</td>
                  <td>
                    {
                      appointments.filter(
                        (app) => app.typeOfAppointment === "newPatient"
                      ).length
                    }
                  </td>
                </tr>
                <tr>
                  <td>Old Patients</td>
                  <td>
                    {
                      appointments.filter((app) => app.typeOfAppointment === "oldPatient")
                        .length
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CustomModal isOpen={showPopup} onClose={() => setShowPopup(false)}>
        <AddCancel formData={formData} updatedAppointments={formData} onClose={() => setShowPopup(false)} />
      </CustomModal>
      {activePopup && (
        <AppoitmentPopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(false)}
        />
      )}
    </>
  );
};

export default AppointmentBookingList;
