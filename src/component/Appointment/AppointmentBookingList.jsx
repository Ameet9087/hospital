import React, { useEffect, useState, useRef } from "react";
import "./AppointmentBookingList.css";
import { Link } from "react-router-dom";
import { startResizing } from "../TableHeadingResizing/resizableColumns";
import { API_BASE_URL } from "../api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};

const AppointmentBookingList = () => {
  const [dateFrom, setDateFrom] = useState(getCurrentDate());
  const [dateTo, setDateTo] = useState(getCurrentDate());
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [newPatientVisit, setnewPatientVisit] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [doctorList, setDoctorList] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctorList);
  const [selectedDoctor, setSelectedDoctor] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visitType, setVisitType] = useState("");
  const navigate = useNavigate();

  const fetchAppointments = () => {
    console.log("Fetching appointments..."); // Debug log
    const url = new URL(`${API_BASE_URL}/appointments/fetch-by-condition`);

    // Append query parameters if values are provided
    if (selectedDoctor) {
      url.searchParams.append("employeeId", selectedDoctor);
      console.log("Selected Doctor:", selectedDoctor); // Debug log
    }

    if (visitType) {
      url.searchParams.append("visitType", visitType);
      console.log("Visit Type:", visitType); // Debug log
    }

    if (dateFrom) {
      url.searchParams.append("startDate", dateFrom);
      console.log("Date From:", dateFrom); // Debug log
    }

    if (dateTo) {
      url.searchParams.append("endDate", dateTo);
      console.log("Date To:", dateTo); // Debug log
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // Debug log
        setAppointments(data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setError(error.message);
      });
  };

  useEffect(() => {
    fetchAppointments();
  }, [selectedDoctor, visitType, dateFrom, dateTo]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/employees/findAllDoctors`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((items) => {
        setDoctorList(items);
      })
      .catch((error) => setError(error.message));
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = doctorList.filter((doctor) =>
        (doctor?.firstName || doctor?.lastName)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(doctorList); // Reset to full list if no search term
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleSelect = (id, name) => {
    setSelectedDoctor(id);
    setSearchTerm(name);
    setIsDropdownOpen(false);
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
    const response = await axios.put(
      `${API_BASE_URL}/appointments/update-status/${id}?status=cancelled`
    );
    if (response.ok) {
      fetchAppointments();
      console.log("Status Updated Successfully");
    }
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
    if (appointments.length === 0) {
      return (
        <tr>
          <td colSpan="9">No appointments found</td>
        </tr>
      );
    }

    return appointments.map((appointment, index) => (
      <tr key={index}>
        <td className={`appointments__status--${appointment.status}`}>
          {appointment?.status}
        </td>
        <td>{appointment.appointmentDate}</td>
        <td>{appointment.appointmentTime}</td>
        <td>{appointment.appointmentId}</td>
        <td>{`${appointment.firstName} ${appointment.middleName} ${appointment.lastName}`}</td>
        <td>{appointment.contactNumber}</td>
        <td>
          {appointment?.employeeDTO != null
            ? `${appointment?.employeeDTO?.salutation} ${appointment?.employeeDTO?.firstName} ${appointment?.employeeDTO?.lastName}`
            : "NA"}
        </td>
        <td>{appointment.visitType}</td>
        <td>
          <button
            onClick={() => handleCheckIn(appointment)}
            className="appointments__action-btn"
          >
            Check-In
          </button>
          <button
            onClick={() => handleCancelledStatus(appointment.appointmentId)}
            className="appointments__action-btn"
          >
            Cancel
          </button>
          <button
            onClick={() => handleEditAppointment(appointment)}
            className="appointments__action-btn"
          >
            Edit
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="appointments__container">
      {/* {error && <p className="appointments__error">Error: {error}</p>} */}

      <div className="appointments__filter-section">
        <div className="appointments__filter-group searchable-dropdown">
          <label>
            Doctor <span className="appointments__required">*</span>
          </label>
          <div className="appointment-doctor-dropdown-container">
            <input
              type="text"
              placeholder="Search or select a Doctor"
              value={searchTerm}
              onChange={handleSearch}
              onClick={toggleDropdown} // Open/close dropdown on click
              className="appointment-search-form-input"
            />

            {/* Dropdown list */}
            {isDropdownOpen && (
              <ul className="appointment-dropdown-list">
                {filteredDoctors?.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <li
                      key={doctor.employeeId}
                      onClick={() =>
                        handleSelect(
                          doctor.employeeId,
                          doctor.firstName + " " + doctor.lastName
                        )
                      }
                      className="appointment-dropdown-item"
                    >
                      {doctor.salutation} {doctor.firstName} {doctor.lastName}
                    </li>
                  ))
                ) : (
                  <li className="appointment-dropdown-item">
                    No doctors found
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
        <div className="appointments__filter-group">
          <label>
            Visit Type <span className="appointments__required">*</span>
          </label>
          <select
            onClick={handleSelectVisitType}
            className="appointments__dropdown"
          >
            <option>All</option>
            <option value="New Patient">New Patient</option>
            <option value="Follow-Up Patient">Follow-Up Patient</option>
          </select>
        </div>
        <div className="appointments__filter-group">
          <label>
            From Date <span className="appointments__required">*</span>
          </label>
          <input
            className="appointments__date-picker appointment-search-form-select"
            type="date"
            id="dateFrom"
            defaultValue={dateFrom}
            onChange={handleDateFromChange}
          />
        </div>
        <div className="appointments__filter-group">
          <label>
            To Date <span className="appointments__required">*</span>
          </label>
          <input
            className="appointments__date-picker appointment-search-form-select"
            type="date"
            id="dateTo"
            defaultValue={dateTo}
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
          <div className="appointments__search-bar">
            <input
              className="appointments__search-input"
              type="text"
              placeholder="Search"
            />
            <i className="fas fa-search"></i>{" "}
          </div>
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
                      (app) => app.visitType === "New Patient"
                    ).length
                  }
                </td>
              </tr>
              <tr>
                <td>Follow-Up Patients</td>
                <td>
                  {
                    appointments.filter((app) => app.visitType === "Follow-Up")
                      .length
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBookingList;
