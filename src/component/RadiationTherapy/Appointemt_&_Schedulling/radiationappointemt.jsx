import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./AppointmentAndScheduling.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";

const Radiationappointemt = () => {
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: "",
    patientId: "", // Added patientId here
    patientName: "",
    appointmentDate: "",
    appointmentTime: "",
    status: "",
    remarks: "",
  });

  // Fetch all appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8085/api/appointments");
      console.log(response.data);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    // Fetch appointments when the component mounts
    fetchAppointments();
  }, []);

  const handleModalOpen = (appointment = null) => {
    if (appointment) {
      setFormData(appointment);
      setCurrentAppointment(appointment.appointmentId);
    } else {
      setFormData({
        doctorId: "",
        patientId: "", // Reset patientId when opening modal for new appointment
        patientName: "",
        appointmentDate: "",
        appointmentTime: "",
        status: "",
        remarks: "",
      });
      setCurrentAppointment(null);
    }
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (currentAppointment) {
      // Update existing appointment (PUT request)
      try {
        await axios.put(`http://localhost:8085/api/appointments/${currentAppointment}`, formData);
        setAppointments(
          appointments.map((appt) =>
            appt.appointmentId === currentAppointment ? formData : appt
          )
        );
      } catch (error) {
        console.error("Error updating appointment:", error);
      }
    } else {
      // Add new appointment (POST request)
      try {
        const response = await axios.post("http://localhost:8085/api/appointments", formData);
        setAppointments([...appointments, response.data]);
      } catch (error) {
        console.error("Error creating new appointment:", error);
      }
    }
    setShowModal(false);
  };

  const handleEdit = (appointment) => {
    handleModalOpen(appointment);
  };

  const handleDelete = async (appointmentId) => {
    // Delete appointment (DELETE request)
    try {
      await axios.delete(`http://localhost:8085/api/appointments/${appointmentId}`);
      setAppointments(appointments.filter((appt) => appt.appointmentId !== appointmentId));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div className="appointment-scheduling-container">
      <h2>Appointment and Scheduling</h2>
      <button onClick={() => handleModalOpen()} className="schedule-add-button">
        Add Appointment
      </button>

      <table className="schedule-table" ref={tableRef}>
        <thead>
          <tr>
            {["Doctor", "Patient ID", "Patient Name", "Appointment Date", "Appointment Time", "Status", "Remarks", "Actions"].map(
              (header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.appointmentId}>
              <td>{appt.doctorId}</td>
              <td>{appt.patientId}</td>
              <td>{appt.patientName}</td>
              <td>{appt.appointmentDate}</td>
              <td>{appt.appointmentTime}</td>
              <td>{appt.status}</td>
              <td>{appt.remarks}</td>
              <td>
                <button className="schedule-edit-button" onClick={() => handleEdit(appt)}>
                  Edit
                </button>
                <button className="schedule-edit-button" onClick={() => handleDelete(appt.appointmentId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="schedule-modal">
          <div className="schedule-modal-content">
            <span className="schedule-close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>{currentAppointment ? "Edit Appointment" : "Add Appointment"}</h2>
            <form>
              <div className="schedule-form-group">
                <label>Doctor ID</label>
                <input
                  type="text"
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                />
              </div>
              <div className="schedule-form-group">
                <label>Patient ID</label> {/* Added input field for Patient ID */}
                <input
                  type="text"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                />
              </div>
              <div className="schedule-form-group">
                <label>Patient Name</label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                />
              </div>
              <div className="schedule-form-group">
                <label>Appointment Date</label>
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                />
              </div>
              <div className="schedule-form-group">
                <label>Appointment Time</label>
                <input
                  type="time"
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleChange}
                />
              </div>
              <div className="schedule-form-group">
                <label>Status</label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                />
              </div>
              <div className="schedule-form-group">
                <label>Remarks</label>
                <textarea
                  name="remarks"
                  rows="3"
                  value={formData.remarks}
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                className="schedule-submit-button"
                onClick={handleSubmit}
              >
                {currentAppointment ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Radiationappointemt;
